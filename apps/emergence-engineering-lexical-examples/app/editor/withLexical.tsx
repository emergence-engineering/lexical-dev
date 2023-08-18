"use client";

import { ComponentType, FunctionComponent, useState } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import DraggableBlockPlugin from "@/app/editor/(draggableBlock)/DraggableBlockPlugin";
import { exampleTheme } from "./exampleTheme";
import { TreeView } from "@lexical/react/LexicalTreeView";
import TreeViewPlugin from "./(treeviewplugin)/TreeViewPlugin";

function onError(error: any) {
  console.error("lexical.onError", { error });
}

export interface IWithLexicalPageProps {}

export const withLexical = <
  P extends IWithLexicalPageProps = IWithLexicalPageProps
>(
  Component: ComponentType<P>,
  config: Partial<InitialConfigType>
): FunctionComponent<P> => {
  const initialConfig: InitialConfigType = {
    ...config,
    namespace: "editor",
    theme: {
      ...exampleTheme /* linkPreviewContainer: "linkPreviewContainer"  */,
      ...config.theme,
    },
    onError,
  };

  const Editor = (props: Omit<P, keyof IWithLexicalPageProps>) => {
    const [floatingAnchorElem, setFloatingAnchorElem] =
      useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
      if (_floatingAnchorElem !== null) {
        setFloatingAnchorElem(_floatingAnchorElem);
      }
    };

    return (
      <div style={{ padding: "1rem", height: "100%" }}>
        <LexicalComposer initialConfig={initialConfig}>
          <div style={{ position: "relative" }}>
            {floatingAnchorElem && (
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            )}
            <Component {...props} />
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
            <TreeViewPlugin />
          </div>
        </LexicalComposer>
      </div>
    );
  };

  return Editor;
};
