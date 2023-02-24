export class Node {
  name: string;
  children: Node[];
  value: Number;
  count: string;

  constructor(sourceIpAddress: string, value: number, count: any){
    this.name = sourceIpAddress;
    this.children = [];
    this.value = value;
    this.count = String(count);
  }

  addNodeAsChild(node: Node){
    this.children.push(node);
  }
}
