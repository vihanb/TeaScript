////
//
// TeaScript 3 - Compiler
// (c) Vihan B 2015
//
////

(function(global) {
  const TeaScript = (Code, Data = { rep: {} }) => {
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

    const GenerationData = {
      steps: {
        strfix: "",
        reps: "",
        parenfix: ""
      },
      Error: ""
    };

    const Warn  = desc => GenerationData.Error += `Error: ${desc}.\n`;
    const Error = desc => GenerationData.Error += `Critical Error: ${desc}.\n`;

    // CONSTANTS
    const MAX_LITERAL = 65536; // 2^16

    const ESCAPES = [
      [`"`,`"`,`\\`],
      [`'`,`'`,`\\`],
      [`/`,`/`,`\\`],
      ["`","`",`\\`],
      [`$`,`$`,`\\`, 1]
    ];
    const ESCAPES_START = ESCAPES.map(Escape => Escape[0]);
    const ESCAPES_END   = ESCAPES.map(Escape => Escape[1]);
    const ESCAPES_ESC   = ESCAPES.map(Escape => Escape[2]);
    const ESCAPES_KEEP  = ESCAPES.map(Escape => !Escape[3]);

    const CLOSE = [
      [`[`, `]`],
      [`(`, `)`],
    ];

    const CLOSE_START = CLOSE.map(Item => Item[0]);
    const CLOSE_END   = CLOSE.map(Item => Item[1]);

    const MATCH_PROP = /[A-Za-z$_][\w$]*/;
    const MATCH_NUM  = /\d/;
    const MATCH_LTRL = /["'`0-9]/; // Literal
    const MATCH_LEND = /["'`0-9)/\]]/; // Match any end
    const MATCH_STRT = /["'`0-9(#/]/;

    const RESERVED = [`for`, `while`, `let`, `var`, `if`, `const`, `break`, `continue`, `class`, `do`];

    const REGEX_FLAG  = /[gmi]+/;
    const REGEX_CLASS = new Map([
      ["A", "[A-Z]"],
      ["a", "[a-z]"],
      ["L", "[A-Za-z]"],
      ["N", "[A-Za-z0-9]"]
    ]);

    /*=== START CODE ===*/

    // Unicode Shortcuts & Prop Expansion
    {
      let EscapeChar = -1;
      let PendingProp = "";
      for (let i = 0; i < Code.length; i++) {
        if (PendingProp.length > 0) { // Within a property name
          if (MATCH_PROP.test(Code[i])) {
            // Issue 4 - https://github.com/vihanb/TeaScript/issues/4
            // VERY TEMPORARY
            // I'll add a way of detecting
            // between a JS function and a TeaScript one
            PendingProp += Code[i];
            if (i === Code.length - 1) GenerationData.steps.reps += PendingProp;
          } else {
            let _prop = PendingProp;
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
          if (Code[i] === "/") { // Start custom RegExps
            GenerationData.steps.reps += "/";
            i++;
            for (let j = i; (i - j) < MAX_LITERAL && Code[i] !== "/"; i++) {
              if (Code[i] === "\\") {
                if (REGEX_CLASS.has(Code[i + 1]))
                  GenerationData.steps.reps += REGEX_CLASS.get(Code[i++ + 1]);
                else
                  GenerationData.steps.reps += "\\" + Code[++i];
              } else {
                GenerationData.steps.reps += Code[i];
              }
              if (!Code[i + 1]) Code += "/";
              if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            GenerationData.steps.reps += "/";
            
            // Hacky way of allowing flags
            if (!Code.slice(++i).search(REGEX_FLAG)) { // There are flags
              GenerationData.steps.reps += Code.slice(i).match(REGEX_FLAG)[0];
              i += Code.slice(i).match(REGEX_FLAG)[0].length;
            }
            --i;
          } else if (ESCAPES_START.includes(Code[i])) { // Found an escape character (string)
            EscapeChar = ESCAPES_START.indexOf(Code[i]);
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[i];
            i++;
            for (let j = i; (i - j) < MAX_LITERAL && Code[i] !== ESCAPES_END[EscapeChar]; i++) {
              if (Code[i] === ESCAPES_ESC[EscapeChar]) {
                if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += ESCAPES_ESC[EscapeChar];
                GenerationData.steps.reps += Code[++i];
              } else {
                GenerationData.steps.reps += Code[i];
              }
              if (!Code[i + 1]) Code += ESCAPES_END[EscapeChar];
              if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
            }
            if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.reps += Code[i];
          } else if (MATCH_PROP.test(Code[i])) { // Property character
            if (MATCH_LEND.test(Code[i - 1])) GenerationData.steps.reps += ".";
            if (Code[i + 1]) PendingProp += Code[i];
            else GenerationData.steps.reps += Code[i];
          } else if (Code[i] === "#") {
            GenerationData.steps.reps += `(l,i,a,b)=>`;
          } else if (MATCH_NUM.test(Code[i])) {
            for (let j = i; (i - j) < MAX_LITERAL && /[\d.]/.test(Code[i]); i++) GenerationData.steps.reps += Code[i];
            GenerationData.steps.reps += " "; --i;
          } else if (Code[i].charCodeAt() > 0xA0 && Code[i].charCodeAt() <= 0xFF) {
            GenerationData.steps.reps += Data.rep[Code[i]];
            i -= Data.rep[Code[i]].length;
          } else {
            GenerationData.steps.reps += Code[i]
          }
        }
      }
    }
    // RESERVED: liabxyz_

    // Adjusts parenthesis
    {
      const Code_1  = GenerationData.steps.reps;

      let NestOrder = [];
      let EscapeChar = -1;
      for (let i = 0; i < Code_1.length; i++) {
        if (ESCAPES_START.includes(Code_1[i])) { // Found an escape character (string)
          EscapeChar = ESCAPES_START.indexOf(Code_1[i]);
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[i];
          i++;
          for (let j = i; (i - j) < MAX_LITERAL && Code_1[i] !== ESCAPES_END[EscapeChar]; i++) {
            if (Code_1[i] === ESCAPES_ESC[EscapeChar]) {
              if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += ESCAPES_ESC[EscapeChar];
              GenerationData.steps.parenfix += Code_1[++i];
            } else {
              GenerationData.steps.parenfix += Code_1[i];
            }
            if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
          }
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.steps.parenfix += Code_1[i];
        } else if (CLOSE_START.includes(Code_1[i])) { // Open
          GenerationData.steps.parenfix += Code_1[i];
          NestOrder.push(Code_1[i]);
        } else if (CLOSE_END.includes(Code_1[i])) { // Close
          GenerationData.steps.parenfix += Code_1[i];
          NestOrder.pop();
        } else {
          GenerationData.steps.parenfix += Code_1[i];
        }
      }
      NestOrder.reverse().forEach(Key => GenerationData.steps.parenfix += CLOSE_END[CLOSE_START.indexOf(Key)]);
    }

    return GenerationData;
  };

  if (global.TeaScript) global.TeaScript.Compile = TeaScript;
  else global.TeaScript = TeaScript;
}(this/*, JSON.parse(read("props.json"))*/));