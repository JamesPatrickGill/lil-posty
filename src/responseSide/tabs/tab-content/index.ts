import { getUiState } from "../../../states/ui-state";
import { renderBodyJsonPreview } from "./body-json-preview";
import { renderHeaderTabContent } from "./headers-content";

export const renderResTabContent = (parent: HTMLDivElement) => {
  const uiState = getUiState();
  switch (uiState.openResTab) {
    case "body":
      renderBodyJsonPreview(parent);
      break;
    case "headers":
      renderHeaderTabContent(parent);
      break;
    default:
      parent.innerHTML = `Hello`;
      break;
  }
};
