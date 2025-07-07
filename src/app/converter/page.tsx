"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CodeConverterPage() {
  const [inputCode, setInputCode] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [outputCode, setOutputCode] = useState("");

  const handleConvert = () => {
    if (!inputCode.trim()) {
      setOutputCode("Please enter some code to convert.");
      return;
    }
    const converted = `// Converted from ${sourceLanguage} to ${targetLanguage}\n// (Conversion logic not implemented)\n\n${inputCode}`;
    setOutputCode(converted);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
      <a href="/" className="text-primary mb-4 hover:underline self-start">← Back to Code Weaver</a>
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-slate-800">
            Code Converter
          </CardTitle>
          <CardDescription className="text-center pt-1">
            Translate code between different programming languages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="inputCode" className="font-semibold text-slate-700">Input Code</Label>
                <Textarea
                  id="inputCode"
                  placeholder="Enter code to convert"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="h-64 mt-1 font-code"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="sourceLanguage" className="font-semibold text-slate-700">Source Language</Label>
                    <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                      <SelectTrigger id="sourceLanguage" className="mt-1">
                        <SelectValue placeholder="Select source language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="c++">C++</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div>
                    <Label htmlFor="targetLanguage" className="font-semibold text-slate-700">Target Language</Label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger id="targetLanguage" className="mt-1">
                        <SelectValue placeholder="Select target language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="c++">C++</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>
            </div>

            <div className="space-y-1 flex flex-col">
               <Label htmlFor="outputCode" className="font-semibold text-slate-700">Output</Label>
               <div className="bg-slate-100 p-4 rounded-md flex-grow overflow-auto mt-1">
                <pre id="outputCode" className="text-sm text-slate-800 whitespace-pre-wrap font-code">{outputCode || "Converted code will appear here."}</pre>
               </div>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button onClick={handleConvert} size="lg" className="bg-green-600 text-white hover:bg-green-700">
              Convert
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
