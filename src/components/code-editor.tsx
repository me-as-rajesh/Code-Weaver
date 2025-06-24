"use client";

import { useTypewriter } from '@/hooks/use-typewriter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from './ui/skeleton';

interface CodeEditorProps {
  code: string;
  isLoading: boolean;
}

export function CodeEditor({ code, isLoading }: CodeEditorProps) {
  const displayedCode = useTypewriter(code, 5);

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Code</CardTitle>
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
