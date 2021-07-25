export class Slider {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "app-section__slider--users";
    this.create();
    return this.element;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsers() {
    const users = await fetch("http://localhost:8080/api/community");
    return users.json();
  }

  create() {
    this.getUsers().then((users) => {
      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.className = "app-section__card--users";
        userCard.innerHTML = `   <img class="user-avatar" src=${user.avatar}>
        <p class="user-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.</p>
        <h5>${user.firstName} ${user.lastName}</h5>
        <p class="user-info">${user.position}</p>`;
        this.element.appendChild(userCard);
      });
    });
  }
}
