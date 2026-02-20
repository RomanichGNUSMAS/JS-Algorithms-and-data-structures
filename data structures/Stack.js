class Stack {
    #stack;
    #size;
    #cap;

    constructor(capacity = 8) {
        if (!Number.isInteger(capacity)) throw new TypeError("capacity must be a positive integer.");
        if (capacity < 8) {
            this.#cap = 8;
        } else this.#cap = capacity;
        this.#size = 0;
        this.#stack = new Array(this.#cap).fill(undefined);
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#cap;
    }

    is_empty() {
        return this.#size === 0;
    }

    is_full() {
        return this.#size === this.#cap;
    }

    clear() {
        while (!this.is_empty()) {
            this.pop();
        }
    }

    /* ================= Core Stack Operations ================= */

    push(value) {
        if (this.is_full()) throw new RangeError('Overflow');
        this.#stack[this.#size++] = value;
    }

    pop() {
        if (this.is_empty()) throw new RangeError('Underflow');
        return this.#stack[--this.#size];

    }

    peek() {
        if (this.is_empty()) throw new RangeError('Out of Range');
        return this.#stack[this.#size - 1];
    }
}