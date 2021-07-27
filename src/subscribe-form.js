import { validate } from "./email-validator.js";
import { UsersAPI } from "./fetchData.js";
import { Button } from "./button-component.js";
import { Input } from "./input-component.js";

export class SubscribeForm {
  constructor(buttonText) {
    this.requestHandler = UsersAPI;
    this.validationHandler = validate;
    this.input = new Input("email", "Email", "app-section__input--email");
    this.submitBtn = new Button(
      buttonText,
      "submit",
      "app-section__button app-section__input--subscribe",
    );
    this.form = document.createElement("form");
    this.form.className = "app-section_form";
    this.form.appendChild(this.input);
    this.form.appendChild(this.submitBtn);
    this.setListeners();
    this.checkState();
    return this.form;
  }

  isFetching(status) {
    status
      ? this.submitBtn.setAttribute("disabled", "true")
      : this.submitBtn.removeAttribute("disabled");
    // console.log(this.submitBtn.attributes);
  }

  isValid(status) {
    status
      ? this.input.classList.remove("danger")
      : this.input.classList.add("danger");
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
        this.isFetching(true);
        this.requestHandler
          .unsubscribe()
          .then((data) => {
            if (data.success) {
              localStorage.clear();
              this.checkState();
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-alert
            alert(error);
          })
          .finally(() => {
            this.isFetching(false);
          });
      } else if (localStorage.getItem("email")) {
        const validationResult = this.validationHandler(
          localStorage.getItem("email"),
        );
        this.isValid(validationResult);
        if (validationResult) {
          this.isFetching(true);
          this.requestHandler
            .subscribe(localStorage.getItem("email"))
            .then((data) => {
              localStorage.setItem("subscription", data.success);
              this.checkState();
            })
            .catch((error) => {
              // eslint-disable-next-line no-alert
              alert(error);
            })
            .finally(() => {
              this.isFetching(false);
            });
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
