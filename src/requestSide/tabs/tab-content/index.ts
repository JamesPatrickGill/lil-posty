import { getUiState } from "../../../states/ui-state";
import { renderBodyJsonTabContent } from "./body-json-tab";
import { renderHeaderTabContent } from "./headers-tab";

export const renderTabContent = (parent: HTMLDivElement) => {
  const uiState = getUiState();
  switch (uiState.openReqTabId) {
    case "body::json":
      renderBodyJsonTabContent(parent);
      break;
    case "headers":
      renderHeaderTabContent(parent);
      break;
    default:
      parent.innerHTML = `Hello`;
      break;
  }
};
