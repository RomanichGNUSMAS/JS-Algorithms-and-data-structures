class Deque {
  #arr;
  #front = 0;
  #back = -1;
  #size = 0;
  #cap;
  constructor(capacity = 8) {
    if(capacity < 2) this.#cap = 8;
    else this.#cap = capacity
    this.#arr = new Array(this.#cap);
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
    if(i < 0 || i > this.#cap - 1 || !Number.isInteger(i)) throw new RangeError('Out of range');
    return i % this.#cap;
  }

  #index(i) {
    if(this.empty()) throw new RangeError('Out of Range');
    
  }

  #ensureCapacityForOneMore() {
    // If size < capacity → do nothing
    // If size === capacity:
    //   Allocate new buffer with capacity * 2
    //   Copy elements in logical order
    //   Reset front to 0
  }

  /* ================= Element Access ================= */

  front() {
    // If empty → throw Error
    // Must return first element
  }

  back() {
    // If empty → throw Error
    // Must return last element
  }

  at(i) {
    // If i invalid → throw Error
    // Must return element at logical index i
  }

  /* ================= Modifiers ================= */

  push_back(value) {
    // Must ensure capacity
    // Must insert value after last element
    // Must increase size
  }

  push_front(value) {
    // Must ensure capacity
    // Must move front backward circularly
    // Must insert value at new front
    // Must increase size
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