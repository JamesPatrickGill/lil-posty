import { invoke } from "@tauri-apps/api";
import { getResponseState } from "./response-state";

type HttpMethod = "Get";
type BodyType = "Json";

class RequestState {
  private _method: HttpMethod = "Get";
  private _url = "";
  private _body = "";
  private _bodyType: BodyType = "Json";

  private _headers: { key: string; value: string }[] = [
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "User-Agent",
      value: "JustSomeUserAgent/0.0.1",
    },
  ];

  public get method(): HttpMethod {
    return this._method;
  }
  public set method(newMethod: HttpMethod) {
    this._method = newMethod;
  }

  public get url(): string {
    return this._url;
  }
  public set url(newUrl: string) {
    this._url = newUrl;
  }

  public get body(): string {
    return this._body;
  }
  public set body(newBody: string) {
    this._body = newBody;
  }

  public get body_type(): BodyType {
    return this._bodyType;
  }
  public set body_type(value: BodyType) {
    this._bodyType = value;
  }

  public get headers() {
    return this._headers;
  }
  public set headers(value) {
    this._headers = value;
  }

  public async send() {
    const result: {
      body: string;
      duration: { nanos: number };
      size: number;
      status: number;
      headers: { key: string; value: string }[];
    } = await invoke("send", {
      method: this.method,
      url: this.url,
      body: this.body,
      bodyType: this.body_type,
      headers: this.headers,
    });
    const responseState = getResponseState();
    responseState.update(result);
  }
}

let requestStateSingleton: RequestState | null = null;
export const getRequestState = () => {
  if (requestStateSingleton) {
    return requestStateSingleton;
  }

  requestStateSingleton = new RequestState();
  return requestStateSingleton;
};
