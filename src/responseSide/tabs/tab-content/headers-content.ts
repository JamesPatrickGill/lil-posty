import { getResponseState } from "../../../states/response-state";

export const renderHeaderTabContent = (parent: HTMLDivElement) => {
  parent.innerHTML = `
    <div id="res-header-grid" class="flex flex-col gap-2 p-4 items-center"></div>
  `;

  renderHeaderEntryGrid(document.querySelector("#res-header-grid")!);
};

const renderHeaderEntryGrid = (parent: HTMLDivElement) => {
  const resState = getResponseState();
  const rowHtml = resState.headers.reduce((acc, { key, value }, idx) => {
    return acc.concat(...["\n", createGridRowHtml(key, value, idx)]);
  }, "");
  parent.innerHTML = rowHtml;
};

const createGridRowHtml = (key: string, value: string, idx: number) => {
  return `
    <div class="text-text flex flex-row gap-8 w-full items-center">
      <input id="key-input-${idx}" value="${key.replace(/\n/, "\\n")}" class="bg-transparent border-b-2 border-surface0 p-1 flex-1" readonly/> 
      <input id="value-input-${idx}" value="${value}" class="bg-transparent border-b-2 border-surface0 p-1 flex-1" readonly/> 
    </div>
  `;
};
