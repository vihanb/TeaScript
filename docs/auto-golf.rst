Auto-Golfing
************

``Auto-Golf`` is a feature which performs automatic golfing for you. It provides a few features.

.. hint::
    The ``Un-Auto-Golf`` will do the opposite and will attempt to make code more readable.

Unicode Shortcuts
=================

Unicode shortcuts are a way to get code as short as possible without doing any work! What are they? Unicode shortcuts are 1-byte long unicode characters which expand to longer TeaScript code at compile time. Confusing, here's an example:

.. code-block:: js

    £lc)    // Original Code
    xl(#lc) // Code at compile-time

What if I want to use a unicode character in my code. Unicode characters in literals (i.e. Strings, RegExps, Snippets) are not converted. If for some reason you do want a unicode property name, it can be used by using a ``\\`` before the character

.. code-block:: js

    \£lc     // Original Code
    £lc // Code at compile-time

So how do you use them? You simpily click the ``Auto-Golf`` button.

Ommiting characters
===================

Removing Brackets
-----------------

If you have a function, and then a literal, you can ommit the ``(`` before it. You can also ommit ending ``)`` and other brackets

.. code-block:: js

    MF(32) // Before
    MF32   // After
    
    MF(3,x[32]) // Before
    MF3,x[32    // After

Removing Literal Endings
------------------------

Endings of literal characters can be ommited, this includes Strings, RegExps, and  Snippets.

.. code-block:: js

    "Foo"  // Before
    "Foo   // After
    
    `Foo`  // Before
    `Foo   // After
    
    /Fo{2}/ // Before
    /Fo{2}  // After