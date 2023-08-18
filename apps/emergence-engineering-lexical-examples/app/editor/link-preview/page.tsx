"use client";

import React, { FunctionComponent } from "react";
import {
  LinkPreviewNode,
  LinkPreviewPlugin,
} from "lexical-link-preview-plugin";
import "lexical-link-preview-plugin/dist/styles/style.css";

import { withLexical } from "../withLexical";

const LinkPreviewPage: FunctionComponent = () => {
  return (
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
            console.log({ res: res.data });
            return res.data;
          });
      }}
    />
  );
};

export default withLexical(LinkPreviewPage, {
  nodes: [LinkPreviewNode],
  theme: { linkPreviewContainer: "linkPreviewContainer" },
});
