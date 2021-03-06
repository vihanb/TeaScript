////
//
// TeaScript 3 - Compiler
// (c) Vihan 2015
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
    // - Decompress strings
    ///

    const GenerationData = {
      steps: {
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
    ];
    const ESCAPES_START = ESCAPES.map(Escape => Escape[0]);
    const ESCAPES_END   = ESCAPES.map(Escape => Escape[1]);
    const ESCAPES_ESC   = ESCAPES.map(Escape => Escape[2]);
    const ESCAPES_KEEP  = ESCAPES.map(Escape => !Escape[3]);

    const COMMENT = [
      [`//`, `\n`],
      [`/*`, `*/`]
    ];

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
    const MATCH_STRT = /["'`0-9(#@/ßα+=*/]/;
    const MATCH_END  = /[)\]]/;
    const MATCH_DIV  = /[\d\w\/\\`"'\)@$.]/;

    const RESERVED = [`for`, `while`, `let`, `var`, `if`, `const`, `break`, `continue`, `class`, `do`];

    const REGEX_FLAG  = /[gmi]+/;
    const REGEX_CLASS = new Map([
      ["A", "[A-Z]"],
      ["a", "[a-z]"],
      ["L", "[A-Za-z]"],
      ["N", "[A-Za-z0-9]"]
    ]);

    // Keys
    const KEY_POLYGLOT = `[p|`;
    const KEY_QUINE    = `[q|`;

    /*=== START CODE ===*/
    let DEFINITIONS = new Map();

    // Unicode Shortcuts & Prop Expansion
    {
      let EscapeChar = -1;
      let PendingProp = "";
      let Definition = 0; // 1, Key, 2, Value
      let DefinitionItem = ["", ""];
      for (let i = 0; i < Code.length; i++) {
        if (Definition) {
          if (Code[i] === "\\") {
            // End escape sequence
            DEFINITIONS.set(...DefinitionItem);
            GenerationData.steps.reps += DefinitionItem[1];
            Definition = 0;
            DefinitionItem = ["", ""];
          } else {
            if (Code[i] === "=") {
              Definition = 2;
            } else if (Definition === 1) {
              DefinitionItem[0] += Code[i];
            } else if (Definition === 2) {
              DefinitionItem[1] += Code[i];
            }
          }
        }
        /* Disable Definitions?
        else if (Code[i] === "\\") {

          Definition = 1;

        } // */
        else if ([...DEFINITIONS.keys()].some(DEF => Code.slice(i).indexOf(DEF) === 0)) {
          let DEFV = [...DEFINITIONS.keys()].filter(DEF => Code.slice(i).indexOf(DEF) === 0).sort((a,b) => b.length - a.length)[0];
          GenerationData.steps.reps += DEFINITIONS.get(DEFV);
          i += DEFV.length - 1;
        } else if (PendingProp.length > 0) { // Within a property name
          if (MATCH_PROP.test(Code[i])) {
            PendingProp += Code[i];
            if (i === Code.length - 1) GenerationData.steps.reps += PendingProp.replace(/(?!^|$)/g, ".");
          } else {
            let _prop = PendingProp;
            PendingProp = "";
            if (Code[i] === "\\") {
              GenerationData.steps.reps += _prop + "(";
            } else {
              if ((MATCH_STRT.test(Code[i]) || MATCH_END.test(Code[i])) && !RESERVED.includes(_prop)) {
                GenerationData.steps.reps += _prop.replace(/(?!^|$)/g, ".");
                if (Code[i] !== "(" && Code[i] !== ")" && Code[i] !== "`") GenerationData.steps.reps += "(";
              } else {
                GenerationData.steps.reps += _prop;
              }
              i--;
            }
          }
        } else {
          if (COMMENT.some(Start => Code.slice(i, i + Start[0].length) === Start[0])) { // Comment
            let Comment = COMMENT.find(Start => Code.slice(i, i + Start[0].length) === Start[0]);
            i += Comment[0].length;
            for (let j = i; (i - j) < MAX_LITERAL && Code[i] && Code.slice(i, i + Comment[1].length) !== Comment[1]; i++);
          } else if (Code.slice(i).indexOf(`"`+KEY_POLYGLOT) === 0) { // Start Polygot
            let CollectedCode = "";
            i++;
            for (let j = i; (i - j) < MAX_LITERAL && Code[i] !== '"'; i++) {
              CollectedCode += Code[i];
              if (!Code[i + 1]) break;
            }
            GenerationData.steps.reps = CollectedCode.slice(KEY_POLYGLOT.length);
            i = Code.length;
          } else if (Code.slice(i).indexOf(KEY_QUINE) === 0) {
            let CollectedCode = "";
            i++;
            for (let j = i; (i - j) < MAX_LITERAL && Code[i] !== ']'; i++) {
              CollectedCode += Code[i];
              if (!Code[i + 1]) break;
            }
            GenerationData.steps.reps = `v="${Code.replace(/\\/,"\\\\").replace(/"/, `\\"`)}";`+
              TeaScript(`\`${Code.replace(/\\/g,"\\\\").replace(/`/g,"\\`")}\`` + CollectedCode.slice(KEY_QUINE.length)).steps.parenfix;
            i = Code.length;
          } else if (Code[i] === "/" && !MATCH_DIV.test([...Code.slice(0,i)].reverse().join("").trim()||"")) { // Start custom RegExps
            GenerationData.steps.reps += "/";
            i++;
            console.log("REGEX STARTED")
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
          } else if ( Code[i] === "/" ? !MATCH_DIV.test([...Code.slice(0,i)].reverse().join("").trim()||"") :
                     ESCAPES_START.includes(Code[i])) { // Found an escape character (string)
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
          } else if (Code[i] === "#") { // # Operator
            GenerationData.steps.reps += `(l,i,a,b)=>`;
          } else if (Code[i] === "@") { // @ Operator
            GenerationData.steps.reps += `(q,r,s,t)=>q.`;
          } else if (MATCH_NUM.test(Code[i])) { // Number
            for (let j = i; (i - j) < MAX_LITERAL && /[\d.]/.test(Code[i]); i++) GenerationData.steps.reps += Code[i];
            GenerationData.steps.reps += " "; --i;
          } else if (Data.rep.hasOwnProperty(Code[i])) { // Unicode char
            GenerationData.steps.reps += Data.rep[Code[i]];
          } else { // Other
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
        if (Code_1[i] === "/" ? !MATCH_DIV.test([...Code_1.slice(0,i)].reverse().join("").trim()||"") :
            ESCAPES_START.includes(Code_1[i])) { // Found an escape character (string)
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
}(window/*, JSON.parse(read("props.json"))*/));
