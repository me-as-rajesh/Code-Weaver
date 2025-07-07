"use client";

import { useState } from "react";
import { SendHorizonal, Loader, Code, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor";
import { LivePreview } from "@/components/live-preview";
import { generateCodeAction, improveCodeAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState(
    `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; font-family: 'Inter', sans-serif; background: linear-gradient(135deg, hsl(222.2, 47.4%, 11.2%), hsl(210, 40%, 50%)); color: white; border-radius: 0.5rem; text-align: center; padding: 2rem;">
  <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">Welcome to Code Weaver</h1>
  <p style="font-size: 1.1rem; max-width: 500px; margin-bottom: 2rem;">Describe the UI you want to build. You can even ask for images, like "a hero section for a space agency with a picture of a nebula".</p>
  <p style="font-size: 0.9rem; opacity: 0.7;">Your live preview will appear here.</p>
</div>`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const { toast } = useToast();

  const isInitialCode = generatedCode.includes("Welcome to Code Weaver");

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

  const handleImprove = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter improvement instructions in the text area.",
        variant: "destructive",
      });
      return;
    }
    setIsImproving(true);
    const result = await improveCodeAction({ code: generatedCode, prompt });
    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setGeneratedCode(result.improvedCode);
    }
    setIsImproving(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-4 gap-4 overflow-hidden">
      <header className="flex-shrink-0 flex items-center justify-between gap-2">
         <div className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline">
              Code Weaver
            </h1>
         </div>
         <Button onClick={handleImprove} disabled={isLoading || isImproving || isInitialCode}>
              {isImproving ? <Loader className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
              Improve
          </Button>
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
              disabled={isLoading || isImproving}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
            <Button type="submit" size="lg" disabled={isLoading || isImproving} className="w-full sm:w-auto">
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
          <CodeEditor
            code={generatedCode}
            isLoading={isLoading}
            onCodeChange={setGeneratedCode}
          />
        </div>
        <div className="flex flex-col min-h-0">
          <LivePreview code={generatedCode} />
        </div>
      </div>
    </div>
  );
}
