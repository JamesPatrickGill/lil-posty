import { json, jsonParseLinter } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { defaultKeymap } from "@codemirror/commands";
import { getUiState } from "../../../states/ui-state";
import { lintGutter, linter } from "@codemirror/lint";
import { getResponseState } from "../../../states/response-state";

const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#1e1e2e",
    backgroundImage: "",
    foreground: "#cdd6f4",
    caret: "#cdd6f4",
    selection: "#bac2de",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBorder: "0px solid #ffffff10",
    gutterBackground: "#1e1e2e",
    gutterForeground: "#bac2de",
  },
  styles: [
    { tag: [t.string, t.special(t.brace)], color: "#a6e3a1" },
    { tag: t.number, color: "#fab387" },
    { tag: t.bool, color: "#fab387" },
    { tag: t.propertyName, color: "#f38ba8" },
  ],
});

export const renderBodyJsonPreview = (parent: HTMLDivElement) => {
  const resState = getResponseState();
  let init_editor_content = resState.body;
  try {
    init_editor_content = JSON.stringify(
      JSON.parse(init_editor_content),
      null,
      2,
    );
  } catch {}

  const state = EditorState.create({
    doc: init_editor_content,
    extensions: [
      myTheme,
      json(),
      lintGutter(),
      linter(jsonParseLinter()),
      lineNumbers(),
      keymap.of(defaultKeymap),
      EditorState.readOnly.of(true),
      EditorView.lineWrapping,
    ],
  });

  const view = new EditorView({
    parent,
    state,
  });

  const uiState = getUiState();
  uiState.activePreviewView = view;
};
