import { getResponseState } from "../states/response-state";
import { renderResSideTabs } from "./tabs";
import { renderResSideTopBar } from "./top-bar";

export function renderResponseSide(parent: HTMLDivElement) {
  const resState = getResponseState();

  if (resState.hasRequestBeenMade) {
    parent.innerHTML = `
    <div id="res-side-top-bar-placeholder"></div>
    <div id="res-side-tab-bar-placeholder"></div>
  `;

    renderResSideTopBar(
      document.querySelector("#res-side-top-bar-placeholder")!,
    );
    renderResSideTabs(document.querySelector("#res-side-tab-bar-placeholder")!);
  }
}
