# babel-plugin-postcss-template-literals

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]

Babel plugin for running [PostCSS](https://github.com/postcss/postcss) on tagged template literals at build time. Based on [babel-plugin-csjs-postcss](babel-plugin-csjs-postcss) by [Ryan Tsao](https://github.com/rtsao).

## Plugin Options

| Option [default value] | Meaning                                                             |
|------------------------|---------------------------------------------------------------------|
| tag ['css']            | A tag that marks literals for processing                            |
| replace                | Tag replacement. Set an empty string if you want to remove the tag  |
| plugins                | PostCSS plugins                                                     |
| options                | PostCSS options                                                     |


## [Autoprefixer](https://github.com/postcss/autoprefixer) Example
```sh
npm i babel-plugin-postcss-template-literals autoprefixer --save-dev
```

**Before:**
```javascript
css`

.foo {
  transform: ${foo};
}

`;
```

**After:**
```javascript
css`

.foo {
  -webkit-transform: ${ foo };
          transform: ${ foo };
}

`;
```

**.babelrc**
```
{
  "plugins": [["postcss-template-literals", {
    "plugins": ["autoprefixer"]
  }]]
}
```


## Advanced Configuration

**Before:**
```javascript
cssTag`

.foo {
  transform: ${foo};
}

`;
```

**After:**
```javascript
newCssTag`

.foo {
  -webkit-transform: ${ foo };
          transform: ${ foo };
}

`;
```

**.babelrc**
```
{
  "plugins": [["postcss-template-literals", {
    "tag": "cssTag",
    "replace": "newCssTag",
    "plugins": [["autoprefixer", {"browsers": ["last 2 versions"]}]]
  }]]
}
```



[build-badge]: https://api.travis-ci.org/art-bazhin/babel-plugin-postcss-template-literals.svg?branch=master
[build-href]: https://api.travis-ci.org/art-bazhin/babel-plugin-postcss-template-literals
[deps-badge]: https://david-dm.org/art-bazhin/babel-plugin-postcss-template-literals.svg
[deps-href]: https://david-dm.org/art-bazhin/babel-plugin-postcss-template-literals