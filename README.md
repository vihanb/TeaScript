# TeaScript

<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">
    <img alt="TeaScript" src="https://raw.githubusercontent.com/vihanb/TeaScript/master/TeaScriptWide.png" width="546">
  </a>
</p>

<p align="center">
  TeaScript, JavaScript for gofing with ES2015.
</p>

---

<p align="center">

<a href="http://vihanserver.tk/p/TeaScript/">Online Interpreter & Docs</a> or <a href="https://esolangs.org/wiki/TeaScript">Wiki Page</a>

</p>

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

