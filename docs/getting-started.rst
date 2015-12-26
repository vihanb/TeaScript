Getting Started
***************

Running TeaScript is pretty simple, they're multiple ways you can do this

Installation
============

Web Interface
-------------

TeaScript has a pretty sweet web interface and is the best enviorment for running TeaScript. All extensions are packaged up and usage is pretty straight-forward.

 * `Web Interface <http://vihanserver.tk/p/TeaScript>`_
 * `Alternate URL <http://server.vihan.ml/p/TeaScript>`_

Auto-Install Script
-------------------

If you wish to run TeaScript from the command line, ensure you have **SpiderMonkey 38** or higher installed. They're multiple ways to get started

#. Install ``teascript`` from the `GitHub <https://github.com/vihanb/TeaScript/blob/master/src/sh/teascript>`_
#. Give ``teascript`` the correct permissions::

.. code-block:: shell

    $ chmod +x teascript

#. Run ``teascript``, and it should install the correct files. Enter the code, and then the input, ``,`` seperated.

.. code-block:: shell

    $ ./teascript
    TeaScript not installed. Installing TeaScript...
    # ...
    Code: # <TeaScript Code Here>
    Input: # <Input Here> e.g.: Input 1,Input 2,Input 3,...
    # <Output Here>

#. The next time you run TeaScript, it'll detect the `TeaScript/` folder and won't need to reinstall the dependencies.

Manual Installation
-------------------

You can also manually install/run TeaScript if you're having issues with the script

#. Install the following files
 - Everything within `/src/v2 <https://github.com/vihanb/TeaScript/tree/master/src/v2>`_
 - ``sh.js`` from `/src/sh/sh.js <https://github.com/vihanb/TeaScript/blob/master/src/sh/sh.js>`_
#. Edit ``teascript.js`` and perform the following replaces:

:``window``: ``this``
:``/*props.json*/``:``JSON.parse(read("props.json"))``

.. note::
  Different enviorments might use a different function than ``read``
  
  :nodejs:``test``