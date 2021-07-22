export class CommunitySection {
  constructor() {
    this.element = document.createElement("section");
    this.create();
    return this.element;
  }

  renderContent() {
    this.element.innerHTML = `<h2 class="app-title app-section__title--community">Big Community of </br>
        People Like You </h2>
     <h3 class="app-subtitle">We’re proud of our products, and we’re really excited </br> when we get feedback from our users.</h3>
     <div class="app-section__slider--users"></div>`;
  }
  async getUsers(){
      const users = await fetch("http://localhost:8080/api/community");
      return users.json();
  }

  create() {
    this.element.className = "app-section app-section--community";
    this.renderContent();
    this.getUsers()
    .then(users=>{
        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.className = "app-section__card--users"
            userCard.innerHTML = `   <img class="user-avatar" src=${user.avatar}>
                                      <h5>${user.firstName} ${user.lastName}</h5>
                                       <p>${user.position}</p>`;
           this.element.querySelector(".app-section__slider--users").appendChild(userCard);
        });
    })
}
}
