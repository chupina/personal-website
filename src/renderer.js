export class Renderer {
  constructor(node, position) {
    this.node = node;
    this.position = position;
    this.render = () => {
      document
        .querySelector(this.position)
        .insertAdjacentElement("beforebegin", this.node);
    };
    this.remove = () => {
      this.node.remove();
    };
  }
}
