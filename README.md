<p align="center">
  <a href="http://vihanserver.tk/p/TeaScript/">
    <img alt="TeaScript" src="https://raw.githubusercontent.com/vihanb/TeaScript/master/logo/TeaScriptWide.png" height="330">
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

The easiest way is to use the script I put together, install [`teascript`](https://github.com/vihanb/TeaScript/blob/master/src/sh/teascript)
```bash
$ chmod +x teascript.sh
$ ./teascript
```

The required files should be automagically installed along with additional files for the shell to function such as `sh.js`.

String compression isn't supported. This expects you have `wget` and SpiderMonkey 38 installed. Once everything is installed, it should prompt you:

```
Code: <Enter Code Here>
Input: <Enter comma seperated inputs here>
```

If you encounter an issue, you've already found the best place to report it.

---

Alternatively you can install it manually.

The first step is to install the required files for TeaScript 2. You can download [this folder](https://github.com/vihanb/TeaScript/tree/master/src/v2), or install each file:
 - [`/src/v2/teascript.js`](https://github.com/vihanb/TeaScript/blob/master/src/v2/teascript.js)
 - [`/src/v2/props.json`](https://github.com/vihanb/TeaScript/blob/master/src/v2/props.json)
 - [`/src/v2/macros.js`](https://github.com/vihanb/TeaScript/blob/master/src/v2/macros.js)
 - [`/src/sh/sh.js`](https://github.com/vihanb/TeaScript/blob/master/src/sh/sh.js)

Edit `teascript.js` and scroll to the last line. Edit where it says `/*props.json*/` with `JSON.parse(read("props.json"))` and `window` with `this`.

> **Note:** This will differ on what enviorment you use:
>
> SpiderMonkey: `read`
> Rhino: `readFile`
> Node.js: `fs.readFile`

Now you can use [`teascript_run`](https://github.com/vihanb/TeaScript/blob/master/src/sh/teascript_run) or run it manually:

Now, run the two files (example for SpiderMonkey):

```sh
$ js -f sh.js macros.js teascript.js -e "print(TeaScript('Code Goes Here',['input1'],{}).out)"
```
