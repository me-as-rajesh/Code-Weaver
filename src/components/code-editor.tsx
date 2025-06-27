"use client";

import { useState } from 'react';
import { useTypewriter } from '@/hooks/use-typewriter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from './ui/skeleton';
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  isLoading: boolean;
}

export function CodeEditor({ code, isLoading }: CodeEditorProps) {
  const displayedCode = useTypewriter(code, 5);
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isLoading || !code.trim() || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(code);
      toast({ title: "Code copied to clipboard!" });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Error",
        description: "Could not copy code.",
        variant: "destructive",
      });
    }
  };


  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline">Code</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          disabled={isLoading || !code.trim()}
          aria-label="Copy code"
        >
          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-4 pt-0 h-full">
             {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-8/12" />
                </div>
            ) : (
                <pre className="h-full text-sm">
                    <code className="font-code text-sm whitespace-pre-wrap">{displayedCode}</code>
                </pre>
             )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
