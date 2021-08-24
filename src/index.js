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

window.addEventListener("load", sectionRendererJoin.render);
window.addEventListener("load", sectionRendererCommunity.render);
