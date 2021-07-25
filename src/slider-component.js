import { UserCard } from "./user-card-component.js";

export class Slider {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "app-section__slider--users";
    this.createSlides();
    return this.element;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsers() {
    const users = await fetch("http://localhost:8080/api/community");
    return users.json();
  }

  createSlides() {
    this.getUsers().then((users) => {
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
    });
  }
}
