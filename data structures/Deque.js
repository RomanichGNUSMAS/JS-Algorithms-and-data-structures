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
        // If empty → throw Error
        // Must remove front element
        // Must move front forward circularly
        // Must decrease size
        // Must return removed value
    }

    pop_back() {
        // If empty → throw Error
        // Must remove last element
        // Must decrease size
        // Must return removed value
    }

    clear() {
        // Must reset deque to empty state
        // Must keep current capacity
        // Must reset front to 0
        // Must set size to 0
    }

    /* ================= Extended Professional Methods ================= */

    reserve(newCapacity) {
        // If newCapacity <= current capacity → do nothing
        // Else:
        //   Allocate new buffer
        //   Copy elements in logical order
        //   Reset front to 0
    }

    shrinkToFit() {
        // Must reduce capacity to size
        // Must reallocate buffer
        // Must preserve order
    }

    rotateLeft(k = 1) {
        // Must rotate deque left by k steps
        // Logical front shifts forward
        // Must work with k > size
    }

    rotateRight(k = 1) {
        // Must rotate deque right by k steps
        // Logical front shifts backward
    }

    swap(i, j) {
        // If indices invalid → throw Error
        // Must swap logical elements
    }

    /* ================= Search & Utilities ================= */

    find(value) {
        // Must return first logical index of value
        // If not found → return -1
    }

    includes(value) {
        // Must return true if value exists
        // Otherwise false
    }

    toArray() {
        // Must return normal JS array
        // Must preserve logical order
    }

    clone() {
        // Must return deep copy of deque
        // New instance must not share buffer
    }

    equals(otherDeque) {
        // Must return true if:
        // same size AND same logical values
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        // Must iterate from front → back
        // Must not expose internal buffer layout
    }

    values() {
        // Must return value iterator
    }

    keys() {
        // Must return iterator of logical indices 0 → size-1
    }

    entries() {
        // Must return iterator of [index, value]
    }

    /* ================= Functional Style ================= */

    forEach(fn) {
        // Must call fn(value, index, thisDeque)
    }

    map(fn) {
        // Must return new deque with mapped values
    }

    filter(fn) {
        // Must return new deque with filtered values
    }

    reduce(fn, initial) {
        // Must behave like Array.reduce
        // Must throw if empty and no initial value
    }
}