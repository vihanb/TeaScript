Getting Started
***************

Getting started with TeaScript is *very* easy especially if you have prior JavaScript knowledge.

This was the main goal of TeaScript was a JavaScript golfing language that *was* JavaScript but with shorter property names. This slowly evolved but TeaScript is backwards compatible so every JavaScript program is a valid TeaScript program

Literals
========

Literals are very simple in TeaScript as they are the same as JavaScript literals

Strings
-------

They are three types of strings

.. code-block:: js

    "Double Quoted String Literal"
    'Single Quoted String Literal'
    `String templates`

String templates have a few extra features such as:

.. code-block:: js

    `String templates support inline
    newlines and code such as ${2+1}`

Numbers
-------

Numbers are also, just *numbers*:

.. code-block:: js

    1234 // Decimal
    12.3 // Decimal
    12e3 // Scientific Notation
    0x1F // Hexadecimal
    0b10 // Binary
    0o18 // Octal

RegExp
-------

TeaScript has support for RegExp literals and they're just the same as JavaScript

.. code-block:: js

    /[A-Za-z]/gi

By TeaScript 3.1, I hope to have `XRegExp`, implemented which should allow your RegExp literals to look like:

.. code-block:: js

    /\u{L}+/u

Functions
---------

Functions are the same as JavaScript too.

.. code-block:: js

    (a,b,c)=>a+b+c // Arguments[a,b,c] adds them together
    a=>a           // Single argument a, returns a

This is quite lengthy so I've added the ``#`` operator which automatically expands to ``(l,i,a,b)=>`` at compile time

.. code-block:: none

    #l+i+a  // Arguments[l,i,a,b] adds first 3

Input
=====

Input Options
-------------

The user can decide how (s)he wants the input. TeaScript supports all of the following input types:

 - String (default)
 - Number
 - Array

Getting the Input
-----------------

The input is stored in various variables:

======== =============
Input #  Variable Name
======== =============
1         ``x``
2         ``y``
3         ``z``
======== =============

Need More inputs? An array of all the inputs is stored in the ``_`` variable.

....

If the input is an array, the 1st input will be split upon ``,`` and each item will become a seperate input. For the code:

.. code-block:: none

    Input 1,Input 2,Input 3

The values are:

=========== =============
Input Value Variable Name
=========== =============
``Input 1``     ``x``
``Input 2``     ``y``
``Input 3``     ``z``
=========== =============