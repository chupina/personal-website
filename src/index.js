import "./styles/style.css";
import { SectionCreator } from "./join-us-section.js";
import { CommunitySection } from "./community-section.js";
import { Renderer } from "./renderer.js";

const sectionFactory = new SectionCreator();
const standardSection = sectionFactory.create("standard");
const communitySection = new CommunitySection();
const sectionRendererJoin = new Renderer(standardSection, ".placeholder-join");
const sectionRendererCommunity = new Renderer(communitySection, ".placeholder-community");

window.addEventListener("load", sectionRendererJoin.render);
window.addEventListener("load", sectionRendererCommunity.render);
