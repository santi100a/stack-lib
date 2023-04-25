describe('Stack_class', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
	const { Stack } = require('..');
	// Tests that items can be pushed onto the stack and that the stack length increases accordingly.
	it('test_push', () => {
		const stack = new Stack();
		stack.push(1, 2, 3);
		expect(stack.getLength()).toBe(3);
		stack.push(4);
		expect(stack.getLength()).toBe(4);
	});
	let stack = new Stack();
	beforeEach(() => (stack = new Stack()));
    test('the constructor initializes the stack if provided items', () => {
        let s = new Stack(5, 8, 3);
        expect(s.toArray()).toEqual([5, 8, 3]);
    });
	test('push should add elements to the stack', () => {
		stack.push(1, 2);
		expect(stack.peek(2)).toEqual([2, 1]);
	});
    test('push error handling', () => {
		stack.close();
		expect(() => stack.push(1, 2)).toThrow();
	});
    test('pop error handling', () => {
		stack.close();
		expect(() => stack.pop()).toThrow();
		expect(() => stack.pop(5)).toThrow();
	});
    test('clear error handling', () => {
		stack.close();
		expect(() => stack.clear()).toThrow(); 
	});
    test('isClosed', () => {
        expect(stack.isClosed()).toBeFalsy();
        stack.close();
        expect(stack.isClosed()).toBeTruthy();
    });
    test('forbid closing more than once', () => {
        stack.close();
        expect(() => stack.close()).toThrow();
    });

	test('pop should remove and return elements from the stack', () => {
		stack.push(1, 2);
		expect(stack.pop()).toEqual(2);
		expect(stack.pop(2)).toEqual([1]);
	});

	test('clear should remove all elements from the stack', () => {
		stack.push(1, 2);
		stack.clear();
		expect(stack.peek()).toBeUndefined();
	});

	test('peek should return the top element of the stack', () => {
		stack.push(1, 2);
		expect(stack.peek()).toEqual(2);
	});

	test('forEach should call the callback function for each element in the stack', () => {
		stack.push(1, 2);
		let i = 0;
		const callback = () => {
			i++;
		};
		stack.forEach(callback);
		expect(i).toBe(2);
		expect(() => stack.forEach('not a function')).toThrow(TypeError);
	});

	test('filter should return a new stack with elements that pass the test implemented by the provided function', () => {
		stack.push(1, 2, 3, 4);
		const newStack = stack.filter((item) => item % 2 === 0);
		expect(newStack.peek(2)).toEqual([4, 2]);
		expect(() => stack.filter('not a function')).toThrow(TypeError);
		expect(() => stack.filter(() => 'not a boolean')).toThrow(TypeError);
	});

	test('some should return true if at least one element in the stack passes the test implemented by the provided function', () => {
		stack.push(1, 2, 3);
		const result = stack.some((item) => item % 2 === 0);
		expect(result).toBe(true);
		expect(() => stack.some('not a function')).toThrow(TypeError);
		expect(() => stack.some(() => 'not a boolean')).toThrow(TypeError);

	});

	test('some should return false if none of the elements in the stack pass the test implemented by the provided function', () => {
		stack.push(1, 3, 5);
		const result = stack.some((item) => item % 2 === 0);
		expect(result).toBe(false);
	});

	test('reduce should apply a function against an accumulator and each element in the stack to reduce it to a single value', () => {
		stack.push(1, 2, 3);
		const result = stack.reduce((acc, cur) => acc + cur, 0);
		expect(result).toBe(6);
	});

	test('reduce should throw an error if the stack is empty and no initial value is provided', () => {
		expect(() => stack.reduce((acc, cur) => acc + cur)).toThrow(TypeError);
        expect(() => stack.reduce('not a function')).toThrow(TypeError);
	});

	test('map should return a new stack with the results of calling a provided function on every element in the stack', () => {
		stack.push(1, 2, 3);
		const newStack = stack.map((item) => item * 2);
		expect(newStack.peek(3)).toEqual([6, 4, 2]);
        expect(() => stack.map('not a function')).toThrow(TypeError);
        
	});
    test('deepIncludes', () => {
        stack.push({ hello: 'world', foo: 'bar' });
        expect(stack.deepIncludes({ hello: 'world', foo: 'bar' })).toBeTruthy();
        expect(stack.deepIncludes({ hello: 'world', foo: 'bar', baz: 'qux' })).toBeFalsy(); 
    });
    test('deepIndexOf', () => {
        stack.push({ hello: 'world', foo: 'bar' });
        expect(stack.deepIndexOf({ hello: 'world', foo: 'bar' })).toBe(0);
        expect(stack.deepIndexOf({ hello: 'world', foo: 'bar', baz: 'qux' })).toBe(-1);
    });
    test('lastIndexOf', () => {
        stack.push(5, 8, 3, 4, 3, 5, 7);
        expect(stack.lastIndexOf(5)).toBe(5);
        expect(stack.lastIndexOf(3)).toBe(4);
        expect(stack.lastIndexOf(1)).toBe(-1);
    });
    test('indexOf', () => {
        stack.push(5, 8, 3, 4, 7);
        expect(stack.indexOf(5)).toBe(0);
        expect(stack.indexOf(3)).toBe(2);
        expect(stack.indexOf(2)).toBe(-1);
    });
    test('reverse', () => {
        stack.push(5, 6, 2, 4, 8, 3).reverse();
        expect(stack.toArray()).toEqual([3, 8, 4, 2, 6, 5]);
        stack.close();
        expect(() => stack.reverse()).toThrow();
    });
    test('toString', () => {
        stack.push(5, 6, 2, 4, 8, 3);
        expect(stack.toString()).toBe('[5,6,2,4,8,3]');
    });
    test('copy', () => {
        stack.push(5, 7, 3, 6, 2);
        const copy = stack.copy();
        expect(copy).not.toBe(stack);
        expect(copy.toArray()).toEqual(stack.toArray());
    });
	test('isEmpty should return true if the stack is empty', () => {
		expect(stack.isEmpty()).toBe(true);
	});

	test('includes should return true if the stack includes a certain element', () => {
		stack.push(1, 2, 3);
		expect(stack.includes(2)).toBe(true);
	});
	// Tests that popping more items than are in the stack returns all items in the stack and leaves the stack empty.
	it('test_pop_edge_case', () => {
		const stack = new Stack('a', 'b', 'c');
		const popped = stack.pop(5);
		expect(popped).toEqual(['c', 'b', 'a']);
		expect(stack.getLength()).toBe(0);
	});

	// Tests that reducing an empty stack without an initial value throws a TypeError.
	it('test_reduce_empty_stack', () => {
		const stack = new Stack();
		expect(() => stack.reduce((acc, cur) => acc + cur)).toThrow(TypeError);
	});
});
