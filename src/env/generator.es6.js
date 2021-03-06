(function (global) {

  const TeaScript = function (data) {

    let TEASCRIPT_ENV = false;

    // Reduced Prop names
    let _props = Object.keys(data.macros), // Global name
        _maps  = { g: global };            // Global maps

    /* Enviorment Generation */
    _props.forEach(function (name) {
      _maps.$$ = name; // Store current property name
      _maps.$_ = data.macros[ name ]; // Store current macro name

      Object.keys( _maps.$_ ).forEach(function ( key ) {
        // Reference some important information to private variables
        let _key = _maps.$_[key],
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
                if ( !_val[ prop ] || !TEASCRIPT_ENV ) // Error handling for duplicate property names
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
              if ( !global[ key ] || !TEASCRIPT_ENV )
                global[ key ] = _val;
              else
                console.warn("Enviorment Error: Existing Global: Slot used");
            }
          } catch (e) {
            _val = null;
            console.warn("Enviorment Error: Invalid location " + _maps.$$ + ", error " + e);
          }
        } else {
          console.warn("Unexpected Type: " + _key + " at " + key);
        }
      });
    });

    // Getters
    let _getters = Object.keys( data.getters ),
        _path    = { g: global };

    _getters.forEach(function (getter) {
      _path.$1 = global[ getter ];
      _path.$_ = data.getters[ getter ];

      Object.keys( _path.$_ ).forEach(function (item) {
        // Note current depth
        let _key = _path.$_[ item ],
            _val;

        if (typeof _key === "object") {
          _path.$2 = _path.$1[ item ];

          Object.keys( _key ).forEach(function ( prop ) {
            (function ( _val ){
              if ( !_path.$2[ prop ] || !TEASCRIPT_ENV ) {
                try {
                  Object.defineProperty(_path.$2, prop , {
                    get: function () { return this[ _val ](); },
                    configurable: true
                  });
                } catch (e) {
                  console.warn("Enviorment Error: Duplicate Getter: " + e);
                }
              } else {
                console.warn("Enviorment Error: Existing Sub Getter: Slot Used");
              }
            }( _key[prop] ))
          });

        } else if (typeof _key === "string") {
          if ( !_path.$1[ item ] || !TEASCRIPT_ENV ) {
            try {
              Object.defineProperty(_path.$1, item , {
                get: function () { return this[ _key ](); },
                configurable: true
              });
            } catch (e) {
              console.warn("Enviorment Error: Duplicate Getter: " + e);
            };
          } else {
            console.warn("Enviorment Error: Existing Getter: Slot Used");
          }
        } else {
          console.warn("Unexpected Type: " + _key + " at " + item);
        }

      });

    });

    TEASCRIPT_ENV = true; // Avoid duplicate enviorment generation
    return TEASCRIPT_ENV;
  };
  
  if (global.TeaScript) global.TeaScript.GenerateEnviorment = TeaScript;
  else global.TeaScript = TeaScript;
}(window));