export class Node {
  name: string;
  children: Node[];
  value: number;
  count: string;
  level: number;

  constructor(sourceIpAddress: string, value: number, count: any, level: number){
    this.name = sourceIpAddress;
    this.children = [];
    this.value = value;
    this.count = String(count);
    this.level = level;
  }

  addIpObjListAsChildren(ipObjList: {ip: string, count: number}[]): void{
    let level = this.level+1;
    let value = this.value/2;
    for(let ipObj of ipObjList){
      let node = new Node(ipObj['ip'], value, ipObj['count'], level);
      this.children.push(node);
    }
  }

  static addChildrenToGraph(currentRoot: Node, ipObjListToAdd: {ip: string, count: number}[], parentNodeObj: {ip: string, level: number}): Node{
    let parentNode = new Node(parentNodeObj.ip, 10, 100, parentNodeObj.level);

    Node.levelOrderTraverse(currentRoot, ipObjListToAdd, parentNode);

    return currentRoot;
  }

  static levelOrderTraverse(currentNode: Node, childrenToAdd: {ip: string, count: number}[], parentNode: Node): void {
    if(currentNode.level > parentNode.level){
      return;
    }
    else if(currentNode.level == parentNode.level){
      if(currentNode.name == parentNode.name){
        currentNode.addIpObjListAsChildren(childrenToAdd);
      }

      return;
    }
    else{
      for(let currentChild of currentNode.children){
        this.levelOrderTraverse(currentChild, childrenToAdd, parentNode);
      }
    }
  }
}
