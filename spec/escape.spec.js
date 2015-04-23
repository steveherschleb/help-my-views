var helpers = require('../index');

describe('It should escape the HTML input', function () {
  'use strict';
  
  it('with a single < symbol', function (done) {
    expect(helpers.escape('<')).toBe('&lt;');
    done();
  });
  
  it('with multiple < symbols', function (done) {
    expect(helpers.escape('<<')).toBe('&lt;&lt;');
    done();
  });
  
  it('with a single > symbol', function (done) {
    expect(helpers.escape('>')).toBe('&gt;');
    done();
  });
  
  it('with multiple > symbols', function (done) {
    expect(helpers.escape('>>')).toBe('&gt;&gt;');
    done();
  });
  
  it('with a single & symbol', function (done) {
    expect(helpers.escape('&')).toBe('&amp;');
    done();
  });
  
  it('with multiple & symbols', function (done) {
    expect(helpers.escape('&&')).toBe('&amp;&amp;');
    done();
  });
  
  it('with a single \' symbol', function (done) {
    expect(helpers.escape('\'')).toBe('&#39;');
    done();
  });
  
  it('with multiple \' symbols', function (done) {
    expect(helpers.escape('\'\'')).toBe('&#39;&#39;');
    done();
  });
  
  it('with a single " symbol', function (done) {
    expect(helpers.escape('"')).toBe('&quot;');
    done();
  });
  
  it('with multiple " symbols', function (done) {
    expect(helpers.escape('""')).toBe('&quot;&quot;');
    done();
  });
  
  it('with a single ` symbol', function (done) {
    expect(helpers.escape('`')).toBe('&#x60;');
    done();
  });
  
  it('with multiple ` symbols', function (done) {
    expect(helpers.escape('``')).toBe('&#x60;&#x60;');
    done();
  });
  
  it('with a typical link', function (done) {
    expect(helpers.escape('<a href="http://google.com">Click Me!</a>')).toBe('&lt;a href=&quot;http://google.com&quot;&gt;Click Me!&lt;/a&gt;');
    done();
  });
});


describe('unescape the HTML input', function () {
  'use strict';
  
  it('with a single < code', function (done) {
    expect(helpers.unescape('&lt;')).toBe('<');
    done();
  });
  
  it('with multiple < codes', function (done) {
    expect(helpers.unescape('&lt;&lt;')).toBe('<<');
    done();
  });
  
  it('with a single > codes', function (done) {
    expect(helpers.unescape('&gt;')).toBe('>');
    done();
  });
  
  it('with multiple > codes', function (done) {
    expect(helpers.unescape('&gt;&gt;')).toBe('>>');
    done();
  });
  
  it('with a single & codes', function (done) {
    expect(helpers.unescape('&amp;')).toBe('&');
    done();
  });
  
  it('with multiple & codes', function (done) {
    expect(helpers.unescape('&amp;&amp;')).toBe('&&');
    done();
  });
  
  it('with a single \' codes', function (done) {
    expect(helpers.unescape('&#39;')).toBe('\'');
    done();
  });
  
  it('with multiple \' codes', function (done) {
    expect(helpers.unescape('&#39;&#39;')).toBe('\'\'');
    done();
  });
  
  it('with a single " codes', function (done) {
    expect(helpers.unescape('&quot;')).toBe('"');
    done();
  });
  
  it('with multiple " codes', function (done) {
    expect(helpers.unescape('&quot;&quot;')).toBe('""');
    done();
  
  it('with a single ` code', function (done) {
    expect(helpers.escape('&#x60;')).toBe('`');
    done();
  });
  
  it('with multiple ` codes', function (done) {
    expect(helpers.escape('&#x60;&#x60;')).toBe('``');
    done();
  });
  });
  
  it('with a typical escaped link', function (done) {
    expect(helpers.unescape('&lt;a href=&quot;http://google.com&quot;&gt;Click Me!&lt;/a&gt;')).toBe('<a href="http://google.com">Click Me!</a>');
    done();
  });
});
