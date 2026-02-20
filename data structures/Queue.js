class Queue {
    #queue;
    #front;
    #back;
    #size;
    #cap;

    constructor(capacity) {
        if (!Number.isInteger(capacity)) throw new TypeError('Invalid Value');
        if (capacity < 8) this.#cap = 8;
        else this.#cap = capacity;
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
        this.#queue = new Array(this.#cap).fill(undefined);
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
            this.dequeue()
        }
        this.#front = 0;
        this.#back = -1;
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if (this.is_full()) throw new RangeError('Overflow');
        this.#back = (this.#back + 1) % this.capacity();
        this.#queue[this.#back] = value;
        this.#size++;
    }

    dequeue() {
        if (this.is_empty()) throw new RangeError('Underflow');
        let tmp = this.#queue[this.#front];
        this.#queue[this.#front] = undefined;
        this.#front = (this.#front + 1) % this.capacity();
        this.#size--;
        return tmp;
    }

    peek() {
        if (this.is_empty()) throw new RangeError('Out of Range');
        return this.#queue[this.#front];
    }

    back() {
        if (this.is_empty()) throw new RangeError('Out of Range');
        return this.#queue[this.#back];
    }

    print() {
        if (this.is_empty()) throw new RangeError('Out of Range');

        for (let i = 0; i < this.size(); i++) {
            let idx = (this.#front + i) % this.capacity();
            console.log(this.#queue[idx]);
        }
    }
}