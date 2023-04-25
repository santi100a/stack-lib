export type StackCallback<T, R = unknown> = (item: T, index: number, stack: Stack<T>) => R;
export type StackReducerCb<T, R = unknown> = (acc: T, cur: T, idx: number, stack: Stack<T>) => R;
/**
 * Main class for this data structure.
 */
export declare class Stack<T = unknown> {
    private __items;
    private __isClosed;
    /**
     * Create a new stack.
     *
     * @param initialItems Any optional items to initialize the stack with.
     */
    constructor(...initialItems: T[]);
    /**
     * Pushes new items into the stack.
     *
     * @param items Whatever items you want to push.
     * @returns `this` object for chaining.
     */
    push(...items: T[]): this;
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
    /**
     * Clears the stack's items, leaving it empty.
     *
     * @returns `this` object for chaining.
     */
    clear(): this;
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
    /**
     * Retrieves the length of the stack.
     *
     * @returns The length of the stack.
     */
    getLength(): number;
    /**
     * Closes the stack, preventing further modifications to its structure.
     *
     * @returns `this` object for chaining.
     */
    close(): this;
    /**
     * Executes `cb` for every item in the stack.
     *
     * @param cb The callback function to be executed for every item in the stack.
     * @returns `this` object for chaining.
     */
    forEach<R = unknown>(cb: StackCallback<T, R>): this;
    /**
     * Executes `cb` for every item in the stack, and creates a new one which contains
     * only the items that make `cb` return `true`.
     *
     * @param cb The callback function to be executed for every item in the stack.
     * @returns A new stack containing only the items that make `cb` return `true`.
     */
    filter(cb: StackCallback<T, boolean>): Stack<T>;
    /**
     * Returns whether or not at least one item of the stack makes `cb` return `true`.
     *
     * @param cb The callback function to be executed on every item of the stack.
     * @returns Whether or not at least one item makes `cb` return `true`.
     */
    some(cb: StackCallback<T, boolean>): boolean;
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
    /**
     * Maps every item of this stack to another one in a new stack, via `cb`.
     *
     * @param cb A callback to be executed for every item in the original stack.
     * @returns A new stack containing the results of calling `cb` for every
     * item in the original one.
     */
    map<R = unknown>(cb: StackCallback<T, R>): Stack<R>;
    /**
     * Returns `true` if there's no items in the stack, `false` otherwise.
     *
     * @returns Whether or not this stack is empty.
     */
    isEmpty(): boolean;
    /**
     * Returns `true` if `item` is in the stack, `false` otherwise.
     *
     * @returns Whether or not this stack is empty.
     */
    includes(item: T): boolean;
    /**
     * Returns `true` if `item` is in the stack (by deep comparison), `false` otherwise.
     * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
     *
     * @returns Whether or not `item` is in this stack. `item` is deeply compared
     * against each item in order to determine this.
     */
    deepIncludes(item: T): boolean;
    /**
     * Returns `item`'s index in the stack (by deep comparison), or -1 if it's not there.
     * Deep equality is powered by `@santi100/equal-lib`, as per usual :)
     *
     * @returns `item`'s index in the stack (by deep comparison), or -1 if it's not in the stack.
     */
    deepIndexOf(item: T, epsilon?: number): number;
    /**
     * Returns this stack's closure state.
     * @returns Whether or not this stack is closed.
     */
    isClosed(): boolean;
    /**
     * Returns `item`'s index in the stack, or -1 if it's not there.
     *
     * @returns `item`'s index in the stack, or -1 if it's not in the stack.
     */
    indexOf(item: T): number;
    /**
     * Returns the index of the last occurence of `items` in the stack, or -1 if it's not there.
     *
     * @returns The index of the last occurence of `items` in the stack, or -1 if it's not in the
     * stack.
     */
    lastIndexOf(item: T): number;
    /**
     * Reverses the stack in-place. If you want to create a reversed copy, add `.copy()`
     * before this method.
     *
     * @returns `this` object for chaining.
     */
    reverse(): this;
    /**
     * Returns a JSON string representation of this stack.
     *
     * @returns A JSON string containing all items in this stack.
     */
    toString(): string;
    /**
     * Returns an array containing all items currently in the stack.
     *
     * @returns An array with all items in the stack.
     */
    toArray(): T[];
    /**
     * Makes a new stack with all items contained in this one.
     *
     * @returns A new stack with all items of this one.
     */
    copy(): Stack<T>;
}
