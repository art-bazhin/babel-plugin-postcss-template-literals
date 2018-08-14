'use strict';

const postcss = require('postcss');

const DEFAULT_OPTIONS = {
  tag: 'css'
};

module.exports = function({ types: t }) {
  return {
    visitor: {
      TaggedTemplateExpression(path, { opts, file }) {
        opts = Object.assign({}, DEFAULT_OPTIONS, opts);
        let postCssOpts = Object.assign(
          {},
          { from: file.opts.filename },
          opts.options
        );

        if (path.node.tag.name !== opts.tag) return;
        if (opts.replace) {
          path.node.tag.name = opts.replace;
        }

        let quasis = path.node.quasi.quasis;
        let exprs = path.node.quasi.expressions;

        let css = quasis.reduce((acc, quasi, i) => {
          let expr = exprs[i] ? getExprId(i) : '';

          return acc + quasi.value.raw + expr;
        }, '');

        let pluginsOpts = opts.plugins || [];
        let plugins = pluginsOpts.map(handlePlugin);

        let processed = postcss(plugins).process(css, postCssOpts).css;
        let split = splitExpressions(processed);
        let quasisAst = buildQuasisAst(t, split.quasis);
        let exprsAst = split.exprs.map(exprIndex => exprs[exprIndex]);

        path.node.quasi.quasis = quasisAst;
        path.node.quasi.expressions = exprsAst;

        if (opts.replace === '') {
          path.replaceWith(
            t.TemplateLiteral(quasisAst, exprsAst)
          );
        }
      }
    }
  };
};

const regex = /____EXPR_ID_(\d+)____/g;

function handlePlugin(pluginArg) {
  if (Array.isArray(pluginArg)) {
    return require(pluginArg[0]).apply(null, pluginArg.slice(1));
  } else if (typeof pluginArg === 'string') {
    return require(pluginArg);
  } else {
    return pluginArg;
  }
}

function buildQuasisAst(t, quasis) {
  return quasis.map((quasi, i) => {
    let isTail = i === quasis.length - 1;
    return t.templateElement({ raw: quasi, cooked: quasi }, isTail);
  });
}

function splitExpressions(css) {
  let found = regex.exec(css);
  let matches = [];

  while (found) {
    matches.push(found);
    found = regex.exec(css);
  }

  let reduction = matches.reduce(
    (acc, match) => {
      let [placeholder, exprIndex] = match;
      acc.quasis.push(css.substring(acc.prevEnd, match.index));
      acc.exprs.push(exprIndex);
      acc.prevEnd = match.index + placeholder.length;
      return acc;
    },
    { prevEnd: 0, quasis: [], exprs: [] }
  );

  reduction.quasis.push(css.substring(reduction.prevEnd, css.length));

  return {
    quasis: reduction.quasis,
    exprs: reduction.exprs
  };
}

function getExprId(i) {
  return `____EXPR_ID_${i}____`;
}
