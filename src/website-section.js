const elementStyle = `<style>
:host {
  display: flex;
  align-items: center;
   justify-content: center;
  flex-direction: column;
  font: normal 16px "Source Sans Pro", sans-serif, Arial;
}
:host .app-title{ 
  font-size: 3.25rem;
  line-height: 3.2rem;
  text-align: center;
  font-family: "Oswald", sans-serif;
 }
:host .app-subtitle{ 
  font-size: 1.5rem;
  line-height: 1.625rem;
  font-weight: 300;
  text-align: center;
 }
:host article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 90px;
  margin: 0 140px;
}
:host button {
  background-color: #55c2d8;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
}
:host .section-button{
  border-radius: 26px;
  font-size: 14px;
  height: 46px;
  letter-spacing: 1.2px;
  margin: 60px auto 108px;
  text-transform: uppercase;
  width: 135px;
}
:host .media-button{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 64px auto;
  padding: 0;
  font-size: 4rem;
}
</style>`;

export class WebsiteSection extends HTMLElement {
  constructor() {
    super();
    this.type = this.dataset.sectiontype;
    this.sectionTitle = this.dataset.title;
    this.sectionDescription = this.dataset.description;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    switch (this.type) {
      case "logo":
        this.shadowRoot.innerHTML = `${elementStyle}
          <slot name="logo"></slot>
          <h1 class="app-title">${this.sectionTitle}</h1>
          <h2 class="app-subtitle">${this.sectionDescription}</h2>`;
        break;
      case "article":
        this.shadowRoot.innerHTML = `${elementStyle}
          <h2 class="app-title">${this.sectionTitle}</h2>
          <h3 class="app-subtitle">${this.sectionDescription}</h3>
          <article><slot name="content-column1"></slot><slot name="content-column2"></slot></article>
          <button class="section-button"><slot name="btn-content">Read more</slot></button>`;
        break;
      case "media":
        this.shadowRoot.innerHTML = `${elementStyle}
          <h2 class="app-title">${this.sectionTitle}</h2>
          <button class="media-button"><slot name="btn-content">&#9654;</slot></button>
          <h3 class="app-subtitle">${this.sectionDescription}</h3>`;
        break;
      default:
        this.shadowRoot.innerHTML = `${elementStyle}
          <h2 class="app-title">${this.sectionTitle}</h1>
          <h3 class="app-subtitle">${this.sectionDescription}</h2>
          <slot></slot>`;
    }
  }
}
