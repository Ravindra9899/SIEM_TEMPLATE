export class Node {
  //to containg the ip address
  name: string;
  children: Node[];
  value: number;

  //setting the count to string as for the central root node, count: Source Ip Address
  count: string;
  level: number;
  childrenAlreadyFetched: boolean;

  constructor(sourceIpAddress: string, value: number, count: string, level: number){
    this.name = sourceIpAddress;
    this.children = [];
    this.value = value;
    this.count = String(count);
    this.level = level;
    this.childrenAlreadyFetched = false;
  }

  addIpObjListAsChildren(ipObjList: {ip: string, count: number}[]): void{
    let level = this.level+1;
    //decrasing the value will result to smaller circles
    let value = this.value/2;
    for(let ipObj of ipObjList){
      let node = new Node(ipObj['ip'], value, String(ipObj['count']), level);
      this.children.push(node);
    }
    this.childrenAlreadyFetched = true;
  }

  static addChildrenToGraph(currentRoot: Node, ipObjListToAdd: {ip: string, count: number}[], parentNodeObj: {ip: string, level: number}): Node{
    //making a parent node, count and value doesn't matter here
    let parentNode = new Node(parentNodeObj.ip, 1, '', parentNodeObj.level);

    Node.levelOrderTraverse(currentRoot, ipObjListToAdd, parentNode);

    return currentRoot;
  }

  // a recursive method(tree traversal) to add the 'childrenToAdd' as the children of 'parentNode'
  static levelOrderTraverse(currentNode: Node, childrenToAdd: {ip: string, count: number}[], parentNode: Node): void {
    //will return if gone deeper in the tree than required
    if(currentNode.level > parentNode.level){
      return;
    }
    else if(currentNode.level == parentNode.level){
      if(currentNode.name == parentNode.name){
        //will add child if found the parent
        currentNode.addIpObjListAsChildren(childrenToAdd);
      }

      //after adding the child return
      return;
    }
    else{
      //will explore every children
      for(let currentChild of currentNode.children){
        this.levelOrderTraverse(currentChild, childrenToAdd, parentNode);
      }
    }
  }
}
