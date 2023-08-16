"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  LinkPreviewNode,
  LinkPreviewPlugin,
} from "lexical-link-preview-plugin";

function onError(error) {
  console.error("this.error", { error });
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: {
      linkPreviewContainer: "linkPreviewContainer",
    },
    onError,
    nodes: [LinkPreviewNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LinkPreviewPlugin
        showLink={false}
        fetchingFunction={(link: string) => {
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
      <RichTextPlugin
        placeholder={<div>Enter some text...</div>}
        contentEditable={<ContentEditable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
}

export default Editor;
