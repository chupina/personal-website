export class Renderer {
  constructor(node, selector) {
    this.node = node;
      this.selector = selector;
    this.render = () => {
      document
        .querySelector(this.selector)
        .appendChild(this.node);
    };
    this.remove = () => {
      this.node.remove();
    };
  }
}
