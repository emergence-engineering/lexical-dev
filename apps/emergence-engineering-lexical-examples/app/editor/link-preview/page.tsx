"use client";

import React, { FunctionComponent } from "react";

import "@emergence-engineering/lexical-link-preview-plugin/dist/styles/style.css";

import { withLexical } from "../withLexical";
import {
  LinkPreviewPlugin,
  LinkPreviewNode,
} from "@emergence-engineering/lexical-link-preview-plugin";

const LinkPreviewPage: FunctionComponent = () => {
  return (
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
