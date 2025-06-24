"use server";

import { generateCode } from "@/ai/flows/generate-code";

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
