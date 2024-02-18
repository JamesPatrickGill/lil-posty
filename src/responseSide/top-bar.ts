import { getResponseState } from "../states/response-state";

export const renderResSideTopBar = (elementToReplace: HTMLDivElement) => {
  elementToReplace.outerHTML = `
    <div id="req-top-bar" class="bg-mantle flex flex-row py-2 px-4 gap-4 items-center border-b-2 border-surface0">
      <div id="res-status" class=""></div>
      <div id="res-duration" class=""></div>
      <div id="res-size" class=""></div>
    </div>
  `;

  renderResStatus(document.querySelector<HTMLDivElement>("#res-status")!);
  renderResDuration(document.querySelector<HTMLDivElement>("#res-duration")!);
  renderResSize(document.querySelector<HTMLDivElement>("#res-size")!);
};

const renderResStatus = (parent: HTMLDivElement) => {
  const { status } = getResponseState();

  if (status >= 200 && status < 300) {
    parent.innerHTML = `
      <div class="bg-green text-lg text-base p-1 px-2">
        <span>${status} Good</span>
      </div>
    `;
  } else if (status >= 400) {
    parent.innerHTML = `
      <div class="bg-red text-lg text-base p-1 px-2">
        <span>${status} Bad</span>
      </div>
    `;
  }
};

const renderResDuration = (parent: HTMLDivElement) => {
  const { durationNs } = getResponseState();

  let inner = `<span>${durationNs} ns</span>`;
  if (durationNs > 1000000000) {
    inner = `${roundTo(durationNs / 1000000000, 2)} s`;
  } else if (durationNs > 1000000) {
    inner = `${roundTo(durationNs / 1000000, 2)} ms`;
  } else if (durationNs > 1000) {
    inner = `${roundTo(durationNs / 1000, 2)} μs`;
  }
  parent.innerHTML = `
    <div class="bg-surface0 p-1 px-2 text-lg">
      <span>${inner}</span>
    </div>
  `;
};

const renderResSize = (parent: HTMLDivElement) => {
  const { size } = getResponseState();

  let inner = `<span>${size} B</span>`;
  if (size > 1000000000) {
    inner = `${roundTo(size / 1000000000, 2)} GB`;
  } else if (size > 1000000) {
    inner = `${roundTo(size / 1000000, 2)} MB`;
  } else if (size > 1000) {
    inner = `${roundTo(size / 1000, 2)} KB`;
  }
  parent.innerHTML = `
    <div class="bg-surface0 p-1 px-2 text-lg">
      <span>${inner}</span>
    </div>
  `;
};

const roundTo = (n: number, digits: number) => {
  var negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (n < 0) {
    negative = true;
    n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  const a: number = parseFloat((n * multiplicator).toFixed(11));
  const b: string = (Math.round(a) / multiplicator).toFixed(digits);
  const c = negative ? ((b as any) * -1).toFixed(digits) : b;
  return c;
};
