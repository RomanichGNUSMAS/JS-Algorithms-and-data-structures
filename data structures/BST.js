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
        while (curr) {
            if(curr.value > value && curr.left){
                curr = curr.left;
            } else if(curr.value < value && curr.right){
                curr = curr.right;
            } else break
        }
        if(curr.value > value) curr.left = new Node(value);
        if(curr.value < value) curr.right = new Node(value);
        this.#size++;
    }

    delete(value) {
        // Must remove node with given value if exists
        // Must preserve BST structure
        // Must correctly handle 3 cases:
        //   1) Leaf node
        //   2) Node with one child
        //   3) Node with two children
        // Must decrease size if node removed
    }

    contains(value) {
        // Must return true if value exists in tree
        // Otherwise false
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
        return Math.max(this.#counter(this.#root.left),this.#counter(this.#root.right));
    }

    get_depth(value) {
        // Must return distance from root to node
        // Root depth = 0
        // If value not found → return -1
    }

    /* ================= Min / Max ================= */

    find_min() {
        // Must return smallest value in tree
        // If empty → return undefined or throw
        // Must traverse leftmost path
    }

    find_max() {
        // Must return largest value in tree
        // If empty → return undefined or throw
        // Must traverse rightmost path
    }

    /* ================= Traversals ================= */

    level_order() {
        // Must return array of values using BFS
        // Must use queue
        // Order: level by level from root
    }

    inorder_rec() {
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
        // Iterative postorder traversal
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
        // Must iterate tree in inorder (sorted order)
        // Must not modify tree
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
        // Recursive inorder traversal helper
    }

    #_preorder(node, result) {
        // Recursive preorder traversal helper
    }

    #_postorder(node, result) {
        // Recursive postorder traversal helper
    }
}