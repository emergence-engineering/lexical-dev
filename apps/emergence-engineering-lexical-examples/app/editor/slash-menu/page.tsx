"use client";

import React, { FunctionComponent } from "react";
import { SlashMenuPlugin } from "lexical-slash-menu-plugin";
import "lexical-slash-menu-plugin/dist/styles/style.css";

import { withLexical } from "../withLexical";

const SlashMenu: FunctionComponent = () => {
  return (
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
  );
};

export default withLexical(SlashMenu, {});
