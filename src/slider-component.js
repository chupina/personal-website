import { UserCard } from "./user-card-component.js";
import { UsersAPI } from "./fetchData.js";

export class Slider {
  constructor() {
    this.requestHandler = UsersAPI;
    this.element = document.createElement("div");
    this.element.className = "app-section__slider--users";
    this.createSlides();
    return this.element;
  }

  createSlides() {
    this.requestHandler
      .getUsers()
      .then((users) => {
        users.forEach((user) => {
          this.element.appendChild(
            new UserCard(
              user.avatar,
              user.firstName,
              user.lastName,
              user.position,
            ),
          );
        });
      })
      .catch((error) => {
        this.element.innerHTML = "<h2>OOOPS...Something went wrong</h2>";
        console.log(error);
      });
  }
}
