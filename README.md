# help-my-views
A collection of Node.js view helpers


## Installation

    npm install help-my-views --save


## Usage

Typically you would include this in your req.locals so you have access to it within your views. An example init might be something like this:

    var express = require('express');
    var app = express();
    
    //Attach the data that is needed for every request
    app.use(function(req, res, next) {
      req.locals = {};
      req.locals.helpers = require('help-my-views');
    });

    app.get('/', function (req, res) {
      res.render('views/home', req.locals);
    });

    app.listen(3000);


Now you have access to all the view helpers in your view, as shown here for an example Jade template:

    html
      head
        title My Awesome Site
    
      body
        - var myCats = ['Fluffy', 'Mr. Snuggles', 'Ms. Fancy Feet']

        h1 #{helpers.titleCase('I love my ' + myCats.length + ' ' + helpers.pluralize('cat', myCats)}

        - var nav = helpers.linkify('/kitties?cat=', myCats)
        
        h4 Pick a Kitty!
        ul
          for link in nav
            li
              != link


## The Helpers

### escape(html)

Removes the HTML from a string. Very helpful for user generated content.

### unescape(text)

Does the opposite of escape.

### previewText(html, length)

This takes a string, stripes out any HTML, and returns the first # of characters specifed in length followed by an elipsis. If it would cut off the string in 
the middle of a word, it "rounds down" to the previous word. This is helpful for showing preview descriptions of blog posts, product descriptions, etc.

### previewImage(html, index, origin)

This finds the first (or a specifed 0-based index) image in HTML content. Useful for the same things you'd use previewText() for. If you supply an origin URL it will
attempt to convert relative URLs to absolute.

### limit(text, length)

A very simple function that limits the length of a string to a set number of characters. It adds an elipsis if needed. This is nice to use when your 
design allows for a fixed number of characters and you don't know exactly what the input will be.

### titleCase(text)

It transforms your string into Title Case where the first character of each word is capitalized and the rest is lower case. Note that each word is 
capitalized, even the little ones. So you'd get, "To Kill A Mocking Bird" and not "To Kill a Mocking Bird". 

### fractions(text)

It takes a string and transforms some of the decimal numbers into pretty fractions using &lt;sup&gt;'s and &lt;sub&gt;'s. It will transform every number that it can in
your string. Currently it supports: halfs, thirds, fourths, fifths, sixths, eighths and tenths since these are likely the most common, but it's easy to add
more if needed. For numbers with repeating decimals (i.e. 1.3333333 ...), it checks the first 3 decimal digits.

This helper is useful if you'd like to display pretty fractions for a recipe site, or maybe if you sell something that can be divided up. 

### linkify(prepend, list)

This takes an array of strings and converts it into an array of links. It uses the string for the anchor text, and builds the URL by prepending the prepend 
to each string. Useful for navs or turning blog post tags or categories into links. 

### pluralize(word, check, custom)

It takes the singular form of the supplied word, and makes it plural based on the check. The check turns the word into a plural with the behavior based on type: 
a number (not 1), an object (not one property), an array (not one item) or a boolean (not false). It forms the plural based on standard English grammar rules, and has a
lookup table for irregular words. Since there's no possible way that I've captured every irregular word, you can supply your own custom dictionary to override the
built in rules. 

This is helpful when you want your text to read more like proper English when you're generating it.  


## Tests

  npm test


## Contributing

Have a cool and helpful view helper you'd like to add? Perfect! Fork and send a pull request. Make sure to test and jshint your code.


## Release History

* 0.1.0 Initial release


## License

MIT 
