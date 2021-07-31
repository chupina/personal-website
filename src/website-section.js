export class WebsiteSection extends HTMLElement {
  constructor() {
    super();
    this.type = this.dataset.sectiontype;
    const template = document.getElementById(`section-${this.type}-template`).content;
    this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));
  }
}
