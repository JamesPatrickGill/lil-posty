import { getUiState } from "../../states/ui-state";
import { renderResTabContent } from "./tab-content";
// import { renderTabContent } from "./tab-content";

export const renderResSideTabs = (elementToReplace: HTMLDivElement) => {
  elementToReplace.outerHTML = `
    <div id="res-tabs" class="flex flex-col h-full overflow-hidden"></div>
  `;

  renderTabs(document.querySelector("#res-tabs")!);
};

const renderTabs = (parent: HTMLDivElement) => {
  const uiState = getUiState();
  const renderCallback = () => {
    if (uiState.activePreviewView) {
      uiState.activePreviewView.destroy();
    }
    renderTabs(parent);
  };
  parent.innerHTML = `
      <div id="res-tab-headers" class="flex flex-row"></div>
      <div id="res-tab-content" class="flex-1 overflow-auto"></div>
  `;

  renderTabHeaders(document.querySelector("#res-tab-headers")!, renderCallback);
  renderResTabContent(document.querySelector("#res-tab-content")!);
};

const renderTabHeaders = (parent: HTMLDivElement, rerenderTabs: () => void) => {
  const uiState = getUiState();
  let baseTabClasses = "border-surface0 px-4 py-2";

  const bodyTabClasses =
    uiState.openResTab === "body"
      ? "border-r-2 pb-3"
      : "border-b-2 text-subtext0";
  const headersTabClasses =
    uiState.openResTab === "headers"
      ? "border-l-2 border-r-2 pb-3"
      : "border-b-2 text-subtext0";

  parent.innerHTML = `
      <button id="res-body-tab" class="${bodyTabClasses} ${baseTabClasses}">Body</button>
      <button id="res-header-tab" class="${headersTabClasses} ${baseTabClasses}">Headers</button>
      <div id="res-padding-tab" class="border-b-2 ${baseTabClasses} flex-1"></div>
  `;

  document
    .querySelector<HTMLButtonElement>("#res-body-tab")!
    .addEventListener("click", () => {
      if (uiState.openResTab !== "body") {
        uiState.openResTab = "body";
        rerenderTabs();
      }
    });

  document
    .querySelector<HTMLButtonElement>("#res-header-tab")!
    .addEventListener("click", () => {
      if (uiState.openResTab !== "headers") {
        uiState.openResTab = "headers";
        rerenderTabs();
      }
    });
};
