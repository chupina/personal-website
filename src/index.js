/* eslint-disable eol-last */
import "./styles/style.css";
import { SectionCreator } from "./join-us-section.js";
import { CommunitySection } from "./community-section.js";
import { Renderer } from "./renderer.js";
import { WebsiteSection } from "./website-section.js";
import { collectAnalytics, analyticsData } from "./metrics.js";
// Define a custom web-component
customElements.define("website-section", WebsiteSection);

// Create a worker
const worker = new Worker(new URL("./worker.js", import.meta.url));

const sectionFactory = new SectionCreator();
const standardSection = sectionFactory.create("standard");
const communitySection = new CommunitySection();
const sectionRendererJoin = new Renderer(standardSection, ".placeholder-join");
const sectionRendererCommunity = new Renderer(
  communitySection,
  ".placeholder-community",
);

// Add listeners to the shadow DOM

const customWebSections = document.querySelectorAll("website-section");
customWebSections.forEach((section) => {
  const btn = section.shadowRoot.querySelector("button");
  if (btn) {
    btn.addEventListener("click", (e) => {
      worker.postMessage({
        event: e.type,
        target: e.currentTarget.tagName,
        time: e.timeStamp,
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
        event: e.type,
        target: e.currentTarget.tagName,
        time: e.timeStamp,
      });
    });
  });
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      worker.postMessage({
        event: e.type,
        target: e.currentTarget.tagName,
        time: e.timeStamp,
      });
    });
  });
});

window.addEventListener("load", () => {
  collectAnalytics("MemoryUsage", performance.memory.usedJSHeapSize);
});
const fetchObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    collectAnalytics("fetchDuration", entry.duration);
  });
});
fetchObserver.observe({ entryTypes: ["measure"] });

const loadObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const totalPageLoad = entry.domComplete - entry.fetchStart;
    collectAnalytics("pageLoadTime", totalPageLoad);
  });
});
loadObserver.observe({ entryTypes: ["navigation"] });

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const blob = new Blob([JSON.stringify(analyticsData)], {
      type: "application/json",
    });
    navigator.sendBeacon("http://localhost:8080/api/analytics/performance", blob);
  }
});
