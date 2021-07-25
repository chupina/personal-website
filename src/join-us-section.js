import { SubscribeForm } from "./subscribe-form.js";
import { BaseSection } from "./base-section.js";

class JoinSection {
  constructor(headerContent, subheaderContent, buttonContent, className) {
    this.element = new BaseSection(headerContent, subheaderContent, className);
    this.buttonContent = buttonContent;
    this.form = new SubscribeForm(this.buttonContent);
    this.element.appendChild(this.form);
    return this.element;
  }
}

class StandardSection extends JoinSection {
  constructor() {
    super(
      "Join our program",
      "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.",
      "Subscribe",
      "join",
    );
  }
}

class AdvancedSection extends JoinSection {
  constructor() {
    super(
      "Join our advanced program",
      "Sed do eiusmod tempor incididunt <br> ut labore et dolore magna aliqua.",
      "Subscribe to Advanced Program",
      "join",
    );
  }
}

export class SectionCreator {
  create(type) {
    switch (type) {
      case "standard":
        return new StandardSection();
      case "advanced":
        return new AdvancedSection();
      default:
        return new StandardSection();
    }
  }
}
