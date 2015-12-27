Error Handling
**************

Approaching Literal Maximum
============================

This is the only error that can be thrown during compilation at the moment. This is caused when a literal (i.e. String, RegEx) is unbalanced.

.. code-block:: js

    "unclosed string
    /unclosed regex
    $unclosed snippet
    
Dependency not found: babel
===========================

``babeljs``, was not able to be loaded, check your network connection and ensure babel is connected. If you believe this shouldn't be occuring don't hesitate to `report it <https://github.com/vihanb/TeaScript/issues>`_ on Github.

Existing sub___: Slot used
=============================

During enviorment generation, a few errors can occur, this occurs when TeaScript is trying to assign a variable but it has already been assigned. You can override this by force setting ``TEASCRIPT_ENV`` to false, each time enviroment generation takes place

.. note::
    This is a technical error, you are either using an unsupported browser/enviorment or there is a bug in TeaScript. If you believe it's a bug, don't hesitate to `report it <https://github.com/vihanb/TeaScript/issues>`_ on Github

Invalid location, ___, error ___
=================================

If this ever occurs, TeaScript has encountered an issue with the ``props.json`` file, possible fixes are reinstalling the ``props.json``. If this continues, don't hesitate to `report it <https://github.com/vihanb/TeaScript/issues>`_ on Github.

Unexpected Type: ___ at ___
===========================

This is another error with the ``props.json``, check to make sure the json is valid. Try reinstalling the ``props.json``, and if that doesn't work, don't hesitate to `report it <https://github.com/vihanb/TeaScript/issues>`_ on Github.

Duplicate Getter: ___
======================

An attempt was made to assign a getter to an already assigned key. To diagnose this, try looking for duplicate getters in the ``props.json`` and change/remove them.

*Any* other error
=================

All other errors are either JS Runtime or syntax errors, which can be solved by entering `Debugging Mode`

Syntax Errors
--------------

A syntax error starts with ``SyntaxError:``, and is an error with the syntax itself, the error should display from where the error originated and by looking at the previous compilation steps, you may be able to identify where the error occured.

This error could of originated in any of the following compilation stages:

* String Balancing
* Unicode Shortcuts
* Property Expansion
* Paranthesis Balancing
* babel compilation

If you believe the error originated during babel compilation, report the error at `babel's Github <https://github.com/babel/babel>`_.

Runtime Errors
--------------

Any other error is a JS runtime error which is usually caused by referencing a variable that doesn't exist. Runtime errors are errors with the code itself rather than the syntax. Try to break down your code and try to identify where the error is originating. If you believe this error shouldn't be happening, don't hesitate to `report it <https://github.com/vihanb/TeaScript/issues>`_ on Github.