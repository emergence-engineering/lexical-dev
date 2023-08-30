"use client";

import React, { FunctionComponent } from "react";
import { SlashMenuPlugin } from "@emergence-engineering/lexical-slash-menu-plugin";
import "@emergence-engineering/lexical-slash-menu-plugin/dist/styles/style.css";

import { withLexical } from "../withLexical";
import {
  $createTextNode,
  $getSelection,
  $isParagraphNode,
  LexicalEditor,
} from "lexical";

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

const SlashMenu: FunctionComponent = () => {
  return (
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
  );
};

export default withLexical(SlashMenu, {});
