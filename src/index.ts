import { deepEquality } from '@santi100/equal-lib';

export type StackCallback<T, R = unknown> = (
	item: T,
	index: number,
	stack: Stack<T>
) => R;

export type StackReducerCb<T, R = unknown> = (
	acc: T,
	cur: T,
	idx: number,
	stack: Stack<T>
) => R;
/**
 * Main class for this data structure.
 */
export class Stack<T = unknown> {
	private __items: T[];
	private __isClosed: boolean;
	/**
	 * Create a new stack.
	 *
	 * @param initialItems Any optional items to initialize the stack with.
	 */
	constructor(...initialItems: T[]) {
		this.__items = initialItems;
		this.__isClosed = false;
		const OPTS: PropertyDescriptor = {
			enumerable: false,
			configurable: false,
		};
		Object?.defineProperty?.(this, '__items', OPTS);
		Object?.defineProperty?.(this, '__isClosed', OPTS);
	}
	/**
	 * Pushes new items into the stack.
	 *
	 * @param items Whatever items you want to push.
	 * @returns `this` object for chaining.
	 */
	push(...items: T[]): this {
		if (this.__isClosed) throw new Error('This stack has been closed.');
		this.__items.push(...items);
		return this;
	}
	/**
	 * Pops `amount` items out of the stack.
	 *
	 * @param amount How many items you want to pop.
	 * @returns The popped items.
	 */
	pop(amount: number): T[];
	/**
	 * Pops the last item out of the stack.
	 * @returns The popped item.
	 */
	pop(): T;
	pop(amount = 1) {
		if (this.__isClosed) throw new Error('This stack has been closed.');

		const items = [];
		for (let i = 0; i < amount; i++) {
			items.push(this.__items.pop());
		}
		return items.length === 1 ? items[0] : items;
	}
	/**
	 * Clears the stack's items, leaving it empty.
	 *
	 * @returns `this` object for chaining.
	 */
	clear() {
		if (this.__isClosed) throw new Error('This stack has been closed.');

		this.__items = [];
		return this;
	}
	/**
	 * Peeks `amount` items (retrieves items without popping them out).
	 *
	 * @param amount How may items you want to peek.
	 * @returns `amount` items from the stack.
	 */
	peek(amount: number): T[];
	/**
	 * Peeks (retrieves without popping out) the last item.
	 *
	 * @returns The last item.
	 */
	peek(): T;
	peek(amount = 1) {
		const top = this.__items.slice(-amount); // shallow copy of top element(s)
		return amount === 1 ? top[0] : top.slice().reverse();
	}
	/**
	 * Retrieves the length of the stack.
	 *
	 * @returns The length of the stack.
	 */
	getLength() {
		return this.__items.length;
	}
	/**
	 * Closes the stack, preventing further modifications to its structure.
	 *
	 * @returns `this` object for chaining.
	 */
	close() {
		if (this.__isClosed) throw new Error('This stack has already been closed.');

		this.__isClosed = true;
		return this;
	}
	/**
	 * Executes `cb` for every item in the stack.
	 *
	 * @param cb The callback function to be executed for every item in the stack.
	 * @returns `this` object for chaining.
	 */
	forEach<R = unknown>(cb: StackCallback<T, R>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (let i = 0; i < this.__items.length; i++) {
			cb(this.__items[i], i, this);
		}
		return this;
	}
	/**
	 * Executes `cb` for every item in the stack, and creates a new one which contains
	 * only the items that make `cb` return `true`.
	 *
	 * @param cb The callback function to be executed for every item in the stack.
	 * @returns A new stack containing only the items that make `cb` return `true`.
	 */
	filter(cb: StackCallback<T, boolean>) {
		const newItems = [];
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (let i = 0; i < this.__items.length; i++) {
			const doPush = cb(this.__items[i], i, this);
			if (typeof doPush !== 'boolean')
				throw new TypeError(
					`"cb" must return a value of type "boolean". Got "${doPush}" of type "${typeof doPush}".`
				);

			if (doPush) newItems.push(this.__items[i]);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new Stack(...newItems);
	}
	/**
	 * Returns whether or not at least one item of the stack makes `cb` return `true`.
	 *
	 * @param cb The callback function to be executed on every item of the stack.
	 * @returns Whether or not at least one item makes `cb` return `true`.
	 */
	some(cb: StackCallback<T, boolean>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		for (let i = 0; i < this.__items.length; i++) {
			const isSatisfied = cb(this.__items[i], i, this);
			if (typeof isSatisfied !== 'boolean')
				throw new TypeError(
					`"cb" must return a value of type "boolean". Got ${isSatisfied} of type ${typeof isSatisfied}`
				);

			if (isSatisfied) return true;
		}
		return false;
	}
	/**
	 * Reduces the stack to one value by repeatedly calling `cb` and accumulating its results.
	 *
	 * @param cb A callback to be executed for every item (see {@link Array.prototype.reduce}).
	 */
	reduce<R = unknown>(cb: StackReducerCb<T, R>): T;
	/**
	 * Reduces the stack to one value by repeatedly calling `cb` and accumulating its results.
	 *
	 * @param cb A callback to be executed for every item (see {@link Array.prototype.reduce}).
	 * @param initialValue The initial value to be used instead of the first item in the stack.
	 */
	reduce<R = unknown>(cb: StackReducerCb<T, R>, initialValue: R): R;
	reduce<R = unknown>(cb: StackReducerCb<T, R>, initialValue?: R): T | R {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		if (this.__items.length === 0 && initialValue === undefined) {
			throw new TypeError('Reduce of empty stack with no initial value!');
		}
		let accumulator: R | T =
			initialValue !== undefined ? initialValue : this.__items[0];
		const startIndex = initialValue !== undefined ? 0 : 1;
		for (let i = startIndex; i < this.__items.length; i++) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			accumulator = cb(accumulator, this.__items[i], i, this);
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return accumulator;
	}
	/**
	 * Maps every item of this stack to another one in a new stack, via `cb`.
	 *
	 * @param cb A callback to be executed for every item in the original stack.
	 * @returns A new stack containing the results of calling `cb` for every
	 * item in the original one.
	 */
	map<R = unknown>(cb: StackCallback<T, R>) {
		if (typeof cb !== 'function')
			throw new TypeError(
				`"cb" must be of type "function". Got "${cb}" of type "${typeof cb}".`
			);
		const newItems = [];
		for (let i = 0; i < this.__items.length; i++) {
			newItems.push(cb(this.__items[i], i, this));
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new Stack(...newItems);
	}
	/**
	 * Returns `true` if there's no items in the stack, `false` otherwise.
	 *
	 * @returns Whether or not this stack is empty.
	 */
	isEmpty() {
		return this.__items.length === 0;
	}
	/**
	 * Returns `true` if `item` is in the stack, `false` otherwise.
	 *
	 * @returns Whether or not this stack is empty.
	 */
	includes(item: T) {
		return this.indexOf(item) !== -1;
	}
	/**
	 * Returns `true` if `item` is in the stack (by deep comparison), `false` otherwise.
	 * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
	 *
	 * @returns Whether or not `item` is in this stack. `item` is deeply compared
	 * against each item in order to determine this.
	 */
	deepIncludes(item: T) {
		return this.deepIndexOf(item) !== -1;
	}
	/**
	 * Returns `item`'s index in the stack (by deep comparison), or -1 if it's not there.
	 * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
	 *
	 * @returns `item`'s index in the stack (by deep comparison), or -1 if it's not in the stack.
	 */
	deepIndexOf(item: T, epsilon = 0) {
		for (let i = 0; i < this.__items.length; i++) {
			if (deepEquality(item, this.__items[i], { epsilon })) return i;
		}
		return -1;
	}
	/**
	 * Returns this stack's closure state.
	 * @returns Whether or not this stack is closed.
	 */
	isClosed() {
		return this.__isClosed;
	}
	/**
	 * Returns `item`'s index in the stack, or -1 if it's not there.
	 *
	 * @returns `item`'s index in the stack, or -1 if it's not in the stack.
	 */
	indexOf(item: T) {
		for (let i = 0; i < this.__items.length; i++) {
			if (item === this.__items[i]) return i;
		}
		return -1;
	}
	/**
	 * Returns the index of the last occurence of `items` in the stack, or -1 if it's not there.
	 *
	 * @returns The index of the last occurence of `items` in the stack, or -1 if it's not in the
	 * stack.
	 */
	lastIndexOf(item: T) {
		for (let i = this.__items.length - 1; i >= 0; i--) {
			if (item === this.__items[i]) return i;
		}
		return -1;
	}
	/**
	 * Reverses the stack in-place. If you want to create a reversed copy, add `.copy()`
	 * before this method.
	 * 
	 * @returns `this` object for chaining.
	 */
	reverse() {
		if (this.__isClosed) throw new Error('This stack has been closed.');

		this.__items.reverse();
		return this;
	}
	/**
	 * Returns a JSON string representation of this stack.
	 * 
	 * @returns A JSON string containing all items in this stack.
	 */
	toString() {
		return JSON.stringify(this.__items.slice());
	}
	/**
	 * Returns an array containing all items currently in the stack.
	 * 
	 * @returns An array with all items in the stack.
	 */
	toArray(): T[] {
		return this.__items.slice();
	}
	/**
	 * Makes a new stack with all items contained in this one.
	 * 
	 * @returns A new stack with all items of this one.
	 */
	copy() {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// return new Stack(...this.__items); 
	}
}
