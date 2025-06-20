'use strict';

const postcss = require('postcss');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const plugin = require('../');

function compareWarnings(warnings, expected) {
  warnings.forEach((warning, i) => expect(warning).to.contain(expected[i]));
}

function test(fixture, opts, warnings, done) {
  const from = path.join(__dirname, 'fixtures', fixture + '.css');
  const to = path.join(__dirname, 'fixtures', fixture + '.expected.css');
  const input = fs.readFileSync(from, 'utf8');
  const expected = fs.readFileSync(to, 'utf8');

  postcss([ plugin(opts) ])
    .process(input, { from, to })
    .then(result => {
      expect(result.css).to.eql(expected);

      if (warnings.length > 0) {
        compareWarnings(result.warnings(), warnings);
      } else {
        expect(result.warnings()).to.be.empty;
      }

      done();
    }).catch(done);
}

describe('postcss-fluid-typography', () => {

  it('builds fluid type with defaults', done => test('default', {}, [], done));

  it('applies custom parameters', done => test('custom', {}, [], done));

  it('works with shorthand properties', done => test('shorthand', {}, [], done));

  it('handles mixed units', done => {
    test('mixed', {}, [{
      type: 'warning',
      text: 'this combination of units is not supported',
      line: 11,
      column: 1
    }], done);
  });

  it('handles em units', done => test('em', {}, [], done));

  it('properly calculates rem from root font size', done => test('root', {}, [], done));

  it('doesn\'t kill fallbacks/duplicate properties', done => test('fallback', {}, [], done));

  it('sanitizes inputs', done => test('formatting', {}, [], done));

  describe('line height', () => {
    it('sets fluid line-height', done => test('lineheight', {}, [], done));

    it('sets fluid line-height with extended syntax', done => test('lineheight_extended', {}, [], done));

    it('warns about fluid unitless line-height', done => {
      test('unitless_lineheight', {}, [], error => {
        expect(error).to.contain({
          name: 'CssSyntaxError',
          reason: 'sizes with unitless values are not supported',
          plugin: 'postcss-fluid-typography',
          source: '.foo {\n  line-height: fluid 1.5 2;\n}\n',
          line: 1,
          column: 1
        });

        done();
      });
    });
  });

  describe('letterspacing', () => {
    it('sets fluid letterspacing', done => test('letterspacing', {}, [], done));

    it('sets fluid letterspacing with extended syntax', done => test('letterspacing_extended', {}, [], done));

    it('sets fluid letterspacing with negative values', done => test('letterspacing_negative', {}, [], done));
  });
});
