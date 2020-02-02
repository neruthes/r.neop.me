Getting Started
---------------

Base62 encoding converts numbers (positive integers) to ASCII strings and vice
versa:

```javascript
import { encode, decode } from "base62";

encode(9999); // "7bH"
decode("7bH"); // 9999

decode(239000); // "10aQ"
decode("10aQ"); // 239000
```

You might also use a custom character set, i.e. something other than the default
ASCII characters:

```javascript
import { encode, decode, indexCharset } from "base62/custom";

// NB: must be a string of exactly 62 unique characters
let charset = indexCharset("äöü…$#@%!…ß");

encode(…, charset);
decode(…, charset);
```


Contributing
------------

* ensure [Node](http://nodejs.org) is installed
* `npm install` downloads dependencies
* `npm test` runs the test suite and checks code for stylistic consistency


Alternatives
------------

This library is loosely based on Andrew Nesbitt's
[Base62.js](https://github.com/andrew/base62.js).
