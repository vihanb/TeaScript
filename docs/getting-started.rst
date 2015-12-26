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

  $ chmod +x teascript

#. Run ``teascript``, and it should install the correct files. Enter the code, and then the input, ``,`` seperated.::

  $ ./teascript
  TeaScript not installed. Installing TeaScript...
  # ...
  Code: "my_teascript_code".l(#lc)+x+"more_code"
  Input: Input 1,Input 2,Input 3,...
  $ ./teascript
  Code: ...