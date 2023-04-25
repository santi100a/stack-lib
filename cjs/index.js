"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Stack = void 0;
var equal_lib_1 = require("@santi100/equal-lib");
/**
 * Main class for this data structure.
 */
var Stack = /** @class */ (function () {
    /**
     * Create a new stack.
     *
     * @param initialItems Any optional items to initialize the stack with.
     */
    function Stack() {
        var initialItems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            initialItems[_i] = arguments[_i];
        }
        var _a, _b;
        this.__items = initialItems;
        this.__isClosed = false;
        var OPTS = {
            enumerable: false,
            configurable: false
        };
        (_a = Object === null || Object === void 0 ? void 0 : Object.defineProperty) === null || _a === void 0 ? void 0 : _a.call(Object, this, '__items', OPTS);
        (_b = Object === null || Object === void 0 ? void 0 : Object.defineProperty) === null || _b === void 0 ? void 0 : _b.call(Object, this, '__isClosed', OPTS);
    }
    /**
     * Pushes new items into the stack.
     *
     * @param items Whatever items you want to push.
     * @returns `this` object for chaining.
     */
    Stack.prototype.push = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (this.__isClosed)
            throw new Error('This stack has been closed.');
        (_a = this.__items).push.apply(_a, items);
        return this;
    };
    Stack.prototype.pop = function (amount) {
        if (amount === void 0) { amount = 1; }
        if (this.__isClosed)
            throw new Error('This stack has been closed.');
        var items = [];
        for (var i = 0; i < amount; i++) {
            items.push(this.__items.pop());
        }
        return items.length === 1 ? items[0] : items;
    };
    /**
     * Clears the stack's items, leaving it empty.
     *
     * @returns `this` object for chaining.
     */
    Stack.prototype.clear = function () {
        if (this.__isClosed)
            throw new Error('This stack has been closed.');
        this.__items = [];
        return this;
    };
    Stack.prototype.peek = function (amount) {
        if (amount === void 0) { amount = 1; }
        var top = this.__items.slice(-amount); // shallow copy of top element(s)
        return amount === 1 ? top[0] : top.slice().reverse();
    };
    /**
     * Retrieves the length of the stack.
     *
     * @returns The length of the stack.
     */
    Stack.prototype.getLength = function () {
        return this.__items.length;
    };
    /**
     * Closes the stack, preventing further modifications to its structure.
     *
     * @returns `this` object for chaining.
     */
    Stack.prototype.close = function () {
        if (this.__isClosed)
            throw new Error('This stack has already been closed.');
        this.__isClosed = true;
        return this;
    };
    /**
     * Executes `cb` for every item in the stack.
     *
     * @param cb The callback function to be executed for every item in the stack.
     * @returns `this` object for chaining.
     */
    Stack.prototype.forEach = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var i = 0; i < this.__items.length; i++) {
            cb(this.__items[i], i, this);
        }
        return this;
    };
    /**
     * Executes `cb` for every item in the stack, and creates a new one which contains
     * only the items that make `cb` return `true`.
     *
     * @param cb The callback function to be executed for every item in the stack.
     * @returns A new stack containing only the items that make `cb` return `true`.
     */
    Stack.prototype.filter = function (cb) {
        var newItems = [];
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var i = 0; i < this.__items.length; i++) {
            var doPush = cb(this.__items[i], i, this);
            if (typeof doPush !== 'boolean')
                throw new TypeError("\"cb\" must return a value of type \"boolean\". Got \"".concat(doPush, "\" of type \"").concat(typeof doPush, "\"."));
            if (doPush)
                newItems.push(this.__items[i]);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new (Stack.bind.apply(Stack, __spreadArray([void 0], newItems, false)))();
    };
    /**
     * Returns whether or not at least one item of the stack makes `cb` return `true`.
     *
     * @param cb The callback function to be executed on every item of the stack.
     * @returns Whether or not at least one item makes `cb` return `true`.
     */
    Stack.prototype.some = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        for (var i = 0; i < this.__items.length; i++) {
            var isSatisfied = cb(this.__items[i], i, this);
            if (typeof isSatisfied !== 'boolean')
                throw new TypeError("\"cb\" must return a value of type \"boolean\". Got ".concat(isSatisfied, " of type ").concat(typeof isSatisfied));
            if (isSatisfied)
                return true;
        }
        return false;
    };
    Stack.prototype.reduce = function (cb, initialValue) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        if (this.__items.length === 0 && initialValue === undefined) {
            throw new TypeError('Reduce of empty stack with no initial value!');
        }
        var accumulator = initialValue !== undefined ? initialValue : this.__items[0];
        var startIndex = initialValue !== undefined ? 0 : 1;
        for (var i = startIndex; i < this.__items.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            accumulator = cb(accumulator, this.__items[i], i, this);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return accumulator;
    };
    /**
     * Maps every item of this stack to another one in a new stack, via `cb`.
     *
     * @param cb A callback to be executed for every item in the original stack.
     * @returns A new stack containing the results of calling `cb` for every
     * item in the original one.
     */
    Stack.prototype.map = function (cb) {
        if (typeof cb !== 'function')
            throw new TypeError("\"cb\" must be of type \"function\". Got \"".concat(cb, "\" of type \"").concat(typeof cb, "\"."));
        var newItems = [];
        for (var i = 0; i < this.__items.length; i++) {
            newItems.push(cb(this.__items[i], i, this));
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new (Stack.bind.apply(Stack, __spreadArray([void 0], newItems, false)))();
    };
    /**
     * Returns `true` if there's no items in the stack, `false` otherwise.
     *
     * @returns Whether or not this stack is empty.
     */
    Stack.prototype.isEmpty = function () {
        return this.__items.length === 0;
    };
    /**
     * Returns `true` if `item` is in the stack, `false` otherwise.
     *
     * @returns Whether or not this stack is empty.
     */
    Stack.prototype.includes = function (item) {
        return this.indexOf(item) !== -1;
    };
    /**
     * Returns `true` if `item` is in the stack (by deep comparison), `false` otherwise.
     * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
     *
     * @returns Whether or not `item` is in this stack. `item` is deeply compared
     * against each item in order to determine this.
     */
    Stack.prototype.deepIncludes = function (item) {
        return this.deepIndexOf(item) !== -1;
    };
    /**
     * Returns `item`'s index in the stack (by deep comparison), or -1 if it's not there.
     * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
     *
     * @returns `item`'s index in the stack (by deep comparison), or -1 if it's not in the stack.
     */
    Stack.prototype.deepIndexOf = function (item, epsilon) {
        if (epsilon === void 0) { epsilon = 0; }
        for (var i = 0; i < this.__items.length; i++) {
            if ((0, equal_lib_1.deepEquality)(item, this.__items[i], { epsilon: epsilon }))
                return i;
        }
        return -1;
    };
    /**
     * Returns this stack's closure state.
     * @returns Whether or not this stack is closed.
     */
    Stack.prototype.isClosed = function () {
        return this.__isClosed;
    };
    /**
     * Returns `item`'s index in the stack, or -1 if it's not there.
     *
     * @returns `item`'s index in the stack, or -1 if it's not in the stack.
     */
    Stack.prototype.indexOf = function (item) {
        for (var i = 0; i < this.__items.length; i++) {
            if (item === this.__items[i])
                return i;
        }
        return -1;
    };
    /**
     * Returns the index of the last occurence of `items` in the stack, or -1 if it's not there.
     *
     * @returns The index of the last occurence of `items` in the stack, or -1 if it's not in the
     * stack.
     */
    Stack.prototype.lastIndexOf = function (item) {
        for (var i = this.__items.length - 1; i >= 0; i--) {
            if (item === this.__items[i])
                return i;
        }
        return -1;
    };
    /**
     * Reverses the stack in-place. If you want to create a reversed copy, add `.copy()`
     * before this method.
     *
     * @returns `this` object for chaining.
     */
    Stack.prototype.reverse = function () {
        if (this.__isClosed)
            throw new Error('This stack has been closed.');
        this.__items.reverse();
        return this;
    };
    /**
     * Returns a JSON string representation of this stack.
     *
     * @returns A JSON string containing all items in this stack.
     */
    Stack.prototype.toString = function () {
        return JSON.stringify(this.__items.slice());
    };
    /**
     * Returns an array containing all items currently in the stack.
     *
     * @returns An array with all items in the stack.
     */
    Stack.prototype.toArray = function () {
        return this.__items.slice();
    };
    /**
     * Makes a new stack with all items contained in this one.
     *
     * @returns A new stack with all items of this one.
     */
    Stack.prototype.copy = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new (Stack.bind.apply(Stack, __spreadArray([void 0], this.__items, false)))();
    };
    return Stack;
}());
exports.Stack = Stack;
