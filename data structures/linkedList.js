class Node {
    #value;
    #next = null;

    constructor(val = 0) {
        this.#value = val;
    }

    get val() {
        return this.#value;
    }

    set val(val) {
        this.#value = val;
    }

    get next() {
        return !(this.#next instanceof Node) ? null : this.#next;
    }

    set next(new_node) {
        this.#next = new_node;
    }
}

class SinglyLinkedList {
    #head = null;
    #size = 0;

    constructor(iterable = null) {
        if (iterable === null) return
        if (iterable[Symbol.iterator]) {
            for (let i of iterable) {
                this.push_back(i);
            }
        } else { this.push_back(iterable); this.#size++; }
    }

    /* ================= Size & State ================= */
    get head() {
        return this.#head;
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear(head = this.#head) {
        let curr = this.#head;
        while (curr) {
            let tmp = curr.next;
            curr.next = null;
            curr = tmp;
        }
        this.#head = null;
        this.#size = 0;
    }

    /* ================= Front Access ================= */

    front() {
        if (this.isEmpty()) throw new RangeError('List is empty');
        return this.#head;
    }

    /* ================= Push & Pop ================= */

    push_front(val) {
        let tmp = this.#head;
        this.#head = new Node(val);
        this.#head.next = tmp;
        this.#size++;
    }

    push_back(val) {
        if (this.isEmpty()) {
            this.#head = new Node(val);
            this.#size++;
        }
        else {
            let newNode = new Node(val);
            let curr = this.#head;
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = newNode
            this.#size++;
        }
    }

    pop_front() {
        if (this.isEmpty()) throw new RangeError('List is empty');
        let tmp = this.#head;
        this.#head = this.#head.next;
        this.#size--;
        return tmp;
    }

    pop_back() {
        if (this.isEmpty()) throw new RangeError('List is empty');
        if (this.#size === 1) {
            let tmp = this.#head;
            this.#head = null;
            this.#size--;
            return tmp;
        } else {
            let current = this.#head;
            let prev = current;
            while (current.next) {
                prev = current;
                current = current.next;
            }
            let tmp = prev.next;
            prev.next = null;
            this.#size--;
            return tmp;
        }
    }

    /* ================= Random-like Access ================= */

    at(index) {
        if (index < 0 || index >= this.#size) throw new RangeError('Out of range');
        let counter = 0;
        let curr = this.#head;
        while (counter++ < index) {
            curr = curr.next;
        }
        return curr;
    }

    insert(index, val) {
        if (index < 0 || index > this.size()) throw new RangeError('Out of range');
        if (index === 0) {
            this.push_front(val);
            this.#size++;
        } else if (index === this.size()) {
            this.push_back(val);
            this.#size++;
        } else {
            let counter = 1;
            let curr = this.#head;
            while (counter++ < index) {
                curr = curr.next;
            }
            let newNode = new Node(val);
            newNode.next = curr.next;
            curr.next = newNode;
            this.#size++;
        }
    }

    erase(index) {
        if (index < 0 || index > this.size()) throw new RangeError('Out of range');
        if (index === 0) this.pop_front();
        else if (index === this.size() - 1) this.pop_back();
        else {
            let curr = this.#head;
            let counter = 0;
            let prev = curr;
            while (counter++ < index) {
                prev = curr;
                curr = curr.next;
            }
            prev.next = curr.next;
            this.#size--;
        }
    }

    remove(value, equals = function (a, b) { return a === b }) {
        let index = [];
        let res = [];
        let counter = 0;
        let curr = this.#head;
        while (curr) {
            if (equals(value, curr.val)) { index.push(counter); res.push(curr.val); }
            counter++;
            curr = curr.next;
        }
        for (let i of index) {
            this.erase(i);
        }
        return res;
    }

    /* ================= Algorithms ================= */

    reverse() {
        let prev = null;
        let curr = this.#head;
        while (curr) {
            let next = curr.next;
            let tmp = curr;
            curr.next = prev;
            prev = tmp;
            curr = next;
        }
        this.#head = prev;
    }

    sort(cmp = (a, b) => a - b) {
        this.#head = this._mergeSort(this.#head, cmp);
    }

    _mergeSort(head, cmp) {
        if (!head || !head.next) return head;

        let slow = head;
        let fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let mid = slow.next;
        slow.next = null;

        let left = this._mergeSort(head, cmp);
        let right = this._mergeSort(mid, cmp);

        let dummy = new Node(null);
        let tail = dummy;
        while (left && right) {
            if (cmp(left.val, right.val) <= 0) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }
        tail.next = left || right;
        return dummy.next;
    }


    merge(list, cmp = (a, b) => a - b) {
        if (!list || list.isEmpty()) return;
        let dummy = new Node(null);
        let tail = dummy;
        let i = this.#head;
        let j = list.head;

        while (i && j) {
            if (cmp(i.val, j.val) <= 0) {
                tail.next = i;
                i = i.next;
            } else {
                tail.next = j;
                j = j.next;
            }
            tail = tail.next;
        }

        tail.next = i || j;
        this.#head = dummy.next;

        this.#size = 0;
        let curr = this.#head;
        while (curr) {
            this.#size++;
            curr = curr.next;
        }

        list.#head = null;
        list.#size = 0;
    }
    /* ================= Utilities ================= */
    sortList(a, b) {
        return a - b;
    }
    toArray() {
        let arr = new Array(this.size());
        let counter = 0;
        let curr = this.#head;
        const size = this.size()
        while (counter < size) {
            arr[counter++] = curr?.val
            curr = curr?.next;
        }
        return arr;
    }

    static fromArray(arr) {
        let list = new SinglyLinkedList();
        for (let i = 0; i < arr.length; ++i) {
            list.push_back(arr[i]);
        }
        return list;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let curr = this.#head;
        return {
            next: () => {
                if (!curr) return { value: undefined, done: true };
                let val = curr.val;
                curr = curr.next
                return { value: val, done: false };
            }
        }
    }
}
