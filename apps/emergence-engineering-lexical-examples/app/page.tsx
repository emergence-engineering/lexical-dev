"use client";

import React, { useCallback } from "react";
import { Inter } from "@next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div className="wrapper">
      <div className="link" onClick={() => navigate("/editor")}>
        Editor
      </div>
      <div className="link" onClick={() => navigate("/editor/link-preview")}>
        Link Preview
      </div>
      <div className="link" onClick={() => navigate("/editor/slash-menu")}>
        Slash Menu
      </div>
      <div className="link" onClick={() => navigate("/editor/suggestcat")}>
        Suggestcat
      </div>
    </div>
  );
}
