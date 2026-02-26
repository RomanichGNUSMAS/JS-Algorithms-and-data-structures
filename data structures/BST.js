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
        while (curr) {
            parent = curr;
            if(curr.data > value && curr.left){
                curr = curr.left;
            } else if (curr.data < value && curr.right){
                curr = curr.right;
            } else break;
        }
        if(!curr) return false;
        if(!curr.left || !curr.right) {
            let child = curr.left || curr.right;
            if(!parent) parent = child;
            if(parent.left === curr) parent.left = child;
            else parent.right = child;
        }
        this.#size--;
        return true;
    }

    contains(value) {
        return !!this.inorder_itr().find(t => t === value);
    }

    /* ================= Height & Depth ================= */
    #counter (thisIS){
        if(this.is_empty()) return 0;
        let counter = 1;
        let curr = thisIS;
        while (curr) {
            curr = curr.left || curr.right;
            counter++;
        }
        return counter;
    }
    get_height(){
        return Math.max(this.#counter(this.#root.left),this.#counter(this.#root.right)) + 1;
    }

    get_depth(value) {
        if(!this.contains(value)) return -1;
        let curr = this.#root;
        let counter = 0;
        while (curr) {
            curr = curr.val > value ? curr.left : curr.right;
            counter++;
        }
        return counter;
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
        return this.#_inorder(this.#root,stack);
        // Must return values in sorted order
        // Traversal: left → root → right
        // Recursive implementation
    }

    inorder_itr() {
        // Must perform inorder traversal using stack
        // Must return sorted values
    }

    preorder_rec() {
        // Traversal: root → left → right
        // Recursive implementation
    }

    preorder_itr() {
        // Iterative preorder traversal using stack
    }

    postorder_rec() {
        // Traversal: left → right → root
        // Recursive implementation
    }

    postorder_itr() {
        // Iterative postorder traversalinorder_rec()
        // May use two stacks
    }

    /* ================= Advanced Operations ================= */

    find_successor(value) {
        // Must return inorder successor of node
        // Smallest value greater than given value
        // If none → return null
    }

    find_predecessor(value) {
        // Must return inorder predecessor of node
        // Largest value smaller than given value
    }

    is_balanced() {
        // Must return true if tree is height-balanced
        // |height(left) - height(right)| <= 1 for all nodes
    }

    validate_BST() {
        // Must verify tree satisfies BST property
        // All nodes in left subtree < node < right subtree
    }

    /* ================= Utilities ================= */

    toArray() {
        // Must return sorted array of values
        // Should use inorder traversal
    }

    clone() {
        // Must return deep copy of entire tree
        // New tree must not share nodes
    }

    equals(otherTree) {
        // Must return true if trees have identical structure AND values
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        let arr = this.inorder_rec();
        let i = 0;
        return {
            next(){
                if(i < arr.length){
                    return {value:arr[i++],done:false};
                }
                return {value:undefined,done: true};
            }
        }
    }

    values() {
        // Must return iterator of values (inorder)
    }

    entries() {
        // Must return iterator of [index, value] in sorted order
    }

    /* ================= Private Helpers ================= */

    #_insert(node, value) {
        // Recursive insertion helper
        // Must return updated subtree root
    }

    #_delete(node, value) {
        // Recursive deletion helper
        // Must return updated subtree root
    }

    #_find_min(node) {
        // Must return minimum value in subtree
    }

    #_find_max(node) {
        // Must return maximum value in subtree
    }

    #_get_height(node) {
        // Must compute subtree height recursively
    }

    #_inorder(node, result) {
        if(!node) return;
        this.#_inorder(node.left,result);
        result.push(node.data)
        this.#_inorder(node.right,result);
        return result;
    }

    #_preorder(node, result) {
        // Recursive preorder traversal helper
    }

    #_postorder(node, result) {
        // Recursive postorder traversal helper
    }
}

let tree = new BST();
tree.insert(new Node(5));
tree.insert(new Node(2));
tree.insert(new Node(3));
tree.insert(new Node(4));
for(let i of tree) console.log(i);