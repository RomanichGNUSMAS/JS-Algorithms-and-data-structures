class Deque {
    #arr;
    #front = 0;
    #size = 0;
    #cap;

    constructor(capacity = 8) {
        if (capacity < 2) this.#cap = 8;
        else this.#cap = capacity
        this.#arr = new Array(this.#cap).fill(undefined);
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size
    }

    capacity() {
        return this.#cap;
    }

    empty() {
        return this.#size === 0;
    }

    full() {
        return this.#size === this.#cap;
    }

    /* ================= Internal Helpers ================= */

    #mod(i) {
        if (i < 0 || i > this.#cap - 1 || !Number.isInteger(i)) throw new RangeError('Out of range');
        return i % this.#cap;
    }

    #index(i) {
        if (this.empty()) throw new RangeError('Out of Range');
        return this.#mod(i + this.#size);
    }

    #resize() {
        let arr = new Deque(this.#cap *= 2);
        for (let i of this) {
            arr.push_back(i)
        }
        this.#arr = arr;
    }

    #ensureCapacityForOneMore() {
        if (this.#size < this.#cap) return;
        this.#resize();
        this.#front = 0;
    }

    /* ================= Element Access ================= */

    front() {
        if (this.empty()) throw new RangeError('Out of Range');
        return this.at(this.#front);
    }

    back() {
        if (this.empty()) throw new RangeError('Out of Range');
        return this.#arr[(this.#front - 1 + this.#cap) % this.#cap];
    }

    at(i) {
        if (i < 0 || this.#size <= i || !Number.isInteger(i)) throw new RangeError('Out of Range');
        return this.#arr[this.#index(i)];
    }

    /* ================= Modifiers ================= */

    push_back(value) {
        if (this.full()) this.#ensureCapacityForOneMore();
        this.#front = (this.front() - 1 + this.#cap) % this.#cap;
        this.#arr[this.front()] = value;
        this.#size++;
    }

    push_front(value) {
        if (this.full()) this.#ensureCapacityForOneMore();
        let index = this.#index(this.front());
        this.#arr[index] = value;
        this.#size++;
    }

    pop_front() {
        if (this.empty()) throw new RangeError('Out of Range');
        let tmp = this.at(this.#front);
        this.#arr[this.#front] = undefined;
        this.#front--;
        this.#size--;
        return tmp;
    }

    pop_back() {
        if (this.empty()) throw new RangeError('Out of Range');
        let tmp = this.at((this.#front - 1 + this.#cap) % this.#cap);
        this.#arr[(this.#front - 1 + this.#cap) % this.#cap] = undefined;
        this.#size--;
        return tmp;
    }

    clear() {
        this.#arr = new Array(this.#cap).fill(undefined);
        this.#size = 0;
        this.#front = 0;
    }

    /* ================= Extended Professional Methods ================= */

    reserve(newCapacity) {
        if (newCapacity <= this.#cap) return;
        let newAddress = new Array(newCapacity).fill(undefined);
        for (let i = 0; i < this.#size; i++) {
            newAddress[i] = newCapacity[i];
        }
        this.#cap = newCapacity;
        this.#front = 0;
        this.#arr = newAddress;
    }

    shrinkToFit() {
        let newAddress = new Array(this.#size).fill(undefined);
        for (let i = 0; i < this.#size; i++) {
            newAddress[i] = this.#arr[i];
        }
        this.#cap = this.#size;
        this.#arr = newAddress;
    }

    rotateLeft(k = 1) {
        if (k <= 0) return;

        let count = 0;
        k %= this.#arr.cap;
        for (let i of this.#arr.slice(this.capacity() - k).concat(this.#arr.slice(0, this.capacity() - k))) {
            this.#arr[count++] = i
        }

    }

    rotateRight(k = 1) {
        // Must rotate deque right by k steps
        // Logical front shifts backward
    }

    swap(i, j) {
        if (i < 0 || i >= this.size()) throw new RangeError('Out of Range');
        if (j < 0 || j >= this.size()) throw new RangeError('Out of Range');
        [this.#arr[this.#index(i)], this.#arr[this.#index(j)]] = [this.#arr[this.#index(j)], this.#arr[this.#index(i)]]
    }

    /* ================= Search & Utilities ================= */

    find(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.at(i) === value) return this.#index(i);
        }
        return -1;
    }

    includes(value) {
        for (let i = 0; i < this.#size; i++) {
            if (this.at(i) === value) return true;
        }
        return false;
    }

    toArray() {
        let arr = new Array(this.#size);
        for (let i = 0; i < this.size(); ++i) {
            arr[i] = this.#arr[i];
        }
        return arr;
    }

    clone() {
        // Must return deep copy of deque
        // New instance must not share buffer
    }

    equals(otherDeque) {
        if (otherDeque.size() !== this.size()) return false;
        for (let i = 0; i < this.size(); i++) {
            if (this.at(i) !== otherDeque.at(i)) return false;
        }
        return true;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => {
                if (i >= this.size()) return {value: undefined, done: true};
                return {value: this.at(i++), done: false};
            }
        }
    }

    * values() {
        yield* this.#arr;
    }

    * keys() {
        for (let i = 0; i < this.size(); i++) {
            yield i;
        }
    }

    * entries() {
        for (let i = 0; i < this.size(); i++) {
            yield [i, this.at(i)];
        }
    }

    /* ================= Functional Style ================= */

    forEach(fn) {
        for (let i = 0; i < this.size(); ++i) {
            fn(this.at(i), i, this.#arr);
        }
    }

    map(fn) {
        const res = [];
        for (let i = 0; i < this.size(); ++i) {
            res.push(fn(this.at(i), i, this.#arr));
        }
        return res;
    }

    filter(fn) {
        const res = [];
        for (let i = 0; i < this.size(); ++i) {
            if (fn(this.at(i), i, this.#arr)) {
                res.push(this.at(i));
            }
        }
        return res;
    }

    reduce(fn, initial) {
        let acc = !initial && initial !== 0 ? initial : this.at(0);

        for (let i = 0; i < this.size(); ++i) {
            acc = fn(acc, this.at(i));
        }
        return acc;
    }
}