class JoinSection {
    constructor(headerContent, subheaderContent, buttonContent) {
      this.headerContent = headerContent;
      this.subheaderContent = subheaderContent;
      this.buttonContent = buttonContent;
      this.element = document.createElement("section");
      this.create();
      return this.element;
     }
    create() {
      this.element.className = "app-section app-section--image-join";
      this.element.innerHTML = `<h2 class="app-title app-section__title--join">${this.headerContent}</h2>
                              <h3 class="app-subtitle">${this.subheaderContent}</h3>
                              <form class="app-section_form">
                                  <input type="email" placeholder="Email" class="app-section__input--email">
                                  <input type="submit" value=${this.buttonContent} class="app-section__button app-section__input--subscribe">
                              </form>`;
      this.element.querySelector('form').addEventListener('submit',(e) => {
            e.preventDefault();
            e.stopPropagation();
           console.log(e.currentTarget.querySelector("input").value);
          });
       }
    }
  
  class Renderer{
      constructor(node, position){
          this.node = node;
          this.position = position;
      }
      render = () => {
          document.querySelector(this.position)
        .insertAdjacentElement("beforebegin", this.node);
    }
      remove = ()=> {this.node.remove()}
  
     
  }
  const joinProgram = new JoinSection(
    "Join our program",
    "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.",
    "Subscribe",
    "footer"
  );
  
  const sectionRenderer = new Renderer(joinProgram, 'footer');
  window.addEventListener("load", sectionRenderer.render);