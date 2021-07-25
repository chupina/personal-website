export class BaseSection {
  constructor(headerContent, subheaderContent, classModifierName) {
    this.headerContent = headerContent;
    this.subheaderContent = subheaderContent;
    this.classModifierName = classModifierName;
    this.element = document.createElement("section");
    this.element.className = `app-section app-section--${this.classModifierName}`;
    this.element.innerHTML = `<h2 class="app-title app-section__title--${this.classModifierName}">${this.headerContent}</h2>
       <h3 class="app-subtitle">${this.subheaderContent}</h3>`;
    return this.element;
  }
}
