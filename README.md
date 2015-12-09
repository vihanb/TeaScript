<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">
    <img alt="TeaScript" src="https://raw.githubusercontent.com/vihanb/TeaScript/master/TeaScriptWide.png" width="546">
  </a>
</p>

<p align="center">
  <b>IMPORTANT: TeaScript is NO LONGER being maintained</b><br>read below for why
</p>

# Try TeaScript
<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">Online Interpreter & Docs</a> or <a href="https://esolangs.org/wiki/TeaScript">Wiki Page</a>

</p>

# Current Status of TeaScript

TeaScript's development has slowed down, when TeaScript was first made, I was spending tons of time on it, making what TeaScript is today. The reason TeaScript's development has stopped is due to a variety of reasons

 - TeaScript was, the *first* JavaScript golfing languages. Originally I'd held back on TeaScript waiting *someone* to make a JavaScript golfing lang but none came. Days after TeaScript's debut, suddenly JavaScript golfing langs were flooding. Many of these offer significant benifits over TeaScript with little to none syntactic cues.
 - TeaScript is a **lot** more "potent", it provides the full unlimited power of JavaScript, all valid JavaScript is valid TeaScript. TeaScript is a truly "JavaScript" golfing lang compared to others which are just languages in JavaScript. But this comes at a cost, paranthesis and more delimiters are required and syntax is bulky, complex expressions come at a cost.

# Innovations
to counter this problem:

 - **Unicode shortcuts:** this helped *greatly* reduce TeaScript's syntax, for a while TeaScript exceled.<br>Unfortunately, almost all new golfing languages adapted this ( I'm not accusing anyone :p  ).
 - **String compression:** TeaScript brought powerful and consise string compression. This helped TeaScript and for a while TeaScript did great on many string compression challenges<br>Unforunetly, this didn't last to long as many languages quickly added compression. ( [*ahem*](https://github.com/molarmanful/ESMin/blob/gh-pages/interpreter.js#L56) :p )
 
That said, it's not like TeaScript was left in the dust, TeaScript did bring many new features and did well it's few months that it was developed.
 
---

Will I continue development? Maybe one day a TeaScript 3 will come out but until then, I'm stopping TeaScript development.

If you want to contribute, I'll still be accepting pull requests but don't expect any bug-fixes and new features coming at really at all.

In the meanwhile, I'll be starting work on more specialized languages such as string compression languages.

---

## Basic Programs

TeaScript is basically JavaScript (ES2015) with some new features. Output / Input are implicit.

### Hello, World!
A "Hello, World!" program would be:

    "Hello, World!"

### Greeting
This takes input for a name and greets the name

    "Greetings ${x}!"

> **Input Variables:**
>
> `x` contains the 1st input
>
> `y` contains the 2nd input
>
> `z` contains the 3rd input
>
> `_` contains all inputs

## New Syntax

TeaScript introduces some new syntax to help golf code. This can be rather strict where this can be used but in upcoming TeaScript 3, this hopefully will be solved. If you'd like to contribute to TeaScript 3, you've already found the right place!

### `#` operator

This is used for shortened function declerations.

    (# l + 1)
This will create a function which takes arguments `(l,i,a,b)`.

---

## Further learning

TeaScript has some documentation on it's [wiki page](https://esolangs.org/wiki/TeaScript). I try my best to keep this updated but it tends to remain slightly out of date. You may also visit the TeaScript [website](http://vihanserver.tk/p/TeaScript/) where you may see the complete set of the TeaScript docs.

Questions? Don't hesitate to contact me through [StackExchange](http://chat.stackexchange.com/users/116494/v) or through email, `vihan 1086 (at) gmail (dot) com` (without the spaces, etc.)

---

## Further Examples

First line is with shortened property names. Second line is with full property names

### FizzBuzz
A completely ungolfed example taking input:

    "Fizz"R(!(x%3))+"Buzz"R(!(x%5))
    "Fizz".repeat(!(x%3))+"Buzz".repeat(!(x%5))
Or an example by looping to 100:

    r(100)m(#"Fizz"R(!(l%3))+"Buzz"R(!(l%5)))
    Array.range(100).map(#"Fizz".repeat(!(l%3))+"Buzz".repeat(!(l%5)))

