var helpers = require('../index');

describe('It should generate a preview of short text without HTML', function () {
  'use strict';

  it('with short text without HTML', function (done) {
    expect(helpers.previewText('Hello, World!')).toBe('Hello, World!');
    expect(helpers.previewText('Hello, World!').length).toBe(13);
    done();
  });
  
  it('with longer text without HTML using the default limit', function (done) {
    var str = 'Hello, World! The quick brown fox jumps over the lazy dog.';
    expect(helpers.previewText(str)).toBe('Hello, World! The quick brown fox jumps over the . . .');
    expect(helpers.previewText(str).length).toBe(54);
    done();
  });
  
  it('with longer text without HTML using a defined limit', function (done) {
    var str = 'Hello, World! The quick brown fox jumps over the lazy dog.';
    expect(helpers.previewText(str, 10)).toBe('Hello, . . .');
    expect(helpers.previewText(str, 10).length).toBe(12);
    done();
  });
  
  it('with short text with HTML', function (done) {
    expect(helpers.previewText('<h4>Hello, World!</h4>')).toBe('Hello, World!');
    expect(helpers.previewText('Hello, World!').length).toBe(13);
    done();
  });
  
  it('with longer text with HTML using the default limit', function (done) {
    var str = '<h4>Hello, World!</h4><br>The <strong>quick</strong> brown fox jumps over the lazy dog.';
    expect(helpers.previewText(str)).toBe('Hello, World! The quick brown fox jumps over the . . .');
    expect(helpers.previewText(str).length).toBe(54);
    done();
  });
  
  it('with longer text with HTML using a defined limit', function (done) {
    var str = '<h4>Hello, World!</h4><br>The <strong>quick</strong> brown fox jumps over the lazy dog.';
    expect(helpers.previewText(str, 10)).toBe('Hello, . . .');
    expect(helpers.previewText(str, 10).length).toBe(12);
    done();
  });
});


describe('It should generate an image preview of HTML input', function () {
  'use strict';
  
  it('grabbing the first image without an index specified', function (done) {
    var str = '<h4>Hello, World!</h4><img src="/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p>';
    expect(helpers.previewImage(str).src).toBe('/img/lovelyBurrito.jpg');
    expect(helpers.previewImage(str).alt).toBe('yummy burritos!');
    done();
  });
  
  it('grabbing the first image with an index specified', function (done) {
    var str = '<h4>Hello, World!</h4><img src="/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p>';
    expect(helpers.previewImage(str, 0).src).toBe('/img/lovelyBurrito.jpg');
    expect(helpers.previewImage(str, 0).alt).toBe('yummy burritos!');
    done();
  });
  
  it('grabbing the second image with an index specified', function (done) {
    var str = '<h4>Hi!</h4><img src="/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p><img src="/img/moreBurritos.jpg" alt="OMG burritos!">';
    expect(helpers.previewImage(str, 1).src).toBe('/img/moreBurritos.jpg');
    expect(helpers.previewImage(str, 1).alt).toBe('OMG burritos!');
    done();
  });
  
  it('grabbing the first image with an index specified and prepending the origin URL that has a trailing slash', function (done) {
    var str = '<h4>Hello, World!</h4><img src="/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p>';
    expect(helpers.previewImage(str, 0, 'http://example.com/').src).toBe('http://example.com/img/lovelyBurrito.jpg');
    done();
  });
  
  it('grabbing the first image with an index specified and prepending the origin URL that does not have a trailing slash', function (done) {
    var str = '<h4>Hello, World!</h4><img src="/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p>';
    expect(helpers.previewImage(str, 0, 'http://example.com').src).toBe('http://example.com/img/lovelyBurrito.jpg');
    done();
  });

  it('grabbing the first image with an index specified and when the img link is already an absolute URL', function (done) {
    var str = '<h4>Hello, World!</h4><img src="http://example.com/img/lovelyBurrito.jpg" alt="yummy burritos!"><p>I love burritos ...</p>';
    expect(helpers.previewImage(str, 0, 'http://example.com').src).toBe('http://example.com/img/lovelyBurrito.jpg');
    done();
  });

  it('when there is no image', function (done) {
    var str = '<h4>Hello, World!</h4><p>I love burritos ...</p>';
    expect(helpers.previewImage(str, 0, 'http://example.com')).toBeUndefined();
    done();
  });


});
