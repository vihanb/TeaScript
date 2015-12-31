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
    @T2)+r+t            // After

.. _f-operator:

ƒ Operator
----------

``ƒ`` expands to ``f=(l,i,a,b)=>``, this can be used to create recursive functions easily without having to manually add a decleration

.. code-block:: js

    f=(a,b)=>a<1?b:f(a--,b++); // Before
    ƒl<1?i:f(l--,i++);         // After

Σ Operator
----------

The ``Σ`` operator can be used to loop through arrays and strings, it expands to ``.l((l,i,a,b)=>``.

.. code-block:: js

    xΣlc // Maps char codes
    xΣi  // Generates range


  
? Operator
----------

This operator has 2 uses depending on where you use it.

.. rubric:: Interrupting Property expansion 

If you ever need to use a JavaScript property name and TeaScript thinks it's a TeaScript property, insert a ``?`` after the property

.. code-block:: js

    x.search(/\A/) // JavaScript
    x.search?/\A   // TeaScript

.. rubric:: Closing Parenthesis

.. code-block:: js

    xl(#lT(2r("foo"[1]))) // Before
    xl(#lT(2r("foo"[1?    // After