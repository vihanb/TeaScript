///
// TeaScript
// v2
///

/** == Setup == **/

// ==== DEPENDENCIES  ==== //

// == Remote == //
// * babel.js - http://babeljs.io

// == Local == //
// * macros.js - ./macros.js
// * props.json - ./props.js
// * shortcuts.json - ./shortcuts.json
// * func.halt - ./rep/func.halt

// ==== MINIMAL STRUCTURE ==== //
//
// ./
//   TeaScript.js
//   props.js
//   macros.json
//   shortcuts.json
//   rep/
//       func.halt

// ==== GLOBALS ==== //
// babel
//      .transform
//      .run
//
// LZString
//         .compress
//         .decompress
//
// HALT

/** == START == **/

(function (GLOBAL) {
    
    var TeaScript = function (code, input, opts) {
        // References local defaults
        this._scope = {};
        this._input = [];
        this._opts = opts;
        
        this.scope = this._scope;
        this.input = input || this._input;
        
        this.code = code   || "'use strict';";
        
        return this;
    };
    
    GLOBAL.TeaScript = TeaScript;
    
}(window));