'use server';

/**
 * @fileOverview Generates code based on a prompt.
 *
 * - generateCode - A function that generates code based on a prompt.
 * - GenerateCodeInput - The input type for the generateCode function.
 * - GenerateCodeOutput - The return type for the generateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const generateImage = ai.defineTool(
  {
    name: 'generateImage',
    description: 'Generates an image based on a text prompt and returns it as a data URI. Use this when the user asks for a picture, photo, or image.',
    inputSchema: z.object({
      prompt: z.string().describe('A detailed text description of the image to generate.'),
    }),
    outputSchema: z.string().describe('The generated image as a data:image/png;base64,... URI.'),
  },
  async ({prompt}) => {
    console.log(`Generating image for prompt: ${prompt}`);
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A high-quality, photorealistic image for a website component: ${prompt}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    console.log('Image generated.');
    if (!media) {
      throw new Error('Image generation failed to return media.');
    }
    return media.url;
  }
);


const GenerateCodeInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate code from.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  code: z.string().describe('The generated code.'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;

export async function generateCode(input: GenerateCodeInput): Promise<GenerateCodeOutput> {
  return generateCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeInputSchema},
  output: {schema: GenerateCodeOutputSchema},
  tools: [generateImage],
  prompt: `You are an expert web developer that creates a single HTML file with inline CSS and JS if necessary.
Generate HTML code based on the following prompt:
"{{prompt}}"

Instructions:
- If the user's prompt implies needing an image (e.g., "a banner with a picture of a cat", "a hero image for a travel site"), use the generateImage tool to create a relevant image.
- When you use the generateImage tool, use the image's data URI in the 'src' attribute of an <img> tag.
- Do not add any explanation, just the code.
- Ensure the generated HTML is a single, complete block.
- Do not use placeholder images (e.g. from placehold.co). Always use the generateImage tool if an image is needed.
- If you generate an image, make sure the <img> tag has some basic styling to make it look good (e.g., width: 100%, height: auto, object-fit: cover, border-radius: 0.5rem).
`,
});

const generateCodeFlow = ai.defineFlow(
  {
    name: 'generateCodeFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
