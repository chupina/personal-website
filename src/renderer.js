export class Renderer {
  constructor(node, position, selector) {
    this.node = node;
    this.position = position;
    this.selector = selector;
    this.render = () => {
      document
        .querySelector(this.selector)
        .insertAdjacentElement(position, this.node);
    };
    this.remove = () => {
      this.node.remove();
    };
  }
}
