import { validate } from "./email-validator.js";
import { fetchData } from "./fetchData.js";
import { Button } from "./button-component.js";
import { Input } from "./input-component.js";

export class SubscribeForm {
  constructor(buttonText) {
    this.requestHandler = fetchData;
    this.validationHandler = validate;
    this.form = document.createElement("form");
    this.input = new Input("email", "Email", "app-section__input--email");
    this.submitBtn = new Button(
      buttonText,
      "submit",
      "app-section__button app-section__input--subscribe",
    );
    this.form.className = "app-section_form";
    this.form.appendChild(this.input);
    this.form.appendChild(this.submitBtn);
    this.setListeners();
    this.checkState();
    return this.form;
  }

  validationSuccess(isValid) {
    if (!isValid) {
      this.input.classList.add("danger");
    }
  }

  updateUI(state) {
    if (state) {
      this.input.classList.add("hidden");
      this.submitBtn.innerText = "Unsubscribe";
    } else {
      this.input.classList.remove("hidden");
      this.submitBtn.innerText = "Subscribe";
      if (state === "false") {
        this.validationSuccess();
      }
    }
    this.input.value = localStorage.getItem("email") || "";
  }

  checkState() {
    const isSubscribed = localStorage.getItem("subscription") === "true";
    this.updateUI(isSubscribed);
  }

  setListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (localStorage.getItem("subscription") === "true") {
        this.submitBtn.disabled = "true";
        fetchData(
          "http://localhost:8080/api/unsubscribe",
          "POST",
          {
            email: localStorage.getItem("email"),
          },
          (response) => {
            this.submitBtn.removeAttribute("disabled");
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error);
              });
            }
            return response;
          },
          (data) => {
            if (data.success) {
              localStorage.clear();
              this.checkState();
            }
          },
        );
      } else if (localStorage.getItem("email")) {
        const validationResult = this.validationHandler(
          localStorage.getItem("email"),
        );
        this.validationSuccess(validationResult);
        if (validationResult) {
          this.validationSuccess(validationResult);
          this.submitBtn.disabled = "true";
          this.requestHandler(
            "http://localhost:8080/api/subscribe",
            "POST",
            {
              email: localStorage.getItem("email"),
            },
            (response) => {
              this.submitBtn.removeAttribute("disabled");
              if (!response.ok) {
                return response.json().then((data) => {
                  throw new Error(data.error);
                });
              }
              return response;
            },
            (data) => {
              localStorage.setItem("subscription", data.success);
              this.checkState();
            },
          );
        } else {
          localStorage.setItem("subscription", false);
        }
      }
    });
    this.input.addEventListener("input", (e) => {
      e.stopPropagation();
      e.preventDefault();
      localStorage.setItem("email", e.target.value);
    });
    this.input.addEventListener("focus", (e) => {
      e.stopPropagation();
      e.target.classList.remove("danger");
    });
  }
}
