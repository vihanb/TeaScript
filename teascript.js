/* Uses babeljs (babeljs.io) to make ES7 -> ES5 */

/* Define new built-ins */
Array.range = function range (n, m) {
    return Array((m||n+n)-n).join().split(',').map(function (_, i) {
        return (m ? n : 0) + i;
    });
};

Array.prototype.cycle = function cycle (int) {
    return this.slice(-int) + this.slice(0, -int);
};

String.prototype.g_replace = function g_replace (a,b, flag) {
    return this.replace( new RegExp(a, 'g' + (flag || '')), b )
};

String.prototype.reverse = function reverse () {
    return this.split('').reverse().join('');
};

String.prototype.batchReplace = function batchReplace (form) {
    return form.match(/../g).reduce(function (old, format) {
        return old.replace( new RegExp('\\'+format[0], 'g'), format[1] );
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

Math.Fib = function Fib (n) {
    if (n <= 1)
        return n;
    return Math.Fib(n-1) + Math.Fib(n-2);
}

Math.prime = function prime (number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

function addItem (a,b) {
    document.getElementById('cheat').innerHTML += a+" -> "+b+"<br>";
}

String.Y = "0123456789";
String.z = "abcdefghijklmnopqrstuvwxyz";
String.Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var rules = {
    "Math": {
        'p': 'pow',
        'P': 'prime',
        'h': 'hypot',
        's': 'sqrt',
        'a': 'abs',
        'r': 'random',
        'F': 'Fib'
    },
    "String": {
        'c': 'fromCharCode'
    },
    "Array": {
        'r': 'range'
    }
}, proto = {
    "String": {
        'B': 'batchReplace',
        'c': 'charCodeAt',
        'C': 'cycle',
        'd': 'reduce',
        'g': 'g_replace',
        'h': 'head',
        'i': 'indexOf',
        'L': 'toLowerCase',
        'l': 'loop',
        'm': 'match',
        'n': 'length',
        'N': 'alphanum',
        'r': 'replace',
        'R': 'repeat',
        's': 'split',
        'S': 'slice',
        'u': 'toUpperCase',
        'v': 'reverse',
        'Y': 'isDigit',
        'z': 'isLower',
        'Z': 'isUpper'
    },
    "Array": {
        'C': 'cycle',
        'f': 'fill',
        'i': 'indexOf',
        'j': 'join',
        'k': 'keys',
        'm': 'map',
        'r': 'reverse',
        'R': 'reduce'
    },
    "RegExp": {
        't': 'test'
    }
}, enviorment = {
    '$': 'Math',
    'S': 'String',
    'A': 'Array',
    'e': 'eval',
    'R': 'RegExp',
    'D': 'Date'
}, noinf = {
    'C': String.fromCharCode,
    'F': Math.Fib,
    'a': Math.abs,
    'r': Array.range
};

Object.keys(rules).forEach(function (global) {
    Object.keys(rules[global]).forEach(function (prop) {
        window[global][prop] = window[global][ rules[global][prop] ];
        addItem(global+'.'+prop, global + '.' + rules[global][prop]);
    });
});

Object.keys(proto).forEach(function (global) {
    Object.keys(proto[global]).forEach(function (prop) {
        window[global].prototype[prop] = window[global].prototype[ proto[global][prop] ]
        addItem(global + '.prototope.' + prop, global + '.prototype.' + proto[global][prop]);
    });
});

Object.keys(enviorment).forEach(function (global) {
    window[global] = window[enviorment[global]];
    addItem(global, enviorment[global]);
});

Object.keys(noinf).forEach(function (global) {
    if (!window[global])
        window[global] = noinf[global];
    else
        console.warn("Could not map " + global);
    addItem(global, noinf[global].name);
});

var TeaScript = function (code, input) {

    var c=d=f=g=h=i=j=k=l=m=n=o=p=q=s=t=u=v=w=0;
    var b = "";

    window['_'] = input;
    window['x'] = document.getElementById('int').checked ? +input[0] : input[0];
    window['y'] = document.getElementById('int').checked ? +input[1] : input[1];
    window['z'] = document.getElementById('int').checked ? +input[2] : input[2];

    var b = babel.transform(code
                            .replace(/([(,=])#/g,'$1(l,i,a)=>')
                            .replace(/\(([^)#]+?)#(\d|[A-Za-z])/g,'($1)[$2]')
                            .replace(/([xliaS$)])([A-Za-z0-9])(?=[(:.+,)]|$)/g,'$1["$2"]')
                            , { stage: 0 }).code;
    console.log(b);
    return eval(b);
};
