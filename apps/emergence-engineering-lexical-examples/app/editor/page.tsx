"use client";

import {
  LinkPreviewNode,
  LinkPreviewPlugin,
} from "lexical-link-preview-plugin";
import { SlashMenuPlugin } from "lexical-slash-menu-plugin";
import "lexical-slash-menu-plugin/dist/styles/style.css";
import "lexical-link-preview-plugin/dist/styles/style.css";

import { withLexical } from "./withLexical";

const Editor = () => {
  return (
    <>
      <LinkPreviewPlugin
        showLink={false}
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
    </>
  );
};

export default withLexical(Editor, {
  theme: { linkPreviewContainer: "linkPreviewContainer" },
  nodes: [LinkPreviewNode],
});
