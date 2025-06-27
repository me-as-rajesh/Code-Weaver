"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from './ui/skeleton';
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';

interface CodeEditorProps {
  code: string;
  isLoading: boolean;
  onCodeChange: (newCode: string) => void;
}

export function CodeEditor({ code, isLoading, onCodeChange }: CodeEditorProps) {
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
        {isLoading ? (
          <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-8/12" />
          </div>
        ) : (
          <Textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="h-full w-full resize-none border-0 rounded-t-none p-4 font-code text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Your generated code will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
}
