import { validate } from "./email-validator.js";

const textPlaceholder = "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.";

class Section {
  constructor(headerContent, subheaderContent, buttonContent) {
    this.headerContent = headerContent;
    this.subheaderContent = subheaderContent;
    this.buttonContent = buttonContent;
    this.element = document.createElement("section");
    this.create();
    return this.element;
  }

  create() {
    this.element.className = "app-section app-section--image-join";
    this.element.innerHTML = `<h2 class="app-title app-section__title--join">${this.headerContent}</h2>
                            <h3 class="app-subtitle">${this.subheaderContent}</h3>
                            <form class="app-section_form">
                                <input type="email" placeholder="Email" class="app-section__input--email">
                                <button type="submit" class="app-section__button app-section__input--subscribe">${this.buttonContent}</button>
                            </form>`;

    this.element.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e.currentTarget.querySelector("input").value);// eslint-disable-line no-console
      validate(e.currentTarget.querySelector("input").value);
    });
  }
}

class StandardSection extends Section {
  constructor() {
    super("Join our program", textPlaceholder, "Subscribe");
  }
}

class AdvancedSection extends Section {
  constructor() {
    super(
      "Join our advanced program",
      textPlaceholder,
      "Subscribe to Advanced Program",
    );
  }
}

export class SectionCreator {
  create(type) {
    switch (type) {
      case "standard":
        return new StandardSection();
      case "advanced":
        return new AdvancedSection();
      default:
        return new StandardSection();
    }
  }
}
