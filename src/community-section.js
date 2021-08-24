import { BaseSection } from "./base-section.js";
import { Slider } from "./slider-component.js";

export class CommunitySection {
  constructor() {
    this.element = new BaseSection(
      "Big Community of</br>People Like You",
      "We’re proud of our products, and we’re really excited </br> when we get feedback from our users.",
      "community",
    );
    this.slider = new Slider();
    this.element.appendChild(this.slider);
    return this.element;
  }
}
