"use client";

import { useState } from "react";
import { SendHorizonal, Loader, Code } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { LivePreview } from "@/components/live-preview";
import { generateCodeAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState(
    `<!-- Welcome to Code Weaver! -->
<!-- Enter a prompt and see the magic happen. -->
<div style="display: flex; justify-content: center; align-items: center; height: 100%; font-family: sans-serif; background-color: #f0f0f0; border-radius: 0.5rem;">
  <div style="text-align: center;">
    <h1 style="font-size: 2rem; color: #333;">Live Preview</h1>
    <p style="color: #666;">Your generated code will appear here.</p>
  </div>
</div>`
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Prompt cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedCode("");

    const result = await generateCodeAction(prompt);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
       setGeneratedCode(`// Error generating code. Please try again.`);
    } else {
      setGeneratedCode(result.code);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4 gap-4 overflow-hidden">
      <header className="flex-shrink-0 flex items-center justify-center gap-2">
         <Code className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-center font-headline">
          Code Weaver
        </h1>
      </header>
      
      <Card className="flex-shrink-0">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start">
            <Textarea
              placeholder="e.g., 'A modern login form with email and password fields, and a submit button.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none font-body flex-grow text-base"
              rows={2}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
            <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader className="animate-spin mr-2" />
              ) : (
                <SendHorizonal className="mr-2" />
              )}
              Generate
            </Button>
          </form>
        </CardContent>
      </Card>


      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col min-h-0">
          <CodeEditor code={generatedCode} isLoading={isLoading} />
        </div>
        <div className="flex flex-col min-h-0">
          <LivePreview code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
