"use client"; // Enables client-side rendering for this component

import React, { useState, ChangeEvent, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { predefinedHtml } from "./predefinedHtml";

export default function HTMLPreviewComponent() {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [previewHtml, setPreviewHtml] = useState<string>("");

  // Live preview effect: update previewHtml when htmlCode changes
  useEffect(() => {
    setPreviewHtml(htmlCode);
  }, [htmlCode]);

  // Handler for updating HTML code state on textarea change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setHtmlCode(e.target.value);
  };

  // Handler to paste predefined HTML into the textarea
  const handlePasteHtml = (): void => {
    setHtmlCode(predefinedHtml);
  };

  // Handler to reset the textarea and preview
  const handleReset = (): void => {
    setHtmlCode("");
    setPreviewHtml("");
  };

  // Handler to download the HTML code
  const handleDownload = (): void => {
    const blob = new Blob([htmlCode], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_html_code.html";
    link.click();
  };

  // JSX for the component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f8ff] text-[#333]">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-[#f8fbff] border border-[#87ceeb]">
        <h1 className="text-3xl font-bold mb-4 text-center">HTML Previewer</h1>
        <p className="text-center mb-4 text-[#555]">
          Enter your HTML code to preview it live.
        </p>
        <div className="grid gap-4">
          <Textarea
            value={htmlCode}
            onChange={handleChange}
            placeholder="Enter your HTML code here..."
            className="p-4 rounded-lg border border-[#87ceeb] bg-[#f0f8ff] text-[#333]"
            rows={8}
          />
          <div className="flex justify-center space-x-2">
            <Button onClick={handlePasteHtml}>Paste HTML</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleDownload}>Download HTML</Button>
          </div>
          <div className="p-4 rounded-lg border border-[#87ceeb] bg-[#f0f8ff] text-[#333]">
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      </div>
    </div>
  );
}
