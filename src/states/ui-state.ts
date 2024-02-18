import { EditorView } from "@codemirror/view";

export type ReqTab = "body::json" | "headers";
export type ResTab = "body" | "headers";

class UiState {
  private _openReqTabId: ReqTab = "body::json";
  private _activeEditorView: null | EditorView = null;
  private _openResTab: ResTab = "body";
  private _activePreviewView: null | EditorView = null;

  public get openReqTabId() {
    return this._openReqTabId;
  }
  public set openReqTabId(value: ReqTab) {
    this._openReqTabId = value;
  }

  public get activeEditorView(): EditorView | null {
    return this._activeEditorView;
  }
  public set activeEditorView(value) {
    this._activeEditorView = value;
  }

  public get openResTab(): ResTab {
    return this._openResTab;
  }
  public set openResTab(value: ResTab) {
    this._openResTab = value;
  }

  public get activePreviewView(): null | EditorView {
    return this._activePreviewView;
  }
  public set activePreviewView(value: null | EditorView) {
    this._activePreviewView = value;
  }
}

let uiStateSingleton: UiState | null = null;
export const getUiState = () => {
  if (uiStateSingleton) {
    return uiStateSingleton;
  }

  uiStateSingleton = new UiState();
  return uiStateSingleton;
};
