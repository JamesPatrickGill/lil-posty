import { json, jsonParseLinter } from "@codemirror/lang-json";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { defaultKeymap } from "@codemirror/commands";
import { getRequestState } from "../../../states/request-state";
import { getUiState } from "../../../states/ui-state";
import { lintGutter, linter } from "@codemirror/lint";

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
    { tag: t.bool, color: "#5c6166" },
    { tag: t.propertyName, color: "#fab387" },
  ],
});

export const renderBodyJsonTabContent = (parent: HTMLDivElement) => {
  const reqState = getRequestState();
  let init_editor_content = reqState.body;
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
      EditorView.updateListener.of((a) => {
        reqState.body = a.state.doc.toString();
      }),
    ],
  });

  const view = new EditorView({
    parent,
    state,
  });

  const uiState = getUiState();
  uiState.activeEditorView = view;
};
