////
//
// Operator overloading engine for TeaScript
//
////

TeaScript.OverloadOperator = function(Code, Escapes, operator, callback) {
  let Overloaded = "";
  for (let i = 0; i < Code.length; i++) {
    if (Escapes.map(S => S[0]).includes(Code[i])) {
      
    } else {
      Overloaded += Code[i];
    }
  }
  return Overload;
};
