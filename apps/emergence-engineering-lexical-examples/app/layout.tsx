"use client";

import { useCallback } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navigate = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="header">
          <button onClick={navigate}>Home</button>
        </div>
        {children}
      </body>
    </html>
  );
}
