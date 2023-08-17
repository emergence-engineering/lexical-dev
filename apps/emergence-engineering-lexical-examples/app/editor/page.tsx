"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  LinkPreviewNode,
  LinkPreviewPlugin,
} from "lexical-link-preview-plugin";
import { SlashMenuPlugin } from "lexical-slash-menu-plugin";
import "lexical-slash-menu-plugin/dist/styles/style.css";
import "lexical-link-preview-plugin/dist/styles/style.css";

import { exampleTheme } from "./exampleTheme";
import { useState } from "react";
import DraggableBlockPlugin from "@/app/editor/(draggableBlock)/DraggableBlockPlugin";

function onError(error: any) {
  console.error("lexical.onError", { error });
}

const initialConfig = {
  namespace: "MyEditor",
  theme: { ...exampleTheme, linkPreviewContainer: "linkPreviewContainer" },
  onError,
  nodes: [LinkPreviewNode],
};

function Editor() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <LexicalComposer initialConfig={initialConfig}>
        <div style={{ position: "relative" }}>
          {floatingAnchorElem && (
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
          )}

          <LinkPreviewPlugin
            showLink={false}
            fetchDataForPreview={(link: string) => {
              return fetch("api/preview", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ link }),
              })
                .then((res) => res.json())
                .then((res) => {
                  return res.data;
                });
            }}
          />
          <SlashMenuPlugin
            menuElements={[
              {
                id: "1",
                label: "First",
                type: "command",
              },
              {
                id: "2",
                label: "Second",
                type: "command",
              },
              {
                id: "3",
                label: "Third",
                type: "command",
              },
            ]}
          />
          <RichTextPlugin
            placeholder={null}
            contentEditable={
              <div className="editor-scroller">
                <div ref={onRef} className={"editor"}>
                  <ContentEditable
                    style={{
                      padding: "10px 24px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      minHeight: "500px",
                    }}
                  />
                </div>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
