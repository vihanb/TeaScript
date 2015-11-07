(function (global, data) {

    global.TEASCRIPT_ENV = false;

    var TeaScript = function (code, inputs, opts, plug) {

        // Temporary Private
        var _props = Object.keys(data.macros), // Global name
            _maps  = { g: global };            // Global maps

        /* Enviorment Generation */
        _props.forEach(function (name) {
            _maps.$$ = name; // Store current property name
            _maps.$_ = data.macros[ name ]; // Store current macro name

            Object.keys( _maps.$_ ).forEach(function ( key ) {
                // Reference some important information to private variables
                var _key = _maps.$_[key],
                    _loc = 'return ' + data.def[ _maps.$$ ].replace(/\$/g, "this.$"), // Hacky way of restricting scope
                    _val;

                _maps.$1 = _key; // Store key for first depth

                if (typeof _key === "object") {

                    Object.keys( _key ).forEach(function ( prop ) {
                        _maps.$1 = key;
                        
                        // Lovely try..catch syntax
                        try {
                            _val = new Function(_loc).call(_maps); // Attempt to locate specified path for property

                            if ( _val) {
                                if ( !_val[ prop ] || !opts.loose || global.TEASCRIPT_ENV) // Error handling for duplicate property names
                                    _val[ prop ] = _val[ _key[prop] ];
                                else
                                    console.warn("Enviorment Error: Existing subglobal: Slot used:");
                            }
                        } catch (e) {
                            console.warn("Enviorment Error: Invalid location " + _maps.$$ + ", error " + e);
                        }
                    });

                } else if (typeof _key === "string") {
                    try {
                        _val = new Function(_loc).call(_maps);
                        if ( _val ) {
                            if ( !global[ key ] || !opts.loose || global.TEASCRIPT_ENV )
                                global[ key ] = _val;
                            else
                                console.warn("Enviorment Error: Existing Global: Slot used:");
                        }
                    } catch (e) {
                        _val = null;
                        console.warn("Enviorment Error: Invalid location " + _maps.$$ + ", error " + e);
                    }
                } else {
                    console.warn("Unexpected Type: " + _key + " at " + key);
                }
            });

            global.TEASCRIPT_ENV = true; // Prevent enviorment duplicates
        });
        
        // Getters
        
        data.getters.transform

        /* Transpile */
        var INF = { comp: code, out: "", // Compile data
                   ex: null, safe: [] };

        // Intermedite Compilation

        if (opts.chars === false) {
            INF.comp = Object.keys( data.rep ).reduce(function (cmp, key) {
                return cmp.replace( new RegExp(key, 'g'), data.rep[ key ] )
            }, INF.comp) || "";
        }

        INF.comp =
            INF.comp.replace(/([(,=])#/g,'$1(l,i,a)=>')
            .replace(/\(([^)#]+?)#(\d|[A-Za-z])/g,'($1)[$2]')
            .replace(/(?![^A-Za-z\/]{2,})([xyliaLSAX$)\/\]'"])([A-Za-z0-9])(?=[`(:.+,)<>?: ]|$)/g,'$1["$2"]');

        // Babel Transpilation
        if (babel) {
            try {
                INF.comp = babel.transform(INF.comp, {
                    loose: opts.loose
                }).code;
            } catch (e) {
                INF.ex = e;
            }
        } else {
            console.warn("Dependency not found: babel");
            return "An error occured during compiling.";
        }

        /* Execution */

        // Allocate reserved variables
        var _free = {
            'acdefghijklmnoqrsuvw': 0,
            't': 1,
            'b': '',
            'p': ' '
        };

        Object.keys( _free ).forEach(function (letters) {
            letters.split('').forEach(function (chars) {
                if ( !window[chars] ) {
                    window[chars] = _free[letters];
                    INF.safe.push(chars);
                }
            });
        });

        // Input Variables
        if (opts.ar)  inputs = inputs.map(function(input) { return input.split(',') });
        if (opts.int) inputs = inputs.map(function(input) { return input instanceof Array ? input.map(Number) : +input });

        window.x = inputs[0];
        window.y = inputs[1];
        window.z = inputs[2];
        window._ = inputs;

        // Run
        if (!INF.ex) {
            try {
                INF.out = eval(INF.comp);
            } catch (e) {
                INF.ex = e;
            }
        }

        return INF;
    };

    /* Globals */
    TeaScript.Golf = function (code, args) {
        return Object.keys( data.rep ).reduce(function (cmp, key) {
            return cmp.split( args ? key : data.rep[ key ] ).join( args ? data.rep[ key ] : key );
        }, code);
    };

    TeaScript.Data = data;

    global.TeaScript = TeaScript;

}(window, /* props.json file contents goes here */));