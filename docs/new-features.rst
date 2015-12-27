New Features
************

As said before, TeaScript is an *extension* of JavaScript meaning it adds features to JavaScript. Here you will learn about some of the features TeaScript adds to JavaScript

# Operator
==========

The ``#`` operator is one that is *very* useful. It's a shorthand for function declerations that you can use where ever.

.. code-block:: js

    (a,b,c,d)=>a+b+c+d // Before
    #l+i+a+b           // After

^ Operator
==============

.. warning::
  This feature is experimental and will only work on some enviorments
  
  This operator may also be replaced with the ``@`` character to avoid the requirment of needing to overload

XOR? Nope, that's the new `exponentiation` operator. What does it do? It functions as a repeat *and* as a `exponentiation` function.

.. code-block:: js

    < "foo"^3
    > "foofoofoo"
    
    < 3^2
    > 9
    
Want XOR back? That's just ``\^``.

....

.. warning::
  The following features are not actually implemented but are just ideas on new operators for TeaScript 3.1

@ Operator
==========

Same as `#` but defined a recursive function.

.. code-block:: js

   f=#l?f(l-1):l // Before
   @!l?l:l-1     // After l-1 is automagically executed

.. note::
  This may not be implemented because I'll need to keep track of used names and all.

? Operator
===========

If you're ever in the middle of code and need to close a lot of brackets? Insering a `?` will close all parenthesis at that point:

.. code-block:: js

    xl(#lT(2r("foo"[1]))) // Before
    xl(#lT(2r("foo"[1?    // After