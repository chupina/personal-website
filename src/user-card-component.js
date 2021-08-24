export class UserCard {
  constructor(avatar, firstName, lastName, position) {
    this.element = document.createElement("div");
    this.element.className = "app-section__card--users";
    this.element.innerHTML = `<img width="150" height="150" class="user-avatar" alt="user avatar" src=${avatar}>
    <p class="user-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.</p>
    <h5>${firstName} ${lastName}</h5>
    <p class="user-info">${position}</p>`;
    return this.element;
  }
}
