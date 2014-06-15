#Metalsmith Flexible Shortcodes

Although there is a plugin called [metalsmith-shortcodes](https://github.com/ericgj/metalsmith-shortcodes) it doesn't really work the
way you expected (and how they work in WordPress, unlike stated). 

This aims to be a lot closer to the way the shortcodes work in WordPress:
`[foo param1="bar" param2="baz"]`

Internally this plugin uses [shortcode-parser](https://github.com/derdesign/shortcode-parser) to parse and render the shortcodes.


##Examples
```markdown
---
title: Test Page
template: page.hbt
---
This is a cool image:
[flickr src="https://www.flickr.com/photos/curlywurly1st/14438479793/in/explore-2014-06-14"]
```

And in your build file:

```js
shortcodes = require('metalsmith-flexible-shortcodes');

Metalsmith(__dirname)
    // ...
    .use(shortcodes({
        shortcodes: {
            'flickr': function(str, params) {
                return '<img href="' + params.src + '" />';
            }
        }
    }))
```

For more infos on how the shortcodes work check out [shortcode-parser](https://github.com/derdesign/shortcode-parser).

##Options

### `shortcodes`
An object with key value pairs, where each key represents the shortcode name, e. g. `[name]` and its value is the function that will be executed for this shortcode.

####Example
```js
{
    shortcodes: {
        'flickr': function(str, params) {
            return '<img href="' + params.src + '" />';
        }
    }
}
```
Can then be used as `[flickr]` in your files.


### `clean` 
If true, it will clean any `<p>`-Tags around the shortcodes, this is needed when you render your files with markdown in some cases.


##Notes
It is recommended you run this plugin after your markdown parser, otherwise you won't be able to use fenced code blocks. If you run into this issue also make sure to turn on the `clean` option.


##Building
This plugin is written in ES6 syntax, therefore you will need to compile it. 
Firstly run `$ npm install` and then `$ gulp`.


##License
The MIT License (MIT)

Copyright (c) 2014 Robin Thrift

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
