import {SectionCreator} from './join-us-section.js';

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
  const sectionFactory = new SectionCreator();
  const sectionRenderer = new Renderer(sectionFactory.create('standard'), 'footer');
  window.addEventListener("load", sectionRenderer.render);