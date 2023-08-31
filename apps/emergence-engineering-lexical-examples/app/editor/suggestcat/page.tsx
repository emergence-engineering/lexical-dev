"use client";

import React, { FunctionComponent } from "react";
import { init } from "@emergence-engineering/lexical-suggestcat-plugin";
import "@emergence-engineering/lexical-slash-menu-plugin/dist/styles/style.css";

import { withLexical } from "../withLexical";

const Suggestcat: FunctionComponent = () => {
  init();
  return <div>no plugins yet</div>;
};

export default withLexical(Suggestcat, {});
