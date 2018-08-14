'use strict';

const path = require('path');
const fs = require('fs');
const transform = require('@babel/core').transformSync;

const PLUGIN_PATH = path.resolve(__dirname, '../');
const FIXTURES_PATH = path.resolve(__dirname, 'fixtures');
const READ_OPTS = {
  encoding: 'utf-8'
};

let tests = [];
let folders = fs
  .readdirSync(FIXTURES_PATH)
  .filter(
    name =>
      fs.lstatSync(path.join(FIXTURES_PATH, name)).isDirectory() &&
      name[0] !== '.'
  );

folders.forEach(name => {
  let test = { name };

  test.input = fs.readFileSync(
    path.join(FIXTURES_PATH, name, 'input.js'),
    READ_OPTS
  );

  test.output = fs.readFileSync(
    path.join(FIXTURES_PATH, name, 'output.js'),
    READ_OPTS
  );

  test.options = require(path.join(FIXTURES_PATH, name, 'options.js'));

  tests.push(test);
});

tests.forEach(({ name, input, output, options }) => {
  test(name, () => {
    let expected = transform(output).code;
    let processed = transform(input, {
      plugins: [[PLUGIN_PATH, options]]
    }).code;

    expect(processed).toBe(expected);
  });
});
