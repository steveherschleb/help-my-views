var cleaner = require('htmlstrip-native');
var cheerio = require('cheerio');
var _ = require('underscore');


module.exports = {
  
  escape: function (html) {
    'use strict';

    return html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;')
               .replace(/`/g, '&#x60;');
  },

  
  unescape: function (html) {
    'use strict';

    return html.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, '\'')
               .replace(/&#x60;/g, '`');
  },

  
  previewText: function (html, length) {
    'use strict';
    
    //Default length
    length = length || 50;

    //jshint camelcase: false
    var options = {
      include_script : false,
      include_style : false,
      compact_whitespace : true
    };
  
    // Strip tags and decode HTML entities
    var text = cleaner.html_strip(html, options).trim();
    //jshint camelcase: true
  
    //Trim the text as needed for preview
    if (text.length > length) {
      var str = text.substr(0, length);
      return str.substr(0, Math.min(str.length, str.lastIndexOf(' '))) + ' . . .';
    } else {
      return text;
    }
  },

  
  previewImage: function (html, index, origin) {
    'use strict';
    
    var $ = cheerio.load(html);
    var img = {};
    
    //Default index
    index = index || 0;

    //Extract the image
    img.src = $('img').eq(index).attr('src');
    img.alt = $('img').eq(index).attr('alt');
    
    if (!img.src) {
      return;
    }

    //Convert relative URLs to absolute only if the URL is currently a relative one
    if (img.src && origin && img.src.indexOf('http') !== 0) {

      //Remove the trailing slash on the origin URL
      if (origin.slice(-1) === '/') {
        origin = origin.slice(0, -1);
      }
      
      //Build the full URL
      img.src = origin + img.src;
    }
    
    return img;
  },


  limit: function (text, length) {
    'use strict';
    
    //Default value
    length = length || 10;

    if (typeof(text) === 'undefined') {
      return '';
    }

    if (text.length <= length) {
      return text;
    }
    
    return text.slice(0,length-3) + '...';
  },


  titleCase: function (text) {
    'use strict';
    
    //Find each word, make it Title Case
    return text.replace(/\w\S*/g, function (word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); });
  },


  fractions: function (text) {
    'use strict';

    
    function convert(digits) {
      var ret;

      //Hide the leading zero
      if (digits[0] === '0') {
        digits[0] = '';
      }
      
      //check is there are any non-numeric parts after the partial digits, and save to append later
      var append = '';
      for (var i=0, len=digits[1].length;i<len;i++) {
        if ('0123456789'.indexOf(digits[1][i]) === -1) {
          //Found a non-numeric character, so split the string into the numeric and non-numeric parts
          append = digits[1].substring(i);
          digits[1] = digits[1].substring(0, i);
          break;
        }
      }
      
      //Table of "known" fractions 
      var table = {
        '5': '<sup>1</sup>/<sub>2</sub>',
        '333': '<sup>1</sup>/<sub>3</sub>',
        '667': '<sup>2</sup>/<sub>3</sub>',
        '25': '<sup>1</sup>/<sub>4</sub>',
        '75': '<sup>3</sup>/<sub>4</sub>',
        '2': '<sup>1</sup>/<sub>5</sub>',
        '4': '<sup>2</sup>/<sub>5</sub>',
        '6': '<sup>3</sup>/<sub>5</sub>',
        '8': '<sup>4</sup>/<sub>5</sub>',
        '167': '<sup>1</sup>/<sub>6</sub>',
        '833': '<sup>5</sup>/<sub>6</sub>',
        '125': '<sup>1</sup>/<sub>8</sub>',
        '375': '<sup>3</sup>/<sub>8</sub>',
        '625': '<sup>5</sup>/<sub>8</sub>',
        '875': '<sup>7</sup>/<sub>8</sub>',
        '1': '<sup>1</sup>/<sub>10</sub>',
        '3': '<sup>3</sup>/<sub>10</sub>',
        '7': '<sup>7</sup>/<sub>10</sub>',
        '9': '<sup>9</sup>/<sub>10</sub>',
      };
      
      //Check if this is a known fraction      
      if (digits[1] in table) {
        ret = digits[0] + ' ' + table[digits[1]];
      } else {
        ret = digits.join('.');
      }
      
      return ret.trim() + append;
    }
    
    if (!text) {
      return '';
    }
    
    //Break the text apart into words
    var parts = text.toString().split(' ');
    var output = [];
    
    for (var i=0, len=parts.length;i<len;i++) {
      if(isNaN(parseFloat(parts[i]))) {
        //Do nothing to non-numeric words
        output.push(parts[i]);
        continue;
      }
      
      var digits = parts[i].split('.');

      if (digits.length === 1) {
        //Do nothing to integers
        output.push(parts[i]);
        continue;
      }
      
      output.push(convert(digits));
    }

    //Rebuild the text
    return output.join(' ').trim();
  },


  linkify: function (prepend, list) {
    'use strict';
    
    function makeLink(text) {
      return '<a href="' + prepend + encodeURIComponent(text) + '">' + text + '</a>';
    }

    //Just run it once if list isn't an Array
    if (!Array.isArray(list)) {
      return makeLink(list);
    }

    var output = [];
    
    for (var i=0, len=list.length;i<len;i++) {
      output.push(makeLink(list[i]));
    }

    return output;
  },


  pluralize: function (word, check, custom) {
    'use strict';

    var makePlural;

    if (_.isArray(check)) {
      makePlural = check.length !== 1;
    } else if (_.isNumber(check)) {
      makePlural = check !== 1;
    } else if (_.isBoolean(check)) {
      makePlural = check;
    } else if (_.isObject(check)) {
      makePlural = Object.keys(check).length !== 1;
    }

    if (!makePlural) {
      return word;
    }
    
    //Partial list of irregular English plural words
    var list = {
      elf: 'elves',
      calf: 'calves',
      knife: 'knife',
      loaf: 'loaves',
      shelf: 'shelves',
      wolf: 'wolves',
      man: 'men',
      person: 'people',
      mouse: 'mice',
      child: 'children',
      foot: 'feet',
      goose: 'geese',
      moose: 'moose',
      tooth: 'teeth',
      louse: 'lice',
      cactus: 'cacti',
      appendix: 'appendices',
      ox: 'oxen',
      scissors: 'scissors',
      pants: 'pants',
      bison: 'bison',
      deer: 'deer',
      sheep: 'sheep',
      cod: 'cod',
      fish: 'fish',
      shrimp: 'shrimp',
      quail: 'quail',
      canto: 'cantos',
      hetero:  'heteros',
      photo: 'photos',
      zero:  'zeros',
      piano: 'pianos',
      portico: 'porticos',
      pro: 'pros',
      quarto: 'quartos',
      kimono:  'kimonos',
    };

    //Check if its in the custom dictionary
    if (custom && _.isObject(custom) && word in custom) {
      return custom[word];
    }

    //Check if it's irregular
    if (word in list) {
      return list[word];
    }

    var vowels = ['a','e','i','o','u'];

    //Example: category -> categories
    if (word.slice(-1) === 'y' && vowels.indexOf(word.slice(-2,-1)) === -1 ) {
      return word.slice(0, -1) + 'ies';
    }
    
    //Example: Potato -> potatoes
    if (word.slice(-1) === 'o' && vowels.indexOf(word.slice(-2,-1)) === -1 ) {
      return word + 'es';
    }
    
    //Example: kiss -> kisses
    if (word.slice(-1) === 's') {
      return word + 'es';
    }
    
    //Example: church -> churches
    if (word.slice(-2) === 'ch') {
      return word + 'es';
    }

    //Example: dog -> dogs
    return word + 's';
  },

};
