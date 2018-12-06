export function Node(name){
    this.parent = null;
    this.pre = null;
    this.next = null;
    this.children = new Array();
    this.name = name;
    this.des = "";
};
Node.prototype.setDes = function(des){
    this.des = des;
}