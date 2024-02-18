import { renderReqSideTabs } from "./tabs";
import { renderReqSideTopBar } from "./top-bar";

export function renderRequestSide(parent: HTMLDivElement) {
  parent.innerHTML = `
    <div id="req-side-top-bar-placeholder"></div>
    <div id="req-side-tab-bar-placeholder"></div>
  `;

  renderReqSideTopBar(document.querySelector("#req-side-top-bar-placeholder")!);
  renderReqSideTabs(document.querySelector("#req-side-tab-bar-placeholder")!);
}
