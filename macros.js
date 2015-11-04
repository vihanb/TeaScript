///
// Macros Implementation
// Prototype, Subglobals
///

/**
 * == PROTOTYPE ==
 * Array
 * String
 * Math
 * shoco

 * == NEW ==
 * Request

 * == Subglobals ==
 * String
**/

// ==== PROTOTYPE ==== //

/**
 * == Array ==
 * range
 * cycle
 * newsort
 * length
 * n
 * sum
 * chunk
 * unique
**/

Array.prototype.unique = function unique () {
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};

Array.prototype.chunk = function(size) {
    var self = this;
    return [].concat.apply([], self.map(function(l, i) {
        return i % size ? [] : [ self.slice(i, i + size) ];
    }));
}

Array.prototype.sum = function () {
    return eval( this.join('+') )
};

Array.range = function range (n, m) {
    return Array((m||n+n)-n).join().split(',').map(function (_, i) {
        return (m ? n : 0) + i;
    });
};

Array.prototype.cycle = function cycle (int) {
    return this.slice(-int) + this.slice(0, -int);
};

Array.prototype.newsort = function (func) {
    return this.slice().sort(func);
};

Object.defineProperty(Array.prototype, 'n', LENGTH = { get: function () {
    return this.length;
}});

/**
 * == String ==
 * g_replace
 * reverse
 * batchReplace
 * loop
 * reduce
 * head
 * cycle
 * isUpper
 * isLower
 * isDigit
 * alphanum
 * n
 * unique
 * onlyChars
 * chunk
 * filter
 * head
**/

String.prototype.head = function head (int) {
    return this.slice(0, int);
};

String.prototype.filter = function (func, delimiter) {
    return this.split(delimiter || '').filter(func).join(delimiter || '');
};

String.prototype.chunk = function chunk (size) {
    return this.match(RegExp(".{1,"+size+"}",'g'));
};

String.prototype.onlyChars = function onlyChars (reg, flags) {
    return RegExp('^['+( typeof reg === "array" ? reg[0][0] : reg )+']*$', flags || 'i').test(this);
};

String.prototype.unique = function (delimiter) {
    return this.split(typeof reg === "array" ? delimiter[0] : delimiter instanceof RegExp ? new RegExp(delimiter.source, 'i') : delimiter ).unique().join(typeof reg === "array" ? delimiter[0] : delimiter instanceof RegExp ? "" : delimiter);
};

String.prototype.g_replace = function g_replace (a,b, flag) {
    return this.replace( new RegExp(a, 'g' + (flag || '')), b )
};

String.prototype.reverse = function reverse () {
    return this.split('').reverse().join('');
};

String.prototype.batchReplace = function batchReplace (form) {
    return (typeof form === "object" ? form[0] : form).match(/[\S\s]{1,2}/g).reduce(function (old, format) {
        return old.split(format[0]).join(format[1]);
    }, this);
};

String.prototype.loop = function loop (func, delimiter) {
    return this.split(delimiter || '').map(func).join(delimiter || '');
};

String.prototype.reduce = function reduce (func, start) {
    return this.split('').reduce(func, start || this)
};

String.prototype.head = function head (int) {
    return this.slice(0, int);
};

String.prototype.cycle = function cycle (int) {
    return this.slice(-int) + this.slice(0, -int);
};

String.prototype.isUpper = function isUpper () {
    return /[A-Z]/.test(this);
};

String.prototype.isLower = function isLower () {
    return /[a-z]/.test(this);
};

String.prototype.isDigit = function isDigit() {
    return /[0-9]/.test(this);
};

String.prototype.alphanum = function alphanum () {
    return /[A-Za-z]/.test(this) ? [1,
                                    /[A-Z]/.test(this) ?
                                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" :
                                    "abcdefghijklmnopqrstuvwxyz"]
    : /[0-9]/.test(this) ? [2, "0123456789"]
    : [0, this]
};

Object.defineProperty(String.prototype, 'n', LENGTH);

/**
 * == Math ==
 * Fib
 * prime
 * rand
 * factorial
**/
Math.Fib = function Fib (n) {
    if (n <= 1) return n;
    return Math.Fib(n-1) + Math.Fib(n-2);
};

Math.prime = function prime (number) {
    var start = 2;
    while (start <= Math.sqrt(number)) if (number % start++ < 1) return false;
    return number > 1;
};

Math.rand = function rand (min, max, floored) {
    var val = Math.random() * (max ? max - min : min || 1) + (max ? min : 0);
    return min === undefined && max === undefined ? Math.round( Math.random() ) : floored === 0 ? val : Math.floor(val);
};

Math.factorial = function factorial(num) {
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

/**
 * == shoco ==
 * c
 * d
**/

shoco.c = function (str) {
    return Array.from(shoco.compress(str)).map(function (char) {
        return String.fromCharCode(char);
    }).join('');
};

shoco.d = function (str) {
    return shoco.decompress(new Uint8Array( ( str.constructor == Array ? str[0] : str ).split('').map(function (char) {
        return char.charCodeAt(0);
    })));
};

// == NEW ==
Request = {
    "G": function (u,c) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                var parser = new DOMParser(),
                    parsed = parser.parseFromString(req.responseText, "text/html")
                c(req.responseText, req.responseXML || parsed);
            };
        };
        req.open("GET", u, true);
        req.send();
    }
};

// == SUBGLOBALS ==

/**
 * == String ==
 * Y - digits
 * z - Alphabet lower
 * Z - Alphabet upper
**/

String.Y = "0123456789";
String.z = "abcdefghijklmnopqrstuvwxyz";
String.Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";