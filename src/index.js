import "./styles/style.css";
import { SectionCreator } from "./join-us-section.js";

class Renderer {
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

const sectionFactory = new SectionCreator();
const standardSection = sectionFactory.create("standard");
const sectionRenderer = new Renderer(standardSection, "footer");
window.addEventListener("load", sectionRenderer.render);
