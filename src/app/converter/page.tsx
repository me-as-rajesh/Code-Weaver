"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { convertCodeAction } from "@/app/actions";
import { Loader, Wand2, Copy, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CodeConverterPage() {
  const [inputCode, setInputCode] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to convert.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setOutputCode(""); 

    const result = await convertCodeAction({ inputCode, targetLanguage });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      setOutputCode(`// Error converting code: ${result.error}`);
    } else {
      setOutputCode(result.convertedCode);
    }
    setIsLoading(false);
  };
  
  const handleCopy = async () => {
    if (!outputCode.trim() || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(outputCode);
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
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 flex flex-col">
      <div className="flex-shrink-0 mb-4">
        <a href="/" className="text-primary hover:underline">← Back to Code Weaver</a>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-lg flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-slate-800">
            Code Converter
          </CardTitle>
          <CardDescription className="text-center pt-1">
            Translate code between different programming languages. The source language is automatically detected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
            <div className="space-y-4 flex flex-col">
              <div className="flex flex-col flex-grow">
                <Label htmlFor="inputCode" className="font-semibold text-slate-700">Input Code</Label>
                <Textarea
                  id="inputCode"
                  placeholder="Enter code to convert"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="h-64 mt-1 font-code flex-grow"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="targetLanguage" className="font-semibold text-slate-700">Target Language</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage} disabled={isLoading}>
                  <SelectTrigger id="targetLanguage" className="mt-1">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="c++">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="kotlin">Kotlin</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue-next">Vue</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                    <SelectItem value="preact">Preact</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="react-native">React Native</SelectItem>
                    <SelectItem value="flutter">Flutter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1 flex flex-col">
               <div className="flex justify-between items-center">
                 <Label htmlFor="outputCode" className="font-semibold text-slate-700">Output</Label>
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    disabled={isLoading || !outputCode.trim()}
                    aria-label="Copy code"
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
               </div>
               <div className="bg-slate-100 p-4 rounded-md flex-grow overflow-auto mt-1">
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-11/12 bg-slate-300" />
                    <Skeleton className="h-4 w-full bg-slate-300" />
                    <Skeleton className="h-4 w-10/12 bg-slate-300" />
                    <Skeleton className="h-4 w-full bg-slate-300" />
                    <Skeleton className="h-4 w-8/12 bg-slate-300" />
                  </div>
                ) : (
                  <pre id="outputCode" className="text-sm text-slate-800 whitespace-pre-wrap font-code">{outputCode || "Converted code will appear here."}</pre>
                )}
               </div>
            </div>
          </div>
          
          <div className="text-center pt-4 flex-shrink-0">
            <Button onClick={handleConvert} size="lg" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
              Convert
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
