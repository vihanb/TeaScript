Unicode Shortcuts
******************

Unicode shortcuts are a way to get code as short as possible without doing any work! What are they? Unicode shortcuts are 1-byte long unicode characters which expand to longer TeaScript code at compile time. Confusing, here's an example:

.. code-block:: js

    £lc)    // Original Code
    xl(#lc) // Code at compile-time

What if I want to use a unicode character in my code. Unicode characters in literals (i.e. Strings, RegExps, Snippets) are not converted. If for some reason you do want a unicode property name, it can be used by using a ``\\`` before the character

.. code-block:: js

    \£lc     // Original Code
    £lc // Code at compile-time