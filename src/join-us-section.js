import { validate } from "./email-validator.js";
import { setValue, getValue } from "./storage-connect";

class Section {
  constructor(headerContent, subheaderContent, buttonContent) {
    this.headerContent = headerContent;
    this.subheaderContent = subheaderContent;
    this.buttonContent = buttonContent;
    this.element = document.createElement("section");
    this.create();
    return this.element;
  }

  renderContent() {
    this.element.innerHTML = `<h2 class="app-title app-section__title--join">${this.headerContent}</h2>
     <h3 class="app-subtitle">${this.subheaderContent}</h3>
     <form class="app-section_form">
         <input type="email" name="email" placeholder="Email" class="app-section__input--email" autofocus>
         <button type="submit" class="app-section__button app-section__input--subscribe">${this.buttonContent}</button>
     </form>`;
    this.subscribeForm = this.element.querySelector("form");
    this.emailInput = this.element.querySelector(".app-section__input--email");
    this.submitButton = this.element.querySelector(
      ".app-section__input--subscribe"
    );
  }

  updateUI(state) {
    if (state === "true") {
      this.emailInput.classList.add("hidden");
      this.emailInput.classList.remove("danger");
      this.submitButton.textContent = "Unsubscribe";
    } else {
      this.emailInput.classList.remove("hidden");
      this.submitButton.textContent = this.buttonContent;
      if (state === "false") {
        this.emailInput.classList.add("danger");
      }
    }
    getValue(this.emailInput, "email");
  }

  checkState() {
    const isSubscribed = localStorage.getItem("subscription");
    this.updateUI(isSubscribed);
  }
  // Request sender? Subscribe/ unsubscribe/ getUserList
  //SuccerHandler
  //ErrorHandler
  
  create() {
    this.element.className = "app-section app-section--image-join";
    this.renderContent();
    this.checkState();
    getValue(this.emailInput, "email");

    this.subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (localStorage.getItem("subscription") === "true") {
        fetch("http://localhost:8080/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: " " }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.clear();
              this.checkState();
            }
          });
        // localStorage.clear();
        // this.checkState();
      }
      if (localStorage.getItem("email")) {
        const validationResult = validate(localStorage.getItem("email"));
        if (validationResult) {
          this.submitButton.disabled = "true";
          fetch("http://localhost:8080/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: localStorage.getItem("email") }),
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("subscription", data.success);
              this.submitButton.removeAttribute("disabled");
              this.checkState();
            });
        } else {
          localStorage.setItem("subscription", false);
          this.checkState();
        }
      }

      console.log(this.emailInput.value); // eslint-disable-line no-console
    });

    this.emailInput.addEventListener("input", (e) => {
      e.stopPropagation();
      e.preventDefault();
      setValue(e.target, "email");
    });
    this.emailInput.addEventListener("focus", (e) => {
      e.stopPropagation();
      e.target.classList.remove("danger");
    });
  }
}

class StandardSection extends Section {
  constructor() {
    super(
      "Join our program",
      "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.",
      "Subscribe"
    );
  }
}

class AdvancedSection extends Section {
  constructor() {
    super(
      "Join our advanced program",
      "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.",
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
