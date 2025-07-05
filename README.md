# Simple DOM
Utility functions for DOM manipulation

## About / Why?
I prefer to avoid massive stacks depending on complex frameworks. Most of the time, plain JS will suffice. In some projects, where I'm creating a lot of elements and appending them to others, it can be useful to have a shorthand for `document.createElement` and `document.querySelector`. I noticed I was implimenting the same concepts in multiple projects. As a general rule, I use function names starting with `_` to create, `__` to replace, and `$` to select, else I pick a sensible English name. Over time, I may add new functions and adapt existing ones. I will always try to ensure backwards compatibility (usually, I will just extend functions to take previously forbidden values (e.g. `string | undefined` to `string | undefined | null`)), but I can not guarantee it.

## Usage
I don't use npm or other packaging software so I can't provide any instructions on using them.

Add functions globally to a project:
```js
import 'https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js';
```
or
```html
<head>
    <script src="https://cdn.jsdelivr.net/gh/klingondragon/simple-dom/index.min.js"></script>
</head>
```
## Type Checking in an IDE
Unfortunatly, the only method I've found to use this in a js project is to download [`types.d.ts`](./types.d.ts) and either reference it directly or include it in your `jsconfig.json`:
```js
/// <reference path="./simple-dom.d.ts" />
```
or
```json
{
    ...
    "include": [
        "./**/*.js",
        "./**/*.d.ts",
    ]
}
```
