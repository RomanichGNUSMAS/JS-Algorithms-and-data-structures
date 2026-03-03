class Node {

    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {
    #root;
    #size = 0;

    constructor() {
        this.#root = null;
        this.#size = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    is_empty() {
        return this.#size === 0;
    }

    clear() {
        this.#size = 0;
        this.#root = null;
    }

    /* ================= Core AVL Operations ================= */

    insert(value) {
        this.#root = this.#insert(this.#root, value);
    }

    delete(value) {
        // Must remove node if exists
        // Must rebalance tree after deletion
        // Must update heights
        // Must decrease size if removed
    }

    search(value) {
        if(this.is_empty()) return false;
        let curr = this.#root;
        while(curr) {
            if(curr.value < value) curr = curr.right;
            else if(curr.value > value) curr = curr.left;
            else break;
        }
        return !!curr;
    }

    /* ================= Height / Min / Max ================= */

    getHeight() {
        return this.#getHeight(this.#root);
    }

    getMin() {
        return this.#getMin(this.#root);
    }

    getMax() {
        return this.#getMax(this.#root);
    }

    /* ================= Traversals ================= */

    levelOrder() {
        if(!this.#root) return [];
        const [res,queue] = [[],[this.#root]];
        while(queue.length) {
            const lvl = queue.length;
            for(let i = 0;i < lvl;i++){
                const node = queue.shift();
                res.push(node.value);
                if(node.left) queue.push(node.left);
                if(node.right) queue.push(node.right);
            }
        }
        return res;
    }

    preorder_rec() {
        const stack = [];
        this.#preorder_rec(stack);
        return stack;
    }

    preorder_itr() {
        if(!this.#root) return [];
        const [res,stack] = [[],[this.#root]];
        while(stack.length) {
            const node = stack.pop();
            res.push(node.value);
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }
        return res;
    }

    inorder_rec() {
        const stack = [];
        this.#inorder_rec(this.#root,stack);
        return stack;
    }

    inorder_itr() {
        if(!this.#root) return [];
        let curr = this.#root;
        const [res,stack] = [[],[]];
        while(curr || stack.length) {
            while(curr) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();
            res.push(curr.value);
            curr = curr.right;
        }
        return res;
    }

    postorder_rec() {
        const res = [];
        this.#postorder_rec(this.#root,res);
        return res;
    }

    postorder_itr() {
        if(!this.#root) return [];
        const [stack,res] = [[],[this.#root]];
        while(stack.length) {
            const node = stack.pop();
            res.push(node.value);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }
        return res.reverse();
    }

    /* ================= AVL Balancing ================= */

    #insert(node, value) {
        if(!node)  {
            this.#size++;
            return value !== undefined ? new Node(value) : null;
        }
        if(node.value < value) {
            node.right = this.#insert(node.right, value);
        } else if(node.value > value) {
            node.left = this.#insert(node.left, value);
        }
        node.height = 1 + Math.max(this.#getHeight(node.left),this.#getHeight(node.right));
        return this.#reBalance(node);
    }

    #delete(node, value) {
        // Recursive deletion helper
        // Must handle:
        //   leaf node
        //   node with one child
        //   node with two children (successor replacement)
        // Must rebalance subtree
        // Must return updated subtree root
    }

    #reBalance(node) {
        if(!node) return null;
        const bf = this.#balanceFactor(node);
        if(bf > 1) {
            const childBF = this.#balanceFactor(node.left);
            if(childBF >= 0) return this.#rotateRight(node);
            else if(childBF <= -1) {
                node.left = this.#rotateLeft(node.left);
                return this.#rotateRight(node)
            }
        } else if(bf < -1) {
            const childBF = this.#balanceFactor(node.right);
            if(childBF <= -1) return this.#rotateLeft(node);
            else if(childBF >= 0) {
                node.right = this.#rotateRight(node.right);
                return this.#rotateLeft(node);
            }
        }
        return node;
    }

    #balanceFactor(node) {
        if(!node) return 0;
        return this.#getHeight(node.left) - this.#getHeight(node.right);
    }

    #rotateLeft(node) {
        if(!node) return null;
        let tmp = node.right;
        let tmp2 = tmp.left;
        tmp.left = node;
        node.right = tmp2;

        node.height = this.#getHeight(node);
        tmp.height = this.#getHeight(tmp);
        return tmp;
    }

    #rotateRight(node) {
        if(!node) return;
        let tmp = node.left;
        let tmp2 = tmp.right;
        tmp.right = node;
        node.left = tmp2;

        node.height = this.#getHeight(node);
        tmp.height = this.#getHeight(tmp);
        return tmp;
    }

    #getHeight(node) {
        return node ? node.height : 0;
    }

    /* ================= BST Helpers ================= */

    #getMin(node) {
        if(!node) return null;
        if(!node.left) return node;
        return this.#getMin(node.left);
    }

    #getMax(node) {
        if(!node) return null;
        if(!node.right) return node;
        return this.#getMax(node.right);
    }

    /* ================= DFS Helpers ================= */

    #preorder_rec(node, res) {
        if(!node) return;
        res.push(node.value);
        this.#preorder_rec(node.left, res);
        this.#preorder_rec(node.right, res);
    }

    #inorder_rec(node, res) {
        if(!node) return;
        this.#inorder_rec(node.left, res);
        res.push(node.value);
        this.#inorder_rec(node.right, res);
    }

    #postorder_rec(node, res) {
        if(!node) return;
        this.#postorder_rec(node.left, res);
        this.#postorder_rec(node.right, res);
        res.push(node.value)
    }

    #equals(a,b) {
        if(!a && !b) return true;
        if(!a || !b) return false;
        if(a.value !== b.value) return false;
        return this.#equals(b.left,a.left) && this.#equals(b.right,a.right);
    }

    #clone(node) {
        if(!node) return node;
        let tree = new Node(node.value);
        tree.height = node.height;
        tree.left = this.#clone(node.left);
        tree.right = this.#clone(node.right);
        return tree;
    }
    /* ================= Advanced AVL Utilities ================= */

    isBalanced() {
        const bf = this.#balanceFactor(this.#root);
        return bf <= 1 && bf >= -1;
    }

    validateBST() {
        const inorder = this.inorder_itr();
        for(let i = 0;i < inorder.length;++i){
            if(inorder[i] > inorder[i+1]) return false;
        }
        return true;
    }

    findSuccessor(value) {
        let curr = this.#root;
        let successor = null;
        while(curr) {
            if(curr.value < value) curr = curr.right;
            else if(curr.value > value) {
                successor = curr;
                curr = curr.left;
            }
            else {
                if(curr.right) return this.#getMin(curr.right);
                break;
            }
        }
        return successor;
    }

    findPredecessor(value) {
        let curr = this.#root;
        let predecessor = null;
        while(curr) {
            if(curr.value > value) curr = curr.left;
            else if(curr.value < value) {
                predecessor = curr;
                curr = curr.right;
            }
            else {
                if(curr.left) return this.#getMax(curr.left);
                break
            }
        }
        return predecessor;
    }

    toArray() {
        return this.inorder_itr();
    }

    clone() {
        let tree = new AVL();
        tree.#root = this.#clone(this.#root);
        tree.#size = this.#size;
        return tree;
    }

    equals(otherTree) {
        if (!otherTree || !(otherTree instanceof AVL)) return false;
        if (otherTree.size() !== this.#size) return false;
        return this.#equals(otherTree.#root, this.#root);
    }

    /* ================= Iteration ================= */

    [Symbol.iterator]() {
        const inorder = this.inorder_itr();
        let i = 0;
        return {
            next: () => {
                if(i >= inorder.length) return {done:true};
                return {value:inorder[i++],done:false};
            }
        }
    }

    *values() {
        yield* this.inorder_itr();
    }

    *entries() {
        const inorder = this.inorder_itr();
        for(let i = 0;i < inorder.length;++i){
            yield [i,inorder[i]];
        }
    }
}