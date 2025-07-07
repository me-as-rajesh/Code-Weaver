'use server';

/**
 * @fileOverview This file defines a Genkit flow for converting code from one language to another.
 *
 * - convertCode - A function that takes code and a target language and returns the converted code.
 * - ConvertCodeInput - The input type for the convertCode function.
 * - ConvertCodeOutput - The return type for the convertCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertCodeInputSchema = z.object({
  inputCode: z.string().describe('The code to convert.'),
  targetLanguage: z.string().describe('The language to convert the code to.'),
});
export type ConvertCodeInput = z.infer<typeof ConvertCodeInputSchema>;

const ConvertCodeOutputSchema = z.object({
  convertedCode: z
    .string()
    .describe(
      'The converted code, without any markdown formatting or explanations.'
    ),
});
export type ConvertCodeOutput = z.infer<typeof ConvertCodeOutputSchema>;

export async function convertCode(
  input: ConvertCodeInput
): Promise<ConvertCodeOutput> {
  return convertCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertCodePrompt',
  input: {schema: ConvertCodeInputSchema},
  output: {schema: ConvertCodeOutputSchema},
  prompt: `You are an expert programmer and code conversion specialist.
You will be given a piece of code and a target language. Your task is to convert the code to the specified language.
The source language will be automatically detected.

Do not add any explanations, comments, or markdown formatting like \`\`\`language. Only return the raw converted code.

Source Code:
\`\`\`
{{inputCode}}
\`\`\`

Target Language: {{targetLanguage}}
`,
});

const convertCodeFlow = ai.defineFlow(
  {
    name: 'convertCodeFlow',
    inputSchema: ConvertCodeInputSchema,
    outputSchema: ConvertCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
