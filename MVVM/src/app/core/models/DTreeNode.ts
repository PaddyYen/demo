export class DTreeNode {
    id?: string;
    name: string;
    iconType: number;
    children: Array<any>;
  
    constructor(id?: string, name?: string,  iconType?: number, children?:Array<any>) {
      this.id = id;
      this.name = name;
      this.iconType = iconType;
      this.children = children;
    }
  }