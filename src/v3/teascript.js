/* Generated by Babel */
////
//
// TeaScript 3 - Compiler
// (c) Vihan B 2015
//
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

(function (global) {
  var TeaScript = function TeaScript(Code) {
    var Data = arguments.length <= 1 || arguments[1] === undefined ? { rep: {} } : arguments[1];

    ///
    //
    // TeaScript 3
    // Compiler Process:
    //
    // - Generate Enviorment
    // - Quote Balancing
    // - Unicode Shortcuts
    // - Property Expansion
    // - Operator Overloading
    // - Fix parenthesis
    // - Decompress strings
    ///

    var GenerationData = {
      steps: {
        reps: "",
        parenfix: ""
      },
      Error: ""
    };

    var Warn = function Warn(desc) {
      return GenerationData.Error += "Error: " + desc + ".\n";
    };
    var Error = function Error(desc) {
      return GenerationData.Error += "Critical Error: " + desc + ".\n";
    };

    // CONSTANTS
    var MAX_LITERAL = 65536; // 2^16

    var ESCAPES = [["\"", "\"", "\\"], ["'", "'", "\\"], ["/", "/", "\\"], ["`", "`", "\\"]];
    var ESCAPES_START = ESCAPES.map(function (Escape) {
      return Escape[0];
    });
    var ESCAPES_END = ESCAPES.map(function (Escape) {
      return Escape[1];
    });
    var ESCAPES_ESC = ESCAPES.map(function (Escape) {
      return Escape[2];
    });
    var ESCAPES_KEEP = ESCAPES.map(function (Escape) {
      return !Escape[3];
    });

    var COMMENT = [["//", "\n"], ["/*", "*/"]];

    var CLOSE = [["[", "]"], ["(", ")"]];

    var CLOSE_START = CLOSE.map(function (Item) {
      return Item[0];
    });
    var CLOSE_END = CLOSE.map(function (Item) {
      return Item[1];
    });

    var MATCH_PROP = /[A-Za-z$_][\w$]*/;
    var MATCH_NUM = /\d/;
    var MATCH_LTRL = /["'`0-9]/; // Literal
    var MATCH_LEND = /["'`0-9)/\]]/; // Match any end
    var MATCH_STRT = /["'`0-9(#@/ßα]/;
    var MATCH_END = /[)\]]/;
    var MATCH_DIV = /[\d\w\/\\`"'\)@$.]/;

    var RESERVED = ["for", "while", "let", "var", "if", "const", "break", "continue", "class", "do"];

    var REGEX_FLAG = /[gmi]+/;
    var REGEX_CLASS = new Map([["A", "[A-Z]"], ["a", "[a-z]"], ["L", "[A-Za-z]"], ["N", "[A-Za-z0-9]"]]);

    /*=== START CODE ===*/

    // Unicode Shortcuts & Prop Expansion
    {
      var EscapeChar = -1;
      var PendingProp = "";

      var _loop = function (_i) {
        if (PendingProp.length > 0) {
          // Within a property name
          if (MATCH_PROP.test(Code[_i])) {
            PendingProp += Code[_i];
            if (_i === Code.length - 1) GenerationData.steps.reps += PendingProp.replace(/(?!^|$)/g, ".");
          } else {
            var _prop = PendingProp;
            PendingProp = "";
            if (Code[_i] === "\\") {
              GenerationData.steps.reps += _prop + "(";
            } else {
              if ((MATCH_STRT.test(Code[_i]) || MATCH_END.test(Code[_i])) && !RESERVED.includes(_prop)) {
                GenerationData.steps.reps += _prop.replace(/(?!^|$)/g, ".");
                if (Code[_i] !== "(" && Code[_i] !== ")" && Code[_i] !== "`") GenerationData.steps.reps += "(";
              } else {
                GenerationData.steps.reps += _prop;
              }
              _i--;
            }
          }
        } else {
          if (COMMENT.some(function (Start) {
            return Code.slice(_i, _i + Start[0].length) === Start[0];
          })) {
            // Comment
            var _Comment = COMMENT.find(function (Start) {
              return Code.slice(_i, _i + Start[0].length) === Start[0];
            });
            _i += _Comment[0].length;
            for (var j = _i; _i - j < MAX_LITERAL && Code[_i] && Code.slice(_i, _i + _Comment[1].length) !== _Comment[1]; _i++) {}
          } else if (Code[_i] === "/" && !MATCH_DIV.test([].concat(_toConsumableArray(Code.slice(0, _i))).reverse().join("").trim() || "")) {
            // Start custom RegExps
            GenerationData.steps.reps += "/";
            _i++;
            for (var j = _i; _i - j < MAX_LITERAL && Code[_i] !== "/"; _i++) {
              if (Code[_i] === "\\") {
                if (REGEX_CLASS.has(Code[_i + 1])) GenerationData.steps.reps += REGEX_CLASS.get(Code[_i++ + 1]);else GenerationData.steps.reps += "\\" + Code[++_i];
              } else {
                GenerationData.steps.reps += Code[_i];
              }
              if (!Code[_i + 1]) Code += "/";
              if (_i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            GenerationData.steps.reps += "/";

            // Hacky way of allowing flags
            if (!Code.slice(++_i).search(REGEX_FLAG)) {
              // There are flags
              GenerationData.steps.reps += Code.slice(_i).match(REGEX_FLAG)[0];
              _i += Code.slice(_i).match(REGEX_FLAG)[0].length;
            }
            --_i;
          } else if (Code[_i] === "/" ? !MATCH_DIV.test([].concat(_toConsumableArray(Code.slice(0, _i))).reverse().join("").trim() || "") : ESCAPES_START.includes(Code[_i])) {
            // Found an escape character (string)
            EscapeChar = ESCAPES_START.indexOf(Code[_i]);
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[_i];
            _i++;
            for (var j = _i; _i - j < MAX_LITERAL && Code[_i] !== ESCAPES_END[EscapeChar]; _i++) {
              if (Code[_i] === ESCAPES_ESC[EscapeChar]) {
                if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += ESCAPES_ESC[EscapeChar];
                GenerationData.steps.reps += Code[++_i];
              } else {
                GenerationData.steps.reps += Code[_i];
              }
              if (!Code[_i + 1]) Code += ESCAPES_END[EscapeChar];
              if (_i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[_i];
          } else if (MATCH_PROP.test(Code[_i])) {
            // Property character
            if (MATCH_LEND.test(Code[_i - 1])) GenerationData.steps.reps += ".";
            if (Code[_i + 1]) PendingProp += Code[_i];else GenerationData.steps.reps += Code[_i];
          } else if (Code[_i] === "#") {
            // # Operator
            GenerationData.steps.reps += "(l,i,a,b)=>";
          } else if (Code[_i] === "@") {
            // @ Operator
            GenerationData.steps.reps += "(q,r,s,t)=>q.";
          } else if (MATCH_NUM.test(Code[_i])) {
            // Number
            for (var j = _i; _i - j < MAX_LITERAL && /[\d.]/.test(Code[_i]); _i++) {
              GenerationData.steps.reps += Code[_i];
            }GenerationData.steps.reps += " ";--_i;
          } else if (Data.rep.hasOwnProperty(Code[_i])) {
            // Unicode char
            GenerationData.steps.reps += Data.rep[Code[_i]];
          } else {
            // Other
            GenerationData.steps.reps += Code[_i];
          }
        }
        i = _i;
      };

      for (var i = 0; i < Code.length; i++) {
        _loop(i);
      }
    }
    // RESERVED: liabxyz_

    // Adjusts parenthesis
    {
      var Code_1 = GenerationData.steps.reps;

      var NestOrder = [];
      var EscapeChar = -1;
      for (var _i2 = 0; _i2 < Code_1.length; _i2++) {
        if (Code_1[_i2] === "/" ? !MATCH_DIV.test([].concat(_toConsumableArray(Code_1.slice(0, _i2))).reverse().join("").trim() || "") : ESCAPES_START.includes(Code_1[_i2])) {
          // Found an escape character (string)
          EscapeChar = ESCAPES_START.indexOf(Code_1[_i2]);
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[_i2];
          _i2++;
          for (var j = _i2; _i2 - j < MAX_LITERAL && Code_1[_i2] !== ESCAPES_END[EscapeChar]; _i2++) {
            if (Code_1[_i2] === ESCAPES_ESC[EscapeChar]) {
              if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += ESCAPES_ESC[EscapeChar];
              GenerationData.steps.parenfix += Code_1[++_i2];
            } else {
              GenerationData.steps.parenfix += Code_1[_i2];
            }
            if (_i2 - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
          }
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[_i2];
        } else if (CLOSE_START.includes(Code_1[_i2])) {
          // Open
          GenerationData.steps.parenfix += Code_1[_i2];
          NestOrder.push(Code_1[_i2]);
        } else if (CLOSE_END.includes(Code_1[_i2])) {
          // Close
          GenerationData.steps.parenfix += Code_1[_i2];
          NestOrder.pop();
        } else {
          GenerationData.steps.parenfix += Code_1[_i2];
        }
      }
      NestOrder.reverse().forEach(function (Key) {
        return GenerationData.steps.parenfix += CLOSE_END[CLOSE_START.indexOf(Key)];
      });
    }

    return GenerationData;
  };

  if (global.TeaScript) global.TeaScript.Compile = TeaScript;else global.TeaScript = TeaScript;
})(window /*, JSON.parse(read("props.json"))*/);
////