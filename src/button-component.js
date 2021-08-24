export class Button {
  constructor(text, type, className) {
    const button = document.createElement("button");
    button.type = type;
    button.innerText = text;
    button.className = className;
    return button;
  }
}
