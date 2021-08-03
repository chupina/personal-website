import "./styles/style.css";
import { SectionCreator } from "./join-us-section.js";
import { CommunitySection } from "./community-section.js";
import { Renderer } from "./renderer.js";
import { WebsiteSection } from "./website-section.js";

customElements.define("website-section", WebsiteSection);

const sectionFactory = new SectionCreator();
const standardSection = sectionFactory.create("standard");
const communitySection = new CommunitySection();
const sectionRendererJoin = new Renderer(standardSection, ".placeholder-join");
const sectionRendererCommunity = new Renderer(
  communitySection,
  ".placeholder-community",
);

// Create a worker

const worker = new Worker(new URL("./worker.js", import.meta.url));

// Add listeners to the shadow DOM

const customWebSections = document.querySelectorAll("website-section");
customWebSections.forEach((section) => {
  const btn = section.shadowRoot.querySelector("button");
  if (btn) {
    btn.addEventListener("click", (e) => {
      worker.postMessage({
        [e.target]: e.timeStamp,
      });
    });
  }
});

window.addEventListener("load", sectionRendererJoin.render);
window.addEventListener("load", sectionRendererCommunity.render);

// Add listeners to dynamically created sections

window.addEventListener("load", () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      worker.postMessage({
        [e.target]: e.timeStamp,
      });
    });
  });
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      worker.postMessage({
        [e.target]: e.timeStamp,
      });
    });
  });
});

// worker.onmessage = (e) => {
// console.log(e.data)

// };
