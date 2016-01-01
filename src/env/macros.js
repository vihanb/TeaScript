///
// Macros Implementation
// Prototype, Subglobals
///

/**
 * == PROTOTYPE ==
 * Number
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
 * == Number ==
 * pow
 * sqrt
 * cbrt
 * ceil
 * round
**/

Number.prototype.pow = function (n) {
  return Math.pow(this, n || 2);
};

Number.prototype.sqrt = function () {
  return Math.sqrt(this);
};

Number.prototype.cbrt = function () {
  return Math.cbrt(this);
};

Number.prototype.ceil = function () {
  return Math.ceil(this);
};

Number.prototype.round = function () {
  return Math.round(this);
};

Number.prototype.toString =  (function(toStr) { return function(n) {
  return toStr.call(this, n || 2)
} }(Number.prototype.toString));

Number.prototype.sign = function () {
  return this.sign();
};

Number.prototype.parseString = function(n) {
  return parseInt(this, n || 2);
};

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
 * transform
 * min
 * max
 * loc
 * get
 * containsAll
 * dupe
**/

Array.prototype.dupe = function dupe () {
  return this.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
};

Array.prototype.max = function max () {
  return Math.max.apply(Math, this);
};

Array.prototype.min = function min () {
  return Math.min.apply(Math, this);
};

Array.prototype.get = function get (i,z) {
  return this[i|0] || z || "";
};

Array.prototype.loc = function loc () {
  return [ Math.min.apply(Math, this), Math.max.apply(Math, this),
          this.indexOf(Math.min.apply(Math, this)) == this.indexOf(Math.min.apply(Math, this), this.indexOf(Math.min.apply(Math, this))) ? 1 : 0,
          this.indexOf(Math.max.apply(Math, this)) == this.indexOf(Math.max.apply(Math, this), this.indexOf(Math.max.apply(Math, this))) ? 1 : 0 ]
};

Array.prototype.n_join = function (d) { return [].concat.apply([], this).join(d) };

Array.prototype.containsAll = function containsAll (arg) {
  var self = this;
  if (typeof arg === "array") {
    //        arg.every(function () {} );
  } else {
    return arguments.every(function (args) {
      return self[ args[0] ] == args[1];
    });
  }
};

Array.prototype.transpose = function () {
  var str = typeof this[0][0] === "string",
      self = str ? this.map(function (str) {
        return str.split('');
      }) : this;
  return self[0].map(function (_, index) {
    return self.map(function (array) {
      return array[index];
    })[str ? 'join' : 'valueOf']('');
  })
};

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

Array.prototype.iff = function iff (c, run) {
  if (c) {
    this[run].apply(this, arguments.slice(2));
  } else {
    return this;
  }
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
 * get
 * unique
 * onlyChars
 * chunk
 * fix
 * filter
 * head
 * w_replace
 * sort
 * every
 * some
 * insert
**/

String.prototype.insert = function insert (index, str) {
  return this.slice(0, index) + str + this.slice(index);
};

String.prototype.w_replace = function w_replace (reg, str, flags) {
  var t = this.replace( reg instanceof RegExp ? reg : new RegExp(reg, flags || ''), str || "" );
  return t != this ? t.w_replace(reg, str || "", flags) : t;
};

String.prototype.sort = function sort (func) {
  return this.split('').sort(func).join('')
};

String.prototype.some = function some (func) {
  return this.split('').some(func);
};

String.prototype.every = function every (func) {
  return this.split('').every(func);
};

String.prototype.head = function head (int) {
  return this.slice(0, int);
};

String.prototype.filter = function filter (func, delimiter, ret) {
  var self = this;
  return this.split(delimiter || '').filter(function (l,i,b) {
    return func.call(this, l,i,self, b);
  }).join(ret || '');
};

String.prototype.fix = function fix (s, n) {
  return ((s || "0").repeat(n) + this).slice(-n);
}

String.prototype.iff = function iff (c, a) {
  if (c) {
    return this[a].apply(this, Array.from(arguments).slice(2));
  } else {
    return this;
  }
}

String.prototype.chunk = function chunk (size) {
  return this.match(RegExp(".{1,"+size+"}",'g'));
};

String.prototype.onlyChars = function onlyChars (reg, old, flags) {
  return !old ? RegExp('^['+( typeof reg === "array" ? reg[0][0] : reg )+']+$', flags || '').test(this) : (this.match(new RegExp('['+reg+']', 'gi'))||[]).join('');
};

String.prototype.mergecaps = function (newcap) {
  return this.split("").reduce(function (pending, item, index) {
    return pending + ( newcap[index].toUpperCase() === newcap[index] ? item.toUpperCase() : item.toLowerCase() );
  }, "");
};

String.prototype.unique = function (delimiter) {
  return this.split(typeof reg === "array" ? delimiter[0] : delimiter instanceof RegExp ? new RegExp(delimiter.source, 'i') : delimiter ).unique().join(typeof reg === "array" ? delimiter[0] : delimiter instanceof RegExp ? "" : delimiter);
};

String.prototype.g_replace = function g_replace (a,b, flag) {
  return this.replace( new RegExp(a, 'g' + (flag || '')), b || "" )
};

String.prototype.get = function get (i,z) {
  return this[i|0] || "";
};

String.prototype.reverse = function reverse () {
  return this.split('').reverse().join('');
};

String.prototype.batchReplace = function batchReplace (form) {
  if (arguments.length < 2) {
    return (typeof form === "object" ? form[0] : form).match(/[\S\s]{1,2}/g).reduce(function (old, format) {
      return old.split(format[0]).join(format[1]);
    }, this);
  } else {
    return [].reduce.call(arguments, function (old, format, index, array) {
      return index % 2 ? old : old.replace( new RegExp(format, 'g'), array[index + 1]);
    }, this);
  }
};

String.prototype.loop = function loop (func, delimiter, ret) {
  var self = this;
  return this.split(delimiter || '').map(function (l,i,b) {
    return func.call(this, l,i,b,self);
  }).join(delimiter || '');
};

String.prototype.D = function D (func, delimiter, ret) {
  return this.split(ret || /\s+/).map(func).join(delimiter);
};

String.prototype.reduce = function reduce (func, start) {
  return this.split('').reduce(func, typeof start === "undefined" ? this : start);
};

String.prototype.head = function head (int) {
  return this.slice(0, int);
};

String.prototype.cycle = function cycle (int) {
  return this.slice(-int) + this.slice(0, -int);
};

String.prototype.isUpper = function isUpper () {
  return /^[A-Z]+$/.test(this);
};

String.prototype.isLower = function isLower () {
  return /^[a-z]+$/.test(this);
};

String.prototype.isDigit = function isDigit() {
  return /^[0-9]+$/.test(this);
};

String.prototype.alphanum = function alphanum (a) {
  return !((a+"")||"").includes(0) && /[0-9]/.test(this) ? "0123456789"
  : !((a+"")||"").includes(1) && /[A-Za-z]/.test(this) ? /[A-Z]/.test(this) ?
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" :
  "abcdefghijklmnopqrstuvwxyz"
  : this
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

Math.compare = function (ar, n2) {
  if (n2) {
    if (ar > n2) {
      return 1;
    } else if (ar < n2) {
      return 2;
    } else if (ar == n2) {
      return 0;
    }
  } else {
    if (ar[0] > ar[1]) {
      return 1;
    } else if (ar[0] < ar[1]) {
      return 2;
    } else if (ar[0] == ar[1]) {
      return 0;
    }
  }
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

var e = function (s,a) {
  var args = arguments;
  return typeof s !== "string" ? eval(s.map(function(l,i){return l+(typeof args[i+1]==="undefined"?"":args[i+1])}).join("")) : eval(s);
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
