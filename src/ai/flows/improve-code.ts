'use server';

/**
 * @fileOverview This file defines a Genkit flow for improving code.
 *
 * - improveCode - A function that takes code and a prompt and returns improved code.
 * - ImproveCodeInput - The input type for the improveCode function.
 * - ImproveCodeOutput - The return type for the improveCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveCodeInputSchema = z.object({
  code: z.string().describe('The code to improve.'),
  prompt: z.string().describe('Instructions on how to improve the code.'),
});
export type ImproveCodeInput = z.infer<typeof ImproveCodeInputSchema>;

const ImproveCodeOutputSchema = z.object({
  improvedCode: z.string().describe('The improved code.'),
});
export type ImproveCodeOutput = z.infer<typeof ImproveCodeOutputSchema>;

export async function improveCode(input: ImproveCodeInput): Promise<ImproveCodeOutput> {
  return improveCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveCodePrompt',
  input: {schema: ImproveCodeInputSchema},
  output: {schema: ImproveCodeOutputSchema},
  prompt: `You are an AI code assistant.  The user will provide you with code, along with a prompt describing how to improve that code.  You will return the improved code.

Code:
{{code}}

Instructions:
{{prompt}}`,
});

const improveCodeFlow = ai.defineFlow(
  {
    name: 'improveCodeFlow',
    inputSchema: ImproveCodeInputSchema,
    outputSchema: ImproveCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
