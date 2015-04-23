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

        h1 #{helpers.titleCase('I love my ' + myCats.length + helpers.pluralize('cat', myCats)}

        - var nav = helpers.linkify('/kitties?cat=', myCats)
        
        h4 Pick a Kitty!
        ul
          for link in nav
            li
              != link


 
## Tests

  npm test


## Contributing

Have a cool and helpful view helper you'd like to add? Perfect! Fork and send a pull request. Make sure to test and jshint your code.


## Release History

* 0.1.0 Initial release


## License

MIT 
