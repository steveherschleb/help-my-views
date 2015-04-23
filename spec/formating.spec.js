var helpers = require('../index');

describe('It should format a string To Title Case', function () {
  'use strict';

  it('with string in all lower case', function (done) {
    expect(helpers.titleCase('hello, world!')).toBe('Hello, World!');
    done();
  });
  
  it('with string in all UPPER CASE', function (done) {
    expect(helpers.titleCase('HELLO, WORLD!')).toBe('Hello, World!');
    done();
  });
  
  it('with string already in Title Case', function (done) {
    expect(helpers.titleCase('Hello, World!')).toBe('Hello, World!');
    done();
  });
});


describe('It should limit a strings length', function () {
  'use strict';
  
  it('with a short string', function (done) {
    expect(helpers.limit('Hello')).toBe('Hello');
    done();
  });
  
  it('with a string longer than the default', function (done) {
    expect(helpers.limit('Hello, World!')).toBe('Hello, ...');
    done();
  });
  
  it('with a string shorter than the supplied limit', function (done) {
    expect(helpers.limit('Hello, World!', 30)).toBe('Hello, World!');
    done();
  });
  
  it('with a string longer than the supplied limit', function (done) {
    expect(helpers.limit('Hello, World!', 8)).toBe('Hello...');
    done();
  });
});


describe('It should convert numbers to fractions', function () {
  'use strict';
  
  it('with a leading zero', function (done) {
    expect(helpers.fractions('0.25')).toBe('<sup>1</sup>/<sub>4</sub>');
    done();
  });
  
  it('without a leading zero', function (done) {
    expect(helpers.fractions('.25')).toBe('<sup>1</sup>/<sub>4</sub>');
    done();
  });
  
  it('with a fraction greater than 1', function (done) {
    expect(helpers.fractions('2.25')).toBe('2 <sup>1</sup>/<sub>4</sub>');
    done();
  });
  
  it('with more than one fraction', function (done) {
    expect(helpers.fractions('2.25 to 2.5')).toBe('2 <sup>1</sup>/<sub>4</sub> to 2 <sup>1</sup>/<sub>2</sub>');
    done();
  });
  
  it('with a typical recipe text', function (done) {
    var str = 'First, mix 1.5 t salt with 1.333 T butter.';
    expect(helpers.fractions(str)).toBe('First, mix 1 <sup>1</sup>/<sub>2</sub> t salt with 1 <sup>1</sup>/<sub>3</sub> T butter.');
    done();
  });
  
  it('with a typical recipe text', function (done) {
    var str = 'First, mix 1.5t salt with 1.333T butter.';
    expect(helpers.fractions(str)).toBe('First, mix 1 <sup>1</sup>/<sub>2</sub>t salt with 1 <sup>1</sup>/<sub>3</sub>T butter.');
    done();
  });
  
  it('using tenths', function (done) {
    expect(helpers.fractions('.1 .3 .7 .9')).toBe('<sup>1</sup>/<sub>10</sub> <sup>3</sup>/<sub>10</sub> <sup>7</sup>/<sub>10</sub> <sup>9</sup>/<sub>10</sub>');
    done();
  });
  
  it('using eighths', function (done) {
    expect(helpers.fractions('.125 .375 .625 .875')).toBe('<sup>1</sup>/<sub>8</sub> <sup>3</sup>/<sub>8</sub> <sup>5</sup>/<sub>8</sub> <sup>7</sup>/<sub>8</sub>');
    done();
  });
  
  it('using sixths', function (done) {
    expect(helpers.fractions('.167 .833')).toBe('<sup>1</sup>/<sub>6</sub> <sup>5</sup>/<sub>6</sub>');
    done();
  });

  it('using fifths', function (done) {
    expect(helpers.fractions('.2 .4 .6 .8')).toBe('<sup>1</sup>/<sub>5</sub> <sup>2</sup>/<sub>5</sub> <sup>3</sup>/<sub>5</sub> <sup>4</sup>/<sub>5</sub>');
    done();
  });
  
  it('using quarters', function (done) {
    expect(helpers.fractions('.25 .5 .75')).toBe('<sup>1</sup>/<sub>4</sub> <sup>1</sup>/<sub>2</sub> <sup>3</sup>/<sub>4</sub>');
    done();
  });
  
  it('using thirds', function (done) {
    expect(helpers.fractions('.333 .667')).toBe('<sup>1</sup>/<sub>3</sub> <sup>2</sup>/<sub>3</sub>');
    done();
  });
});


describe('It should build an array of links', function () {
  'use strict';
  
  it('with a single value', function (done) {
    expect(helpers.linkify('/', 'Products')).toBe('<a href="/Products">Products</a>');
    done();
  });
  
  it('with a single index array', function (done) {
    expect(helpers.linkify('/', ['Products'])[0]).toBe('<a href="/Products">Products</a>');
    expect(helpers.linkify('/', ['Products']).length).toBe(1);
    done();
  });
  
  it('with a multi index array', function (done) {
    expect(helpers.linkify('/', ['Products', 'Blog'])[0]).toBe('<a href="/Products">Products</a>');
    expect(helpers.linkify('/', ['Products', 'Blog'])[1]).toBe('<a href="/Blog">Blog</a>');
    expect(helpers.linkify('/', ['Products', 'Blog']).length).toBe(2);
    done();
  });
  
  it('with a full URL to prepend', function (done) {
    expect(helpers.linkify('http://example.com/', ['Products', 'Blog'])[0]).toBe('<a href="http://example.com/Products">Products</a>');
    expect(helpers.linkify('http://example.com/', ['Products', 'Blog'])[1]).toBe('<a href="http://example.com/Blog">Blog</a>');
    expect(helpers.linkify('http://example.com/', ['Products', 'Blog']).length).toBe(2);
    done();
  });
});


describe('It should pluralize an English word', function () {
  'use strict';
  
  it('with a boolean check', function (done) {
    expect(helpers.pluralize('dog', true)).toBe('dogs');
    expect(helpers.pluralize('dog', false)).toBe('dog');
    done();
  });
  
  it('with an array check', function (done) {
    expect(helpers.pluralize('dog', ['Spot', 'Fido'])).toBe('dogs');
    expect(helpers.pluralize('dog', ['Spot'])).toBe('dog');
    expect(helpers.pluralize('dog', [])).toBe('dogs');
    done();
  });
  
  it('with a number check', function (done) {
    expect(helpers.pluralize('dog', 2)).toBe('dogs');
    expect(helpers.pluralize('dog', 1)).toBe('dog');
    expect(helpers.pluralize('dog', 0)).toBe('dogs');
    done();
  });
  
  it('with an object check', function (done) {
    expect(helpers.pluralize('dog', { Spot: 'Pitbull', Fido: 'Corgi' })).toBe('dogs');
    expect(helpers.pluralize('dog', { Spot: 'Pitbull' })).toBe('dog');
    expect(helpers.pluralize('dog', {})).toBe('dogs');
    done();
  });
  
  it('with a word ending in "y" that should be "ies"', function (done) {
    expect(helpers.pluralize('category', true )).toBe('categories');
    expect(helpers.pluralize('city', true )).toBe('cities');
    expect(helpers.pluralize('country', true )).toBe('countries');
    done();
  });
  
  it('with a word ending in "y" that should be "s"', function (done) {
    expect(helpers.pluralize('carboy', true )).toBe('carboys');
    expect(helpers.pluralize('monkey', true )).toBe('monkeys');
    done();
  });
  
  it('with a word ending in "ch" that should be "es"', function (done) {
    expect(helpers.pluralize('church', true )).toBe('churches');
    expect(helpers.pluralize('lunch', true )).toBe('lunches');
    done();
  });
  
  it('with a word ending in "s" that should be "es"', function (done) {
    expect(helpers.pluralize('kiss', true )).toBe('kisses');
    expect(helpers.pluralize('miss', true )).toBe('misses');
    done();
  });
  
  it('with a regular plural ending', function (done) {
    expect(helpers.pluralize('cat', true )).toBe('cats');
    expect(helpers.pluralize('pika', true )).toBe('pikas');
    expect(helpers.pluralize('book', true )).toBe('books');
    done();
  });
  
  it('with an irregular plural ending', function (done) {
    expect(helpers.pluralize('loaf', true )).toBe('loaves');
    expect(helpers.pluralize('goose', true )).toBe('geese');
    expect(helpers.pluralize('mouse', true )).toBe('mice');
    expect(helpers.pluralize('deer', true )).toBe('deer');
    done();
  });
  
  it('with a custom dictionary', function (done) {
    var dict = { fish: 'fishies', cat: 'kitties' };
    expect(helpers.pluralize('fish', true)).toBe('fish');
    expect(helpers.pluralize('cat', true)).toBe('cats');
    expect(helpers.pluralize('fish', true, dict)).toBe('fishies');
    expect(helpers.pluralize('cat', true, dict)).toBe('kitties');
    expect(helpers.pluralize('dog', true, dict)).toBe('dogs');
    done();
  });
});
