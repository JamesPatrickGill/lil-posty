import "./index.css";
import { renderRequestSide } from "./requestSide/index.ts";
import { renderResponseSide } from "./responseSide/index.ts";
import { initialiseResponseState } from "./states/response-state.ts";

initialiseResponseState(() => {
  renderResponseSide(document.querySelector<HTMLDivElement>("#res-side")!);
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="bg-base flex flex-row h-lvh text-text">
    <div id="req-side" class="flex-1 flex-col">
    
    </div>
    <div id="divider" class="w-[2px] bg-surface0"></div>
    <div id="res-side" class="flex flex-1 flex-col"></div>
  </div>
`;

renderRequestSide(document.querySelector<HTMLDivElement>("#req-side")!);
renderResponseSide(document.querySelector<HTMLDivElement>("#res-side")!);
