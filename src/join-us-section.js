import { validate } from "./email-validator.js";

const textPlaceholder =
  "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.";

const setInputValue = (inputEl) => {
  localStorage.setItem("email", inputEl.value);
};
const getInputValue = (inputEl, data) => {
  if (!localStorage.getItem(data)) {
    inputEl.value = "";
  } else {
    inputEl.value = localStorage.getItem(data);
  }
};

class Section {
  constructor(headerContent, subheaderContent, buttonContent) {
    this.headerContent = headerContent;
    this.subheaderContent = subheaderContent;
    this.buttonContent = buttonContent;
    this.element = document.createElement("section");
    this.create();
    return this.element;
  }

  renderContent(state) {
    this.element.innerHTML = `<h2 class="app-title app-section__title--join">${this.headerContent}</h2>
     <h3 class="app-subtitle">${this.subheaderContent}</h3>
     <form class="app-section_form">
         <input type="email" name="email" placeholder="Email" class="app-section__input--email ${state === "true" ? "hidden" : " "}">
         <button type="submit" class="app-section__button app-section__input--subscribe">${state === "true" ? "unsubscribe" : this.buttonContent}</button>
     </form>`;

    getInputValue(this.element.querySelector("input"), "email");
    this.element.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (localStorage.getItem("subscription") === "true") {
        localStorage.clear();
      } else if (localStorage.getItem("email")) {
        const validationResult = validate(localStorage.getItem("email"));
        localStorage.setItem("subscription", validationResult);
        console.log(e.currentTarget.querySelector("input").value); // eslint-disable-line no-console
      } else {
        e.currentTarget.querySelector("input").classList.add("danger");
      }
      this.renderContent(localStorage.getItem("subscription"));
    });
    this.element.querySelector("input").addEventListener("input", (e) => {
      e.stopPropagation();
      e.preventDefault();
      setInputValue(e.target);
    });
  }

  create() {
    this.element.className = "app-section app-section--image-join";
    this.renderContent(localStorage.getItem("subscription"));
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
      "Subscribe to Advanced Program"
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
