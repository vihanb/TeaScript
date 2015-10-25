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

Math.Fib = function Fib (n) {
    if (n <= 1)
        return n;
    return Math.Fib(n-1) + Math.Fib(n-2);
}

// Just for the online interpreter
function addItem (a,b) {
    document.getElementById('cheat').innerHTML += a+" -> "+b+"<br>";
}

/* Define rule mappings (e.g. p => pow) */
var rules = {
    "Math": {
        'p': 'pow',
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
        'r': 'replace',
        'R': 'repeat',
        's': 'split',
        'S': 'slice',
        'u': 'toUpperCase',
        'v': 'reverse',
    },
    "Array": {
        'C': 'cycle',
        'f': 'fill',
        'j': 'join',
        'k': 'keys',
        'm': 'map',
        'r': 'reverse',
        'R': 'reduce'
    },
    "Number": {
        'b': 'toString'
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
    'r': Array.range
};

/* Apply rule mappings */
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

// TeaScript functions
var TeaScript = function (code, input) {

    // Pre-define all 1-letter globals to avoid needing "var" in program
    var a=c=d=f=g=h=i=j=k=l=m=n=o=p=q=s=t=u=v=w=0;
    // Pre-define b to an empty string
    var b = "";

    window['_'] = input; // Set _ to array of inputs
    window['x'] = +input[0] || input[0]; // Set x to first input
    window['y'] = +input[1] || input[1];
    window['z'] = +input[2] || input[2];

    // Runs through babel, makes ES7 -> ES5
    var b = babel.transform(code
                            .replace(/\(#/g,'((l,i,a)=>') // Function # shorthand
                            .replace(/\((\d+(?:,\d+)?)#([A-Za-z0-9])(?![^A-Za-z0-9])/g,'($1)[$2]') // Removes need for some brackets
                            .replace(/([xlia)])([A-Za-z])\(/g,'$1.$2(') // Removes need for some periods in some places
                           ).code;
    console.log(b);
    return eval(b); // Run generated code
};
