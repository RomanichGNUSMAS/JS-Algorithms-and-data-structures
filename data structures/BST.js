class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    #root;
    #size;

    constructor() {
        this.#size = 0;
        this.#root = null;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    clear(){
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Insert / Delete ================= */

    insert(value) {
        if(value instanceof Node) value = value.value;
        let curr = this.#root;
        if(!this.#root){
            this.#root = new Node(value);
            this.#size++;
            return;
        }
        let p = null;
        while (curr) {
            p = curr;
            if(curr.data > value && curr.left){
                curr = curr.left;
            } else if(curr.data < value && curr.right){
                curr = curr.right;
            } else break;
        }
        if(p.data > value) p.left = new Node(value);
        else p.right = new Node(value);
        this.#size++;
    }

    delete(value) {
        if(!value) return false;
        let curr = this.#root;
        let parent = null;
        while (curr && curr.data !== value) {
            parent = curr;
            if(curr.data > value){
                curr = curr.left;
            } else if (curr.data < value){
                curr = curr.right;
            } else break;
        }
        if(!curr) return false;
        if(!curr.left || !curr.right){
            let child = curr.left || curr.right;
            if(!parent) {
                this.#root = child;
            }
            else if (parent.left === curr) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        }
        else {
                let Scurr = curr.right;
                let Sparent = curr;
                while(Scurr?.left){
                    Sparent = Scurr;
                    Scurr = Scurr.left;
                }
                curr.data = Scurr.data;
                if(!Scurr.left || !Scurr.right){
                    if(Sparent.left === Scurr){
                        Sparent.left = Scurr.left || Scurr.right;
                    }
                    else {
                        Sparent.right = Scurr.left || Scurr.right;
                    }
                }
        }
        this.#size--;
        return true;
    }

    contains(value) {
        let curr = this.#root;
        while(curr && curr.data !== value) {
            if(curr.data > value) curr = curr.left;
            else if(curr.data < value) curr = curr.right;
            else break;
        }
        return !!curr ? value : -1;
    }

    /* ================= Height & Depth ================= */
    get_height(){
        return this.#_get_height(this.#root);
    }

    get_depth(value) {
        let curr = this.#root;
        let counter = 0;
        while (curr) {
            if(curr.data > value) {
                curr = curr.left
                counter++;
            }
            else if(curr.data < value) {
                curr = curr.right;
                counter++;
            } else break
        }
        return !!curr ? counter : -1;
    }

    /* ================= Min / Max ================= */

    find_min() {
        if (this.is_empty()) throw new RangeError('Out of Range');
        let curr = this.#root;
        while(curr) curr = curr.left
        return curr.data;
    }

    find_max() {
        if (this.is_empty()) throw new RangeError('Out of Range');
        let curr = this.#root;
        while(curr) curr = curr.right
        return curr.data;
    }

    /* ================= Traversals ================= */

    level_order() {
        if(!this.#root) return;
        const Queue = require('./Queue');
        let q = new Queue(1000);
        q.enqueue(this.#root);
        const stack = [];
        while(!q.is_empty()) {
            let lvl = q.size();
            for(let i = 0;i < lvl;++i){
                const node = q.dequeue();
                stack.push(node.data);
                if(node.left) q.enqueue(node.left);
                if(node.right) q.enqueue(node.right);
            }
        }
        return stack.reverse();
    }

    inorder_rec() {
        if(!this.#root) return;
        const stack = [];
        this.#_inorder(this.#root,stack);
        return stack;
    }

    inorder_itr() {
        const result = new Array();
        const stack = new Array();
        let curr = this.#root;
        while(curr || stack.length) {
            while(curr) {
                stack.push(curr.data);
                curr = curr.left;
            }

            curr = stack.pop();
            result.push(curr.data);
            curr = curr.right;
        }
        return result;
    }

    preorder_rec() {
        const stack = [];
        this.#_preorder(this.#root,stack);
        return stack;
    }

    preorder_itr() {
       if(!this.#root) return;
       const [res,stack] = [[this.#root] ,[]];
       while(stack.length) {
           const node = stack.pop();
           res.push(node.data);
           if(node.right) stack.push(node.right);
           if(node.left) stack.push(node.left);
       }
       return res;
    }

    postorder_rec() {
        const stack = [];
        this.#_postorder(this.#root,stack);
        return stack;
    }

    postorder_itr() {
        if(!this.#root) return;
        const [stack,res] = [[this.#root] ,[]];
        while(stack.length) {
            const node = stack.pop();
            res.push(node.data);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }
        return res.reverse();
    }

    /* ================= Advanced Operations ================= */

    find_successor(value) {
        if(!this.#root) return;
        let curr = this.#root;
        let ancestor = null;
        while(curr && curr.data !== value) {
            if(curr.data > value) {
                ancestor = curr;
                curr = curr.left;
            }
            else if(curr.data < value) curr = curr.right;
            else break;
        }
        if(!curr) return -1;
        let successor = curr.right;
        if(successor) {
            while(successor?.left) successor = successor.left;
            return successor.data;
        }
        return ancestor ? ancestor.data : -1;
    }

    find_predecessor(value) {
        if(!this.#root) return;
        let curr = this.#root;
        let ancestor = null;
        while(curr && curr.data !== value) {
            if(curr.data > value) curr = curr.left;
            else if(curr.data < value) {
                ancestor = curr;
                curr = curr.right;
            }
            else break;
        }
        if(!curr) return -1;
        let predecessor = curr.left;
        if(predecessor) {
            while(predecessor?.right) predecessor = predecessor.right;
            return predecessor.data;
        }
        return ancestor ? ancestor.data : -1;
    }

    is_balanced() {
        return Math.abs(this.#_get_height(this.#root.left) - this.#_get_height(this.#root.right)) <= 1;
    }

    validate_BST() {
        let inorder = this.inorder_rec();
        for(let i = 0;i < inorder.length - 1;++i){
            if(inorder[i] > inorder[i+1]) return 'invalid';
        }
        return 'valid'
    }

    /* ================= Utilities ================= */

    toArray() {
        return this.inorder_rec();
    }

    clone() {
        let newTree = new BST();
        newTree.#root = this.#clone(this.#root);
        newTree.#size = this.#size;
        return newTree;
    }

    equals(otherTree) {
        if(!otherTree || otherTree.#size !== this.#size) return false;
        return this.#equals(otherTree.#root, this.#root);
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let arr = this.inorder_rec();
        let i = 0;
        return {
            next: () => {
                if(i < arr.length){
                    return {value:arr[i++],done:false};
                }
                return {value:undefined,done: true};
            }
        }
    }

    *values() {
        yield* this.inorder_itr();
    }

    *entries() {
        let inorder = this.inorder_itr();
        for(let i = 0;i < inorder.length;++i) {
            yield [i,inorder[i]];
        }
    }

    /* ================= Private Helpers ================= */

    #_get_height(node) {
        if(!node) return 0;
        let left = this.#_get_height(node.left) + 1;
        let right = this.#_get_height(node.right) + 1;
        return Math.max(left, right);
    }

    #_inorder(node, result) {
        if(!node) return;
        this.#_inorder(node.left,result);
        result.push(node.data)
        this.#_inorder(node.right,result);
    }

    #_preorder(node, result) {
        if(!node) return;
        result.push(node.data);
        this.#_preorder(node.left,result);
        this.#_preorder(node.right,result);
    }

    #_postorder(node, result) {
        if(!node) return;
        this.#_postorder(node.left,result);
        this.#_postorder(node.right,result);
        result.push(node.data);
    }

    #clone(node) {
        if(!node) return null;
        let cloneNode = new Node(node.data);
        cloneNode.left = this.#clone(node.left);
        cloneNode.right = this.#clone(node.right);
        return cloneNode;
    }

    #equals(a,b) {
        if(!a && !b) return true;
        if(!a || !b) return false;
        if(a.data !== b.data) return false;
        return this.#equals(a,b);
    }
}

let tree = new BST();
tree.insert(5);
tree.insert(2);
tree.insert(3);
tree.insert(4);
let tree2 = new BST();
tree2.insert(5);
tree2.insert(2);

console.log(tree.equals(tree2))