const bubbleSort = require('../Sorts/bubbleSort');
const quickSort = require('../Sorts/quickSort');

class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;
    #fill;

    constructor(cap = 0,fill = 0) {
        if(cap < 0) throw new RangeError('Not valid capacity');
        this.#size = 0;
        this.#capacity  = cap;
        this.#fill = fill;
        this.#arr = new Int32Array(this.#capacity).fill(this.#fill);
    }

    /* ================= Capacity ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    empty() {
        return this.#size === 0;
    }

    reserve(n) {
        if(n <= this.#capacity) return;
        this.#capacity = n;
        const newAddress = new Int32Array(n).fill(this.#fill);
        for(let i = 0;i < this.#size;++i){
            newAddress[i] = this.#arr[i];
        };
        this.#arr = newAddress;
    }

    shrinkToFit() {
        this.#capacity = this.#size;
    }

    clear() {
        this.#size = 0;
    }

    /* ================= Element Access ================= */

    at(i) {
        if(i < 0 || i >= this.#size || !Number.isInteger(i)) throw new RangeError('invalid Index');
        return this.#arr[i];
    }

    set(i, value) {
        if(i < 0 || i >= this.#size || !Number.isInteger(i)) throw new RangeError('invalid Index');
        if(!Number.isInteger(value)) throw new TypeError('Invalid Value');
        this.#arr[i] = value;
    }

    front() {
        if(this.#size === 0) throw new RangeError('size is 0');
        return this.#arr[0];
    }

    back() {
        if(this.#size === 0) throw new RangeError('size is 0');
        return this.#arr[this.#size - 1];
    }

    toArray() {
        const newArray = new Array(this.#size);
        for(let i = 0;i < this.#size;++i){
            newArray[i] = this.#arr[i];
        }
        return newArray;
    }

    /* ================= Modifiers ================= */

    pushBack(value) {
        if(!Number.isInteger(value)) throw new TypeError('Invalid Value');
        if(this.#size === this.#capacity || this.#size === 0) this.#resize();

        this.#arr[this.#size++] = value;
    }

    popBack() {
        if (this.#size === 0) throw new RangeError('array is empty');
        return this.#arr[--this.#size];
    }

    insert(pos, value) {
        if(pos < 0 ||  pos > this.#size || !Number.isInteger(pos)) throw new RangeError('Invalid Position');
        if(!Number.isInteger(value)) throw new TypeError('invalid value type');
        if(this.#size === this.#capacity) this.#resize();

        for(let i = this.#size; i > pos ;--i){
            this.#arr[i] = this.#arr[i - 1]
        }
        this.#arr[pos] = value;
    }

    erase(pos) {
        if(pos < 0 || pos >= this.#size || !Number.isInteger(pos)) throw new RangeError('Invalid Pos');
        for(let i = pos; i < this.#size - 1;++i) {
           this.swap(i,i+1)
        }
        this.#size--;
    }

    #resize(){
        const newAddress = new Int32Array(this.#capacity === 0 ? 1: this.#capacity *= this.#GROWTH).fill(0);
        for(let i = 0;i < this.#size;++i){
            newAddress[i] = this.at(i);
        }
        this.#arr = newAddress;
    }

    swap(i, j) {
        if(!(Number.isInteger(i) && Number.isInteger(j))) throw new TypeError("Invalid index");
        if(j < 0 ||j >= this.#size) throw new RangeError('invalid j range');
        if(i < 0 ||i >= this.#size) throw new RangeError("invalid i Range");
        [this.#arr[i],this.#arr[j]] = [this.#arr[j],this.#arr[i]];
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let i = 0;

        return {
            next: () => {
                return {
                    done:i >= this.#size, value: this.#arr[i++]
                }
            }
        }
    }

   *values() {
        for(let i = 0; i < this.#size;++i){
            yield this.at(i);
        }
    }

    *keys() {
        for(let i = 0;i < this.#size;++i){
            yield i;
        }
    }

    *entries() {
        for(let i = 0; i < this.#size;++i){
            yield [i, this.at(i)];
        }
    }

    /* ================= High Order ================= */

    forEach(fn) {
        for(let i = 0;i < this.#size;++i){
            fn(this.at(i),i,this.#arr);
        }
    }

    map(fn) {
        const res = new DynamicArray();
        for(let i = 0; i < this.#size;++i){
            res.pushBack(fn(this.at(i),i,this.#arr));
        }
        return res;
    }

    filter(fn) {
        const res = new DynamicArray();
        for(let i = 0;i < this.#size;++i){
            if(fn(this.at(i),i,this.#arr)){
                res.pushBack(this.at(i));
            }
        }
        return res;
    }

    reduce(fn, initial) {
        if(typeof fn != 'function') throw new RangeError('callback not given');
        if(this.#size === 0) throw new RangeError('array is empty')
        let acc
        if(initial)
            acc = initial
        else acc = this.at(0);
        for(let i = initial ? 0 : 1;i < this.#size;++i){
            acc = fn(acc,this.at(i),i, this.#arr);
        }
        return acc;
    }

    some(fn) {
        for(let i = 0;i < this.#size;++i){
            if(fn(this.at(i),i,this.#arr)){
                return  true;
            }
        }
        return false;
    }

    every(fn) {
        for(let i = 0; i < this.#size;++i){
            if(!fn(this.at(i),i,this.#arr)){
                return false;
            }
        }
        return true;
    }

    find(fn) {
        for(let i = 0;i < this.#size;++i){
            if(fn(this.at(i),i,this.#arr)){
                return this.at(i);
            }
        }
    }

    findIndex(fn) {
        for(let i = 0;i < this.#size;++i){
            if(fn(this.at(i),i,this.#arr)){
                return i;
            }
        }
        return -1;
    }

    includes(value) {
        for(let i = 0;i < this.#size;++i){
            if(this.at(i) === value) return true;
        }
        return false;
    }

    /* ================= Extensions ================= */

    reverse() {
        for(let i = 0; i < this.#size / 2;++i){
           this.swap(i,this.#size - i - 1);
        }
    }

    sort(compareFn) {
        if(this.#size >= 100) {
            quickSort(compareFn,this.#arr);
        } else {
            bubbleSort(compareFn,this.#arr);
        }
    }

    clone(arr = this.#arr) {
        if (!(arr instanceof Int32Array)) return arr;
       let clone = new Int32Array(arr.length);
       for(let i = 0; i < arr.length;++i){
        clone[i] = this.clone(arr[i]);
       }
       return clone;
    }

    equals(other) {
        if(other.size() === this.size()){
            for(let i = 0;i < this.size();++i){
                if(this.at(i) !== other.at(i)) return false;
            }   
            return true;
        }
        return false
    }
}