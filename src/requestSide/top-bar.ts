import { getRequestState } from "../states/request-state";

export const renderReqSideTopBar = (elementToReplace: HTMLDivElement) => {
  elementToReplace.outerHTML = `
    <div id="req-top-bar" class="bg-mantle flex flex-row py-2 px-4 gap-4 items-center border-b-2 border-surface0">
      <div id="req-type" class=""></div>
      <div id="req-url" class="flex-1"></div>
      <div id="req-send-cta" class=""></div>
    </div>
  `;

  renderMethodDropdown(document.querySelector<HTMLDivElement>("#req-type")!);
  renderUrlInput(document.querySelector<HTMLDivElement>("#req-url")!);
  renderSendCta(document.querySelector<HTMLDivElement>("#req-send-cta")!);
};

const renderMethodDropdown = (parent: HTMLDivElement) => {
  parent.innerHTML = `
    <div class="text-lg text-sapphire font-bold flex gap-2 hover:cursor-pointer">
      <span>GET</span>
      <span>&#9660;</span>
    </div>
  `;
};

const renderUrlInput = (parent: HTMLDivElement) => {
  parent.innerHTML = `
    <input id="url-input" type="text" autocorrect="off" autocapitalize="none" class="text-text bg-transparent w-full" placeholder="https://api.some-api.com/path/otherpath"/>
  `;

  const requestState = getRequestState();

  document
    .querySelector<HTMLInputElement>("#url-input")!
    .addEventListener("input", (ev) => {
      requestState.url = (ev.target as HTMLInputElement).value;
    });
};

const renderSendCta = (parent: HTMLDivElement) => {
  parent.innerHTML = `
    <button id="send-cta" class="bg-mauve text-lg text-base p-1 px-2 flex flex-row gap-1 items-center hover:brightness-110 active:brightness-90">
      <div class="font-semibold">Send</div>
      <svg width="24px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
        <path stroke="#1e1e2e" d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;

  const requestState = getRequestState();

  document
    .querySelector<HTMLButtonElement>("#send-cta")!
    .addEventListener("click", () => {
      requestState.send();
    });
};
