import { getUiState } from "../../states/ui-state";
import { renderTabContent } from "./tab-content";

export const renderReqSideTabs = (elementToReplace: HTMLDivElement) => {
  elementToReplace.outerHTML = `
    <div id="req-tabs" class="flex flex-col"></div>
  `;

  renderTabs(document.querySelector("#req-tabs")!);
};

const renderTabs = (parent: HTMLDivElement) => {
  const uiState = getUiState();
  const renderCallback = () => {
    if (uiState.activeEditorView) {
      uiState.activeEditorView.destroy();
    }
    renderTabs(parent);
  };
  parent.innerHTML = `
      <div id="req-tab-headers" class="flex flex-row"></div>
      <div id="req-tab-content"></div>
  `;

  renderTabHeaders(document.querySelector("#req-tab-headers")!, renderCallback);
  renderTabContent(document.querySelector("#req-tab-content")!);
};

const renderTabHeaders = (parent: HTMLDivElement, rerenderTabs: () => void) => {
  const uiState = getUiState();
  let baseTabClasses = "border-surface0 px-4 py-2";

  const bodyTabClasses =
    uiState.openReqTabId === "body::json"
      ? "border-r-2 pb-3"
      : "border-b-2 text-subtext0";
  const headersTabClasses =
    uiState.openReqTabId === "headers"
      ? "border-l-2 border-r-2 pb-3"
      : "border-b-2 text-subtext0";

  parent.innerHTML = `
      <button id="req-body-tab" class="${bodyTabClasses} ${baseTabClasses}">Body</button>
      <button id="req-header-tab" class="${headersTabClasses} ${baseTabClasses}">Headers</button>
      <div id="req-padding-tab" class="border-b-2 ${baseTabClasses} flex-1"></div>
  `;

  document
    .querySelector<HTMLButtonElement>("#req-body-tab")!
    .addEventListener("click", () => {
      if (uiState.openReqTabId !== "body::json") {
        uiState.openReqTabId = "body::json";
        rerenderTabs();
      }
    });

  document
    .querySelector<HTMLButtonElement>("#req-header-tab")!
    .addEventListener("click", () => {
      if (uiState.openReqTabId !== "headers") {
        uiState.openReqTabId = "headers";
        rerenderTabs();
      }
    });
};
