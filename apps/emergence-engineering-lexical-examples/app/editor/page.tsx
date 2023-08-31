"use client";

import "@emergence-engineering/lexical-slash-menu-plugin/dist/styles/style.css";
import "@emergence-engineering/lexical-link-preview-plugin/dist/styles/style.css";

import { withLexical } from "./withLexical";
import {
  LinkPreviewNode,
  LinkPreviewPlugin,
} from "@emergence-engineering/lexical-link-preview-plugin";
import { SlashMenuPlugin } from "@emergence-engineering/lexical-slash-menu-plugin";
import {
  $createTextNode,
  $getSelection,
  $isParagraphNode,
  LexicalEditor,
} from "lexical";
import React from "react";
import { init } from "@emergence-engineering/lexical-suggestcat-plugin";

const insertText = (text: string) => {
  const selection = $getSelection();
  const nodes = selection?.getNodes();
  const paragraphNode = $isParagraphNode(nodes?.[0])
    ? nodes?.[0]
    : nodes?.[0]?.getParent();
  const textNode = $createTextNode(text);
  if (paragraphNode) {
    paragraphNode.append(textNode);
  }
};
const Editor = () => {
  init();
  return (
    <>
      <LinkPreviewPlugin
        showLink={false}
        showClosePreview={true}
        fetchDataForPreview={(link: string) => {
          return fetch("/api/preview", {
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
            command: (editor: LexicalEditor) => {
              editor.update(() => {
                insertText("First");
              });
            },
          },
          {
            id: "2",
            label: "Second",
            type: "command",
            command: (editor: LexicalEditor) => {
              editor.update(() => {
                insertText("Second");
              });
            },
          },
          {
            id: "3",
            label: "Submenu",
            type: "submenu",
            elements: [
              {
                id: "4",
                label: "Third",
                type: "command",
                command: (editor: LexicalEditor) => {
                  editor.update(() => {
                    insertText("Third");
                  });
                },
              },
              {
                id: "5",
                label: "Fourth",
                type: "command",
                command: (editor: LexicalEditor) => {
                  editor.update(() => {
                    insertText("Fourth");
                  });
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default withLexical(Editor, {
  theme: { linkPreviewContainer: "linkPreviewContainer" },
  nodes: [LinkPreviewNode],
});
