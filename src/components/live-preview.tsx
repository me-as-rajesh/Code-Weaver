"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  // Add a basic CSS reset and styles to the iframe content
  const styledCode = `
    <style>
      body { 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        margin: 0;
        padding: 1rem;
        color: #111827;
        background-color: #ffffff;
      }
    </style>
    ${code}
  `;

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Live Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <iframe
          srcDoc={styledCode}
          title="Live Preview"
          sandbox="allow-scripts allow-modals"
          className="w-full h-full border rounded-lg bg-white"
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
}
