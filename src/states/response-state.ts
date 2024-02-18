class ResponseState {
  private updateCallback: () => void = () => {};
  private _hasRequestBeenMade: boolean = false;
  private _body = "";
  private _status: number = 0;
  private _size: number = 0;
  private _durationNs: number = 0;
  private _headers: { key: string; value: string }[] = [];

  constructor(updateCallback?: () => void) {
    this.updateCallback = updateCallback ? updateCallback : () => {};
  }

  public get hasRequestBeenMade(): boolean {
    return this._hasRequestBeenMade;
  }
  public set hasRequestBeenMade(value: boolean) {
    this._hasRequestBeenMade = value;
  }

  public get body(): string {
    return this._body;
  }
  public set body(newBody: string) {
    this._body = newBody;
  }

  public get status(): number {
    return this._status;
  }
  public set status(value: number) {
    this._status = value;
  }

  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    this._size = value;
  }

  public get durationNs(): number {
    return this._durationNs;
  }
  public set durationNs(value: number) {
    this._durationNs = value;
  }

  public get headers(): { key: string; value: string }[] {
    return this._headers;
  }
  public set headers(value: { key: string; value: string }[]) {
    this._headers = value;
  }

  public update(params: {
    body: string;
    duration: { nanos: number };
    size: number;
    status: number;
    headers: { key: string; value: string }[];
  }) {
    this.body = params.body;
    this.status = params.status;
    this.durationNs = params.duration.nanos;
    this.size = params.size;
    this.headers = params.headers;

    console.log(this);
    this.hasRequestBeenMade = true;
    this.updateCallback();
  }
}

let responseStateSingleton: ResponseState | null = null;
export const getResponseState = () => {
  if (responseStateSingleton) {
    return responseStateSingleton;
  }

  throw new Error("Need to initialise response state");
};

export const initialiseResponseState = (updateCallback?: () => void) => {
  responseStateSingleton = new ResponseState(updateCallback);
};
