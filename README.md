# Santi's Small Stack

[![Build Status][workflow badge]][repo actions]
[![npm homepage][npm badge]][npm home]
[![GitHub stars][stars badge]][repo url]
[![License][license badge]][repo url]
[![Bundlephobia stats][bundlephobia badge]][bundlephobia url]

[workflow badge]: https://github.com/santi100a/stack-lib/actions/workflows/main.yml/badge.svg
[npm badge]: https://img.shields.io/npm/v/@santi100/stack-lib
[stars badge]: https://img.shields.io/github/stars/santi100a/stack-lib.svg
[license badge]: https://img.shields.io/github/license/santi100a/stack-lib.svg
[bundlephobia badge]: https://img.shields.io/bundlephobia/min/@santi100/stack-lib

[npm home]: https://npmjs.org/package/@santi100/stack-lib
[repo actions]: https://github.com/santi100a/stack-lib/actions
[repo url]: https://github.com/santi100a/stack-lib
[bundlephobia url]: https://bundlephobia.com/package/@santi100/stack-lib@latest

- 🚀 Lightweight and fast[^](#disclaimers)
- 👴 ES3-compliant[*](#disclaimers)
- 💻 Portable between the browser and Node.js
- 📘 Comes with built-in TypeScript definitions

## What's this?

This is an implementation of the stack data structure in TypeScript.
It aims to be complete, yet versatile, portable, lightweight and easy to use.

<!-- Mentions, inspirations -->

- Via NPM: `npm install @santi100/stack-lib`
- Via Yarn: `yarn add @santi100/stack-lib`
- Via PNPM: `pnpm install @santi100/stack-lib`

## API

- `class Stack<T = unknown>;`

  - `new (...initialItems: T[]);`
     | Name            |Type | Description                                    | Optional? | Default |
     |-----------------|-----|------------------------------------------------|-----------|---------|
     |`...initialItems`|`T[]`|Any optional items to initialize the stack with.| *rest param*  | `[]`|
  - `push(...items: T[]): this;`
    Pushes new items into the stack.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`...items`       |`T[]`|Whatever items you want to push.                | *rest param*  | `[]`|

    Returns the `this` item for chaining.
  - `pop(): T;`
    Pops the last item out of the stack.
    Returns the popped item.
  - `pop(amount: number): T[];`
    Pops `amount` items out of the stack.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`...items`       |`T[]`|Whatever items you want to push.                | *rest param*  | `[]`|
  - `clear(): this;`
    Clears the stack's items, leaving it empty.
    Returns the `this` object for chaining.
  - `peek(amount: number): T[];`
    Peeks `amount` items (retrieves items without popping them out).
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`amount`       |`number`|How many items you want to peek.                | *rest param*  | `[]`|
  - `peek(): T;`
     Peeks (retrieves without popping out) the last item.
     Returns the last item.
  - `getLength(): number;`
    Retrieves the stack's length.
  - `close(): this;`
    Closes the stack, preventing further modifications to its structure.
    Returns the `this` object for chaining.
  - `forEach<R = unknown>(cb: StackCallback<T, R>): this;`
    Executes `cb` for every item in the stack.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    | `R`             |*type param*| `StackCallback`'s return type.          | Yes       | `unknown`|
    |`cb`       |`StackCallback<T, R>`|The callback function to be executed for every item in the stack. | No  | *N/A*|
  - `filter(cb: StackCallback<T, boolean>): Stack<T>;`
    Executes `cb` for every item in the stack, and creates a new one which contains
    only the items that make `cb` return `true`.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`cb`       |`StackCallback<T, boolean>`|The callback function to be executed for every item in the stack. | No  | *N/A*|
    Returns a new stack containing only the items that make `cb` return `true`.
  - `map<R = unknown>(cb: StackCallback<T, R>): Stack<T>;`
    Maps every item of this stack to another one in a new stack, via `cb`.

    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`cb`       |`StackCallback<T, R>`|The callback function to be executed for every item in the original stack. | No  | *N/A*|

    Returns a new stack containing the results of calling `cb` for every item in the original one.
  - `isEmpty(): boolean;`
    Returns `true` if there's no items in the stack, `false` otherwise.
  - `includes(item: T): boolean;`
    Returns `true` if `item` is in the stack, `false` otherwise.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`item`           | `T` |The item to look for.                           | No        | *N/A*   |
  - `deepIncludes(item: T): boolean;`
    Returns `true` if `item` is in the stack (by deep comparison), `false` otherwise.
    Deep equality is powered by `@santi100/equal-lib`, as per usual :)
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`item`           | `T` |The item to look for.                           | No        | *N/A*   |
  - `deepIndexOf(item: T): number;`
    Returns `item`'s index in the stack (by deep comparison), or -1 if it's not there.
    Deep equality is powered by `@santi100/equal-lib`, as per usual :)
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`item`           | `T` |The item to look for.                           | No        | *N/A*   |
  - `isClosed(): boolean;`
    Returns this stack's closure state (whether or not it's closed).
  - `indexOf(item: T): number;`
    Returns `item`'s index in the stack, or -1 if it's not there.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`item`           | `T` |The item to look for.                           | No        | *N/A*   |
  - `lastIndexOf(item: T): number;`
    Returns the index of the last occurence of `items` in the stack, or -1 if it's not there.
    | Name            |Type | Description                                    | Optional? | Default |
    |-----------------|-----|------------------------------------------------|-----------|---------|
    |`item`           | `T` |The item to look for.                           | No        | *N/A*   |
  - `reverse(): this;`
    Reverses the stack in-place. If you want to create a reversed copy, add `.copy()`
    before this method.
    Returns the `this` object for chaining.
  - `toString(): string;`
    Returns a JSON string representation of this stack.
  - `toArray(): T[];`
    Returns an array containing all items currently in the stack.
  - `copy(): Stack<T>;`
    Makes a new stack with all items contained in this one.
<!-- ## Usage -->
<!-- Usage examples (code snippets) -->

```typescript
import Stack from './stack.js';

// create a new stack and initialize it with some items
const myStack = new Stack(1, 2, 3);

// push some new items onto the stack
myStack.push(4, 5);

// peek at the last item in the stack without removing it
console.log(myStack.peek()); // outputs: 5

// pop the last item off the stack and store it in a variable
const poppedItem = myStack.pop();

// log the popped item and the updated stack length
console.log(poppedItem, myStack.getLength()); // outputs: 5, 4

// clear the stack
myStack.clear();

// check if the stack is empty
console.log(myStack.isEmpty()); // outputs: true

```

## Contribute

Wanna contribute? [File an issue](issues) or [pull request](pulls)!

## Disclaimers

**Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing. See "Contribute" for instructions on how to do so.*

*^The source code is just a few kilobytes in size.*
