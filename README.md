<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">
    <img alt="TeaScript" src="https://raw.githubusercontent.com/vihanb/TeaScript/master/TeaScriptWide.png" width="546">
  </a>
</p>

# Try TeaScript
<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">Online Interpreter & Docs</a> or <a href="https://esolangs.org/wiki/TeaScript">Wiki Page</a>

</p>

# TeaScript 3 is now out!
See the release notes for more information

# Using TeaScript
TeaScript has 3 main parts in order to successfully run:

 1. Enviorment Generation
 2. Code Compilation
 3. Transpilation
 
Enviroment Generation is where all of the built-ins are defined and mapped to their shorter versions.

Code Compilation is where the TeaScript code is compiled to JavaScript ES6 code. This is one of the most important stages.

Transpilation is done through `babel`, this compiles the ES6 code to ES5 code and is then evaluated.

## Installation

TeaScript can run on almost every JavaScript platform but it is tested on the browser, and SpiderMonkey. If you have the latest version of SpiderMonkey installed, installation is even easier. If not, install `babeljs` and import it at the top of `teascript.js`

### TeaScript 2 installation

The first step is to install the required files for TeaScript 2:
 - [`/v/2/teascript.js`](https://github.com/vihanb/TeaScript/blob/master/v/2/teascript.js)
 - [`props.json`](https://github.com/vihanb/TeaScript/blob/master/props.json)
 - [`macros.js`](https://github.com/vihanb/TeaScript/blob/master/macros.js)

Edit `teascript.js` and scroll to the last line. Edit where it says `/*props.json*/` with `read("props.json")`.

> **Note:** This will differ on what enviorment you use:
>
> SpiderMonkey: `read`
> Rhino: `readFile`
> Node.js: `fs.readFile`

Now, run the two files (example for SpiderMonkey):

```sh
$ js macros.js teascript.js -e "TeaScript(`Code Goes Here`)"
```
