class Priority_Queue {
    #heap;
    #cmp;
    #size;

    #is_Max = null;

    constructor(cmp = (a, b) => a - b) {
        if(typeof cmp !== 'function') throw new TypeError('Cmp must be a function');
        this.#cmp = cmp;
        if(cmp(1,0) > 0) this.#is_Max = true;
        this.#heap = [];
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size == 0;
    }

    clear() {
        this.#heap = [];
        this.#size = 0;
    }

    comparator() {
        return this.#cmp
    }

    /* ================= Access Operations ================= */

    peek() {
        return this.is_empty() ? undefined : this.#heap[0];
    }

    /* ================= Modification Operations ================= */

    add(value) {
        this.#heap.push(value);
        if(this.#is_Max) {
            this.#shift_up_for_max_heap(this.#size)
        } else {
            this.#shift_up_for_min_heap(this.#size);
        }
        this.#size++;
    }

    pop() {
        if(this.is_empty()) return NaN;
        this.#swap(0, this.#size - 1);
        const popped = this.#heap.pop();
        if(this.#is_Max) this.#shift_down_for_max_heap(0);
        else this.#shift_down_for_min_heap(0);
        this.#size--;
        return popped;
    }

    remove(value) {
        let idx = -1;
        for(let i = 0;i < this.#heap.length;i++) {
            if(this.#heap[i] === value) {
                idx = i;
                break;
            }
        }
        if(idx < 0) return NaN;
        this.#swap(idx,this.#heap.length - 1);
        const rm = this.#heap.pop();
        if(this.#is_Max) {
            this.#shift_up_for_max_heap(idx);
            this.#shift_down_for_max_heap(idx);
        } else {
            this.#shift_up_for_min_heap(idx);
            this.#shift_down_for_min_heap(idx);
        }
        this.#size--;
        return rm;
    }

    /* ================= Heap Utilities ================= */

    toArray() {
       let array = new Array(this.#size);
       for(let i = 0; i < this.#heap.length; i++) {
            array[i] = this.#heap[i];
       }
       return array;
    }

    /* ================= Index Helpers ================= */

    #get_parent(index) {
        return ((index - 1) / 2) >> 0
    }

    #get_left_child(index) {
        return index * 2 + 1;
    }

    #get_right_child(index) {
       return index * 2 + 2
    }

    #swap(i, j) {
        [this.#heap[i],this.#heap[j]] = [this.#heap[j],this.#heap[i]];
    }

    /* ================= Heap Maintenance ================= */

    #shift_down_for_min_heap(index) {
        let min = index;
        let [left,right] = [index * 2 + 1,index * 2 + 2];
        if(this.#heap[left] && this.#heap[min] > this.#heap[left]) {
            min = left;
        }
        if(this.#heap[right] && this.#heap[min] > this.#heap[right]) {
            min = right;
        }
        if(index !== min) {
            this.#swap(min, index);
            this.#shift_down_for_min_heap(min);
        }
    }

    #shift_up_for_max_heap(index) {
        let parent = ((index - 1) / 2) >> 0;
        if(this.#heap[parent] < this.#heap[index]) {
            this.#swap(parent, index);
            this.#shift_up_for_max_heap(parent);
        }
    }

    #shift_up_for_min_heap(index) {
        let parent = ((index - 1) / 2) >> 0;
        if(this.#heap[parent] > this.#heap[index]) {
            this.#swap(parent, index);
            this.#shift_up_for_min_heap(parent);
        }
    }

    #shift_down_for_max_heap(index) {
        let max = index;
        let [left,right] = [index * 2 + 1,index * 2 + 2];
        if(this.#heap[left] && this.#heap[max] < this.#heap[left]) {
            max = left;
        }
        if(this.#heap[right] && this.#heap[max] < this.#heap[right]) {
            max = right;
        }
        if(index !== max) {
            this.#swap(max, index);
            this.#shift_down_for_max_heap(max);
        }
    }

    /* ================= Search Utility ================= */

    #indexOf(value) {
        for(let i = 0; i < this.#heap.length; i++) {
            if(this.#heap[i] === value) {
                return i
            }
        }
        return -1;
    }

    /* ================= Advanced Heap Operations ================= */

    heapify(array) {
        this.#heap = [...array]
        this.#size = array.length;
        const siftdown = this.#cmp(1,0) > 0 ? this.#shift_down_for_max_heap : this.#shift_down_for_min_heap;
        let lastP = ((this.#heap.length - 1) / 2) >> 0;
        for(let i = lastP; i >= 0; i--) {
            siftdown.call(this,i)
        }
    }

    replace(value) {
        if(this.is_empty()) return false;
            const rm = this.#heap[0];
        this.#heap[0] = value;
        if(this.#is_Max) {
            this.#shift_down_for_max_heap(0);
        } else this.#shift_down_for_min_heap(0);
        return rm;
    }

    contains(value) {
        if(this.#indexOf(value) === -1) return false;
        return true;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => {
                if(i<this.#size) return {value: this.#heap[i++], done:false};
                return {value: undefined, done:true};
            }
        }
    }

    *values() {
       for(let i of this.#heap) {
           yield i;
       }
    }

    *entries() {
        for(let i = 0;i < this.#size; i++) {
            yield [i,this.#heap[i]];
        }
    }
}