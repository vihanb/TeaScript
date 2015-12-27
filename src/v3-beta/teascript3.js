/* Generated by Babel */
////
//
// TeaScript 3 - Compiler
// (c) Vihan B 2015
//
"use strict";

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
    // -- Todo
    // - Decompress strings
    // - Transpile
    // - eval
    ///

    var GenerationData = {
      steps: {
        strfix: "",
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

    var ESCAPES = [["\"", "\"", "\\"], ["'", "'", "\\"], ["/", "/", "\\"], ["`", "`", "\\"], ["$", "$", "\\", 1]];
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
    var MATCH_STRT = /["'`0-9(#/]/;

    var RESERVED = ["for", "while", "let", "var", "class", "do", "if"];

    var REGEX_CLASS = new Map([["A", "[A-Z]"], ["a", "[a-z]"], ["L", "[A-Za-z]"], ["N", "[A-Za-z0-9]"]]);

    /*=== START CODE ===*/

    // String Balancing
    {}

    // This works backwards
    // Unicode Shortcuts & Prop Expansion
    {
      var EscapeChar = -1;
      var PendingProp = "";
      for (var i = 0; i < Code.length; i++) {
        if (PendingProp.length > 0) {
          // Within a property name
          if (MATCH_PROP.test(Code[i])) {
            // Issue 4 - https://github.com/vihanb/TeaScript/issues/4
            // VERY TEMPORARY
            // I'll add a way of detecting
            // between a JS function and a TeaScript one
            PendingProp += Code[i];
            if (i === Code.length - 1) GenerationData.steps.reps += PendingProp;
          } else {
            var _prop = PendingProp;
            PendingProp = "";
            if (MATCH_STRT.test(Code[i]) && !RESERVED.includes(_prop)) {
              GenerationData.steps.reps += _prop.replace(/(?!^|$)/g, ".");
              if (Code[i] !== "(") GenerationData.steps.reps += "(";
            } else {
              GenerationData.steps.reps += _prop;
            }
            i--;
          }
        } else {
          if (Code[i] === "/") {
            // Start custom RegExps
            GenerationData.steps.reps += "/";
            i++;
            for (var j = i; i - j < MAX_LITERAL && Code[i] !== "/"; i++) {
              if (Code[i] === "\\") {
                if (REGEX_CLASS.has(Code[i + 1])) GenerationData.steps.reps += REGEX_CLASS.get(Code[i++ + 1]);else GenerationData.steps.reps += "\\" + Code[++i];
              } else {
                GenerationData.steps.reps += Code[i];
              }
              if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            GenerationData.steps.reps += "/";

            // Hacky way of allowing flags
            if (!Code.slice(++i).search(/[gmi]+/)) {
              // There are flags
              GenerationData.steps.reps += Code.slice(i).match(/[gmi]+/)[0];
              i += Code.slice(i).match(/[gmi]+/)[0].length;
            }
            --i;
          } else if (ESCAPES_START.includes(Code[i])) {
            // Found an escape character (string)
            EscapeChar = ESCAPES_START.indexOf(Code[i]);
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[i];
            i++;
            for (var j = i; i - j < MAX_LITERAL && Code[i] !== ESCAPES_END[EscapeChar]; i++) {
              if (Code[i] === ESCAPES_ESC[EscapeChar]) {
                if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += ESCAPES_ESC[EscapeChar];
                GenerationData.steps.reps += Code[++i];
              } else {
                GenerationData.steps.reps += Code[i];
              }
              if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[i];
          } else if (MATCH_PROP.test(Code[i])) {
            // Property character
            if (MATCH_LEND.test(Code[i - 1])) GenerationData.steps.reps += ".";
            if (Code[i + 1]) PendingProp += Code[i];else GenerationData.steps.reps += Code[i];
          } else if (Code[i] === "#") {
            GenerationData.steps.reps += "(l,i,a,b)=>";
          } else if (MATCH_NUM.test(Code[i])) {
            for (var j = i; i - j < MAX_LITERAL && /[\d.]/.test(Code[i]); i++) {
              GenerationData.steps.reps += Code[i];
            }GenerationData.steps.reps += " ";--i;
          } else if (Code[i].charCodeAt() > 0xA0 && Code[i].charCodeAt() <= 0xFF) {
            GenerationData.steps.reps += Data.rep[Code[i]];
            i -= Data.rep[Code[i]].length;
          } else {
            GenerationData.steps.reps += Code[i];
          }
        }
      }
    }
    // RESERVED: liabxyz_

    // Adjusts parenthesis
    {
      var Code_1 = GenerationData.steps.reps;

      var NestOrder = [];
      var EscapeChar = -1;
      for (var i = 0; i < Code_1.length; i++) {
        if (ESCAPES_START.includes(Code_1[i])) {
          // Found an escape character (string)
          EscapeChar = ESCAPES_START.indexOf(Code_1[i]);
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[i];
          i++;
          for (var j = i; i - j < MAX_LITERAL && Code_1[i] !== ESCAPES_END[EscapeChar]; i++) {
            if (Code_1[i] === ESCAPES_ESC[EscapeChar]) {
              if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += ESCAPES_ESC[EscapeChar];
              GenerationData.steps.parenfix += Code_1[++i];
            } else {
              GenerationData.steps.parenfix += Code_1[i];
            }
            if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
          }
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[i];
        } else if (CLOSE_START.includes(Code_1[i])) {
          // Open
          GenerationData.steps.parenfix += Code_1[i];
          NestOrder.push(Code_1[i]);
        } else if (CLOSE_END.includes(Code_1[i])) {
          // Close
          GenerationData.steps.parenfix += Code_1[i];
          NestOrder.pop();
        } else {
          GenerationData.steps.parenfix += Code_1[i];
        }
      }
      NestOrder.reverse().forEach(function (Key) {
        return GenerationData.steps.parenfix += CLOSE_END[CLOSE_START.indexOf(Key)];
      });
    }

    return GenerationData;
  };

  if (global.TeaScript) global.TeaScript.Compile = TeaScript;else global.TeaScript = TeaScript;
})(undefined /*, JSON.parse(read("props.json"))*/);
////