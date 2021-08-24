export class Input {
  constructor(type, text, className) {
    this.input = document.createElement("input");
    this.input.placeholder = text;
    this.input.type = type;
    this.input.className = className;
    this.input.setAttribute("autofocus", "autofocus");
    return this.input;
  }
}
