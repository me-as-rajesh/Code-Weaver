"use server";

import { generateCode } from "@/ai/flows/generate-code";
import { improveCode } from "@/ai/flows/improve-code";
import { convertCode } from "@/ai/flows/convert-code";

export async function generateCodeAction(prompt: string): Promise<{ code: string; error?: string }> {
  if (!prompt) {
    return { code: "", error: "Prompt cannot be empty." };
  }
  try {
    const result = await generateCode({ prompt });
    
    // Clean up the response to remove markdown code fences
    const cleanedCode = result.code.replace(/^```(html)?\n/i, '').replace(/\n```$/, '');

    return { code: cleanedCode };
  } catch (error) {
    console.error("Code generation failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { code: "", error: `An error occurred while generating code: ${errorMessage}` };
  }
}

export async function improveCodeAction({ code, prompt }: { code: string; prompt: string }): Promise<{ improvedCode: string; error?: string }> {
  if (!prompt) {
    return { improvedCode: code, error: "Improvement instructions cannot be empty." };
  }
  if (!code) {
      return { improvedCode: "", error: "No code to improve." };
  }
  try {
    const result = await improveCode({ code, prompt });
    
    const cleanedCode = result.improvedCode.replace(/^```(html)?\n/i, '').replace(/\n```$/, '');

    return { improvedCode: cleanedCode };
  } catch (error) {
    console.error("Code improvement failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { improvedCode: code, error: `An error occurred while improving code: ${errorMessage}` };
  }
}


export async function convertCodeAction({ inputCode, targetLanguage }: { inputCode: string; targetLanguage: string }): Promise<{ convertedCode: string; error?: string }> {
  if (!inputCode.trim()) {
    return { convertedCode: "", error: "Please enter some code to convert." };
  }
  if (!targetLanguage) {
      return { convertedCode: "", error: "Please select a target language." };
  }
  try {
    const result = await convertCode({ inputCode, targetLanguage });

    // The AI is instructed to return raw code, but we'll clean just in case.
    const cleanedCode = result.convertedCode
      .replace(/^```[a-zA-Z0-9-]+\n?/i, '')
      .replace(/\n```$/, '');

    return { convertedCode: cleanedCode };
  } catch (error) {
    console.error("Code conversion failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { convertedCode: "", error: `An error occurred during conversion: ${errorMessage}` };
  }
}
