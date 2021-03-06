---
title: "You can extend CoffeeScript classes with ES6 classes"
layout: post
published: true
permalink: /extend-coffeescript-with-es6-classes/
categories:
- ecmascript
- JavaScript
- Node.js
---

**TL;DR**: If you want to extend from CoffeeScript written classes, you can use
the ES6 class syntax to do so.

Every once in a while you run into a library that was written with the best
intentions, but in CoffeeScript. Now you need that library badly, even want
to write your own extensions ... but alas, the lack of parentheses keeps you
from the caffeine. That just happened to me with [liquid-node](https://github.com/sirlantis/liquid-node).

Lovely tool, but to extend it to suit my needs, I would have to write in
CoffeeScript. Says the documentation. Turns out, you don't have to. Not if your
runtime environment is capable of ES6 classes.

## An example

Take this code listing for example:

```typescript
'use strict';

const Liquid = require('liquid-node'); // 1
const highlight = require('highlight.js')

module.exports = class Highlight extends Liquid.Block { // 2
  constructor(template, tag, params) {
    super(template, tag, params); // 3
    this.language = typeof params !== 'undefined' ?
      params.trim() : 'bash';
  }
  render(context) {
    return super.render(context) // 4
      .then(chunks => highlight.highlight(this.language, chunks.join('')))
      .then(parsed => `<div class="highlight">
        <pre>
          <code class="${this.language}">${parsed.value}</code>
        </pre>
      </div>`);
  }
}
```

What's going on?

1. This is the library written in CoffeeScript. It features lots of classes that
can be used to create or own functionality.
2. With ES6 syntax, we can extend from the class `Liquid.Block` like it would be
done with CoffeeScript
3. You can even call the constructor from the class you extend from
4. Or do any other `super` calls

## Why does that work

The CoffeeScript class syntax doesn't create classes like you know from
the classical object oriented languages like Java or C#. Instead, it provides
some syntactic sugar for JavaScript's prototype chain.

ES6 classes do they same, but baked in your runtime environment. In this case:
Node 5. Should you use Babel to transpile ES6 classes to ES5, you will see that
the outcome is somewhat similar to the output created by CoffeeScript.

If you want to learn more about prototypical inheritance, I strongly
suggest you check out Eric Elliot's fantastic articles on that topic:

- [Difference between class and prototypal inheritance](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
- [The Heart & Soul of Prototypal OO: Concatenative Inheritance](https://medium.com/javascript-scene/the-heart-soul-of-prototypal-oo-concatenative-inheritance-a3b64cb27819#.plcy9jq2g)
