const Data = {"macros":{"Globals":{"$":"Math","S":"String","A":"Array","B":"btoa","R":"RegExp","D":"Date","X":"Request","L":"shoco"},"Prototype":{"String":{"a":"charCodeAt","B":"batchReplace","C":"cycle","d":"reduce","e":"every","E":"insert","f":"filter","F":"iff","G":"get","g":"g_replace","h":"head","i":"indexOf","I":"includes","K":"chunk","l":"loop","m":"match","M":"some","n":"length","N":"alphanum","O":"onlyChars","p":"sort","P":"mergecaps","r":"reverse","R":"repeat","s":"split","S":"slice","T":"valueOf","U":"unique","W":"w_replace","Y":"isDigit","z":"isLower","Z":"isUpper"},"Array":{"C":"cycle","d":"dupe","e":"every","f":"fill","F":"filter","g":"iff","G":"get","i":"indexOf","I":"includes","j":"n_join","k":"keys","K":"chunk","L":"loc","m":"map","N":"min","p":"push","P":"pop","r":"reverse","R":"reduce","S":"slice","s":"newsort","t":"transpose","u":"unique","X":"max"},"RegExp":{"t":"test"},"Number":{"T":"toString"},"Boolean":{"T":"toString"}},"Subglobals":{"Math":{"C":"sign","c":"ceil","p":"pow","P":"prime","h":"hypot","s":"sqrt","a":"abs","F":"Fib","f":"factorial"},"String":{"c":"fromCharCode","w":"raw"},"Array":{"r":"range","f":"from"}},"Other":{"C":"String.fromCharCode","F":"Math.Fib","a":"Math.abs","r":"Array.range","M":"Math.r","N":"Math.rand","P":"parseInt","U":"Math.round"}},"getters":{"String":{"prototype":{"c":"charCodeAt","v":"reverse","L":"toLowerCase","u":"toUpperCase","z":"isLower","Z":"isUpper"}},"Array":{"prototype":{"x":"sum","d":"dupe"}},"Math":{"r":"random"}},"rep":{"¯":"X()","°":"N()","¥":"$P(","®":"P(","²":"C(","¿":"s``.m(#","·":"s``","£":"xl(#","µ":"j``","¢":"``","§":"`\n`","ß":"m(#","±":")))","¡":"()","©":"))","»":"(#","¶":"||","Þ":"&&","ø":"` `","¦":"==","×":"(x)","Ø":"--","Æ":"++","÷":"T(2)","æ":"Ld`","«":"<=","¤":",2","È":"F(","¬":"+1","Ð":"xs`","Ñ":"[0]","Ò":"[1]"},"def":{"Globals":"window[$1]","Prototype":"window[$1].prototype","Subglobals":"window[$1]","Other":"eval($1)"}}; // Replace with props.json

const TeaScript = (Code, Input, Options) => {
  ///
  //
  // TeaScript 3
  // Interpreter Process
  //
  // - Generate Enviorment
  // - Add `.` and `(` and `)`
  // - Expand unicode shortcuts
  // - Decompress strings
  // - Suffixes
  // - eval
  ///

  const GenerationData = {
    reps: "",
    transpiled: "",
    Error: ""
  };

  const Warn  = desc => GenerationData.Error += `Error: ${desc}.\n`;
  const Error = desc => GenerationData.Error += `Critical Error: ${desc}.\n`;

  // Enviorment Generation comes from TeaScript 2

  // CONSTANTS
  const MAX_LITERAL = 65536; // 2^16

  const ESCAPES = [
    [`"`,`"`,`\\`],
    [`'`,`'`,`\\`],
    ["`","`",`\\`],
    [`$`,`$`,`\\`, 1]
  ];
  const ESCAPES_START = ESCAPES.map(Escape => Escape[0]);
  const ESCAPES_END   = ESCAPES.map(Escape => Escape[1]);
  const ESCAPES_ESC   = ESCAPES.map(Escape => Escape[2]);
  const ESCAPES_KEEP  = ESCAPES.map(Escape => !Escape[3]);

  const CLOSE = [
    [`"`, `"`],
    [`'`, `'`],
    [`$`, `$`],
    [`[`, `]`],
    [`(`, `)`],
    ["`", "`"],
  ];

  const MATCH_PROP = /[A-Za-z$_][\w$]*/;
  const MATCH_NUM  = /\d/;
  const MATCH_LTRL = /["'0-9]/; // Literal

  {
    let EscapeChar = -1;
    let PendingProp = "";
    for(let i = 0; i < Code.length; i++) {
      if (PendingProp.length > 0) { // Within a property name
        if (MATCH_PROP.test(Code[i])) {
          PendingProp += Code[i];
        } else {
          let _prop = PendingProp;
          PendingProp = "";
          if (MATCH_LTRL.test(Code[i])) {
            GenerationData.reps += "(";
            i--;
          }
        }
      } else {
        if (ESCAPES_START.includes(Code[i])) { // Found an escape character (string)
          EscapeChar = ESCAPES_START.indexOf(Code[i]);
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.reps += Code[i];
          i++;
          for (let j = i; (i - j) < MAX_LITERAL && Code[i] !== ESCAPES_END[EscapeChar]; i++) {
            if (Code[i] === ESCAPES_ESC[EscapeChar]) {
              GenerationData.reps += ESCAPES_ESC[EscapeChar];
              GenerationData.reps += Code[++i];
            } else {
              GenerationData.reps += Code[i];
            }
            if (i - j + 1 === MAX_LITERAL) Warn("Approaching Literal Maximum");
          }
          if (ESCAPES_KEEP[EscapeChar]) GenerationData.reps += Code[i];
        } else if (MATCH_PROP.test(Code[i])) { // Property character
          PendingProp += Code[i];
        } else if (Code[i].charCodeAt() > 0xA0 && Code[i].charCodeAt() <= 0xFF) {
          GenerationData.reps += Data.rep[Code[i]];
        } else {
          GenerationData.reps += Code[i]
        }
      }
    }
  }

  return GenerationData;
};