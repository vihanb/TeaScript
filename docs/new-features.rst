New Features
************

As said before, TeaScript is an *extension* of JavaScript meaning it adds features to JavaScript. Here you will learn about some of the features TeaScript 
adds to JavaScript

Modified RegExp
===============

RegExp literals have been expanded and are now more powerful than ever with custom character classes and hopefully even more features to come.

Custom Character Classes
------------------------

TeaScript adds custom character classes (e.g. ``\w``) to a RegExp literal. These are esentially shorthands for character classes, an example

.. code-block:: js

    /[A-Za-z]/  // Before
    /\L/        // After
    /[A-Za-z]/  // At compile-time

.. topic:: New Character Classes
    :name: charclasslist

    ======= ============
    Name    Value
    ======= ============
    ``\\A`` ``[A-Z]``
    ``\\a`` ``[a-z]``
    ``\\L`` ``[A-Za-z]``
    ``\\N`` ``[A-Za-z0-9]``
    ======= ============

Operators
=========

# Operator
----------

The ``#`` operator is one that is *very* useful. It's a shorthand for function declerations that you can use where ever. ``#`` expands to ``(l,i,a,b)=>``

.. code-block:: js

    (a,b,c,d)=>a+b+c+d // Before
    #l+i+a+b           // After

@ Operator
----------

The ``@`` operator is similar to the ``#`` operator, but if you ever have two nested lambdas, you can use this. ``@`` expands to ``(q,r,s,t)=>q.``

.. code-block:: js

    (a,b,c,d)=>aT2)+b+d // Before
    @T2)+b+d            // After
    
  
? Operator
----------

.. warning::
  This feature is not implemented and is just speculation of ideas for TeaScript v3.1

If you're ever in the middle of code and need to close a lot of brackets? Insering a `?` will close all parenthesis at that point:

.. code-block:: js

    xl(#lT(2r("foo"[1]))) // Before
    xl(#lT(2r("foo"[1?    // After