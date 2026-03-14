const colors = {
    RED:1,
    BLACK:0
}

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = colors.RED;
    }
}

class RBTree {
    #root;
    #nil = new Node(-1);
    constructor(val) {
        this.#root = this.#nil
    }

    insert(node,val) {
        let curr = node;
        let parentNode = this.#nil;
        while (curr !== this.#nil) {
            parentNode = curr;
            if(curr.val < val) curr = curr.right;
            else if(curr.val > val) curr = curr.left;
            else return;
        }
        const child = new Node(val);
        child.parent = parentNode;
        if(parentNode === this.#nil) this.#root = new Node(val);
        else if(parentNode.val > child.val) parentNode.left = child;
        else parentNode.right = child;
        child.color = colors.RED;
        child.left = this.#nil;
        child.right = this.#nil;
        this.#insertFixUp(curr);
    }

    #insertFixUp(node) {
        while(node.parent.color === colors.RED) {
            let gp = node.parent.parent;
            if(node.parent === gp.left) {
                let uncle = gp.right;
                if(uncle.color === colors.RED) {
                    gp.color = colors.RED;
                    uncle.color = colors.BLACK;
                    node.parent.color = colors.BLACK;
                    node = gp;
                }
                else {
                    if(node.parent.right === node) {
                        node = node.parent;
                        this.#LeftRotate(node);
                    }
                    node.parent.color = colors.BLACK;
                    gp.color = colors.RED;
                    this.#RightRotate(gp);
                }
            } else {
                let uncle = gp.left;
                if(uncle.color === colors.RED) {
                    gp.color = colors.RED;
                    uncle.color = colors.BLACK;
                    node.parent.color = colors.BLACK;
                    node = gp;
                } else {
                    if(node.parent.left === node) {
                        node = node.parent;
                        this.#RightRotate(node);
                    }
                    node.parent.color = colors.BLACK;
                    gp.color = colors.RED;
                    this.#LeftRotate(gp);
                }
            }
        }
        this.#root.color = colors.BLACK;
    }
    #LeftRotate(node) {
        let tmp = node.right;
        let tmp2 = tmp.left;
        let gp = node.parent;
        if(tmp2 !== this.#nil) tmp2.parent = node;
        tmp.left = node;
        node.right = tmp2;
        if(gp === this.#nil) this.#root = tmp;
        else if(gp.left === node) gp.left = tmp;
        else gp.right = tmp;
        tmp.parent = gp;
        node.parent = tmp;
    }

    #RightRotate(node) {
        let tmp = node.left;
        let tmp2 = tmp.right;
        let gp = node.parent;
        if (tmp2 !== this.#nil) tmp2.parent = node;
        tmp.right = node;
        node.left = tmp2;
        if(gp === this.#nil) this.#root = tmp;
        else if(gp.left === node) gp.left = tmp;
        else gp.right = tmp;
        tmp.parent = gp;
        node.parent = tmp;
    }

    delete(val) {
        this.#root = this.#delete(this.#root,val);
    }

    #delete(node,val) {
        if(!node) return null;
        if(node.val < val) node.right = this.#delete(node.left,val);
        else if(node.val > val) node.lleft = this.#delete(node.left,val);
        else {
            let min = this.#treeMinimum(node.right);
            node.val = min.val;
            node.right = this.#delete(node.right,min.val);
        }

        this.#deleteFixUp(node);
        return node;
    }
        #deleteFixUp(node) {
            while (node !== this.#root && node.color === colors.BLACK) {

                if (node === node.parent.left) {
                    let sibling = node.parent.right;

                    if (sibling.color === colors.RED) {
                        sibling.color = colors.BLACK;
                        node.parent.color = colors.RED;
                        this.#LeftRotate(node.parent);
                        sibling = node.parent.right;
                    }

                    if (sibling.left.color === colors.BLACK && sibling.right.color === colors.BLACK) {
                        sibling.color = colors.RED;
                        node = node.parent;
                    }
                    else {
                        if (sibling.right.color === colors.BLACK) {
                            sibling.left.color = colors.BLACK;
                            sibling.color = colors.RED;
                            this.#RightRotate(sibling);
                            sibling = node.parent.right;
                        }

                        sibling.color = node.parent.color;
                        node.parent.color = colors.BLACK;
                        sibling.right.color = colors.BLACK;
                        this.#LeftRotate(node.parent);
                        node = this.#root;
                    }
                }
                else {
                    let sibling = node.parent.left;

                    if (sibling.color === colors.RED) {
                        sibling.color = colors.BLACK;
                        node.parent.color = colors.RED;
                        this.#RightRotate(node.parent);
                        sibling = node.parent.left;
                    }

                    if (sibling.right.color === colors.BLACK && sibling.left.color === colors.BLACK) {
                        sibling.color = colors.RED;
                        node = node.parent;
                    }
                    else {
                        if (sibling.left.color === colors.BLACK) {
                            sibling.right.color = colors.BLACK;
                            sibling.color = colors.RED;
                            this.#LeftRotate(sibling);
                            sibling = node.parent.left;
                        }

                        sibling.color = node.parent.color;
                        node.parent.color = colors.BLACK;
                        sibling.left.color = colors.BLACK;
                        this.#RightRotate(node.parent);
                        node = this.#root;
                    }
                }
            }

            node.color = colors.BLACK;
        }
    #treeMinimum(node) {
        let curr = node;
        while(curr.left) curr = curr.left;
        return curr;
    }
}