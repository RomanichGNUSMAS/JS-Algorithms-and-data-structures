function ListNode(key,val) {
    this.key = key;
    this.val = val;
    this.next = null;
}
class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 16, loadFactor = 0.75) {
        this.#table = new Array(capacity).fill(null);
        this.#capacity = capacity;
        this.#size = 0;
        this.#loadFactor = loadFactor
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#table.fill(null);
        this.#size = 0;
    }

    /* ================= Hashing ================= */

    #hash(key) {
        let total = 0;
        
        if(typeof key === 'number') {
            total = `${key}`.split('')
                .map(Number)
                .reduce((a,t) => a + t);
        } else if (typeof key === 'string') {
            total = key.split('')
                .reduce((a,t) => a + t.charCodeAt(0),0);
        } else {
            throw new TypeError('this type isn\'t supported');
        }
        return total % this.capacity();
    }

    /* ================= Core Operations ================= */

    put(key, value) {
        let hashed = this.#hash(key);
        let node = this.#table[hashed];
        while(node) {
            if(node.key === key) {
                node.val = value;
                return;
            }
            node = node.next;
        }
        const newNode = new ListNode(key,value);
        newNode.next = this.#table[hashed];
        this.#table[hashed] = newNode;
        this.#size++;
        if(this.#loadFactor <= this.loadFactor()) this.#resize(this.#capacity * 2);
    }

    get(key) {
        let hashed = this.#hash(key);
        let node = this.#table[hashed];
        while(node) {
            if(node.key === key) return {key,val:node.val};
            node = node.next;
        }
    }

    remove(key) {
        let hashed = this.#hash(key);
        let node = this.#table[hashed];
        let prev = null;
        while(node) {
            if(node.key == key) {
                let val = {key,val:node.val};
                if(!prev) {
                    this.#table[hashed] = node.next;
                } else {
                    prev.next = node.next;
                }
                this.#size--;
                return val;
            }
            prev = node;
            node = node.next;
        }
        throw new Error("Not found");
    }

    containsKey(key) {
        if(this.get(key)) return true;
        return false;
    }

    containsValue(value) {
        for(let i of this.#table) {
            let node = i;
            while(node) {
                if(node.val === value) return true;
                node = node.next;
            } 
        }
        return false;
    }

    /* ================= Resize / Rehash ================= */

    #resize(newCapacity) {
        const old = this.#table;
        this.#capacity = newCapacity;
        this.#table = new Array(this.#capacity).fill(null);
        this.#size = 0;
        for(let i of old) {
            if(!i) continue;
            let node = i;
            while(node) {
                this.put(node.key,node.val);
                node = node.next;
            }
        }
    }

    loadFactor() {
        return this.#size / this.#capacity;
    }

    /* ================= Entry Views ================= */

    *keys() {
        const arr = [];
        for(let i of this.#table){
            if(!i) continue;
            let node = i;
            while(node) {
                arr.push(node.key);
                node = node.next;
            }
        }
        yield* arr;
    }

    *values() {
        const arr = [];
        for(let i of this.#table){
            if(!i) continue;
            let node = i;
            while(node) {
                arr.push(node.val);
                node = node.next;
            }
        }
        yield* arr;
    }

    *entries() {
        const arr = [];
        for(let i of this.#table){
            if(!i) continue;
            let node = i;
            while(node) {
                arr.push([node.key,node.val]);
                node = node.next;
            }
        }
        yield* arr;
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        return this.entries();
    }

    /* ================= Utility Operations ================= */

    toObject() {
        const ob = {};
        for(let i in this.#table) {
            if(!i) continue;
            let node = this.#table[i];
            ob[i] = {};
            while(node) {
                ob[i][node.key] = node.val;
                node = node.next;
            }    
        }
        return ob;
    }

    clone() {
        const hash = new HashTable(this.#capacity,this.#loadFactor);
        for(let [key,val] of this) {
            hash.put(key,val);
        }
        return hash;
    }

    equals(otherTable) {
        if(this.#size !== otherTable.size()) return false;
        for(let [key,val] of this) {
            if(!otherTable.containsKey(key) || !otherTable.get(key).val !== val) return false;
        }
        return true;
    }   

    /* ================= Debug / Visualization ================= */

    bucketSizes() {
        return this.#table.map(list => {
            let curr = list;
            let count = 0;
            while(curr) {
                count++;
                curr = curr.next;
            }
            return count;
        })
    }

    print() {
        for(let i in this.#table) {
            let node = this.#table[i];
            let str = `Bucket ${i} ->`
            while(node) {
                str += ` [${node.key + ':' + node.val}] ->`;
                node = node.next;
            }
            console.log(str + 'null');
        }
    }
}

