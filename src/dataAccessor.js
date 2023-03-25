export class Todo {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = "todo" + Math.random();
  }
}

export class Folder {
  constructor(title, parentID) {
    this.title = title;
    this.parentID = parentID;
    this.id = Math.random();
  }
  children = [];
  addChild(obj) {
    this.children.push(obj);
    obj.parentID = this.id;
  }
  removeChild(obj) {
    const ind = this.children.findIndex((child) => child.id == obj.id);
    this.children.splice(ind, 1);
  }
  count() {
    return this.children.length;
  }
}
