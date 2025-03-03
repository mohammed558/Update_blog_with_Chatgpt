// backend/services/openaiService.js
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function enhanceContent(originalContent) {
  const messages = [
    {
      role: 'system',
      content: 'You are an expert copywriter who improves blog content for clarity and engagement.',
    },
    {
      role: 'user',
      content: `Rewrite the content in humanized language and  seo friendly manner in 2000 words or more : 

"${originalContent}"`,
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Use 'gpt-3.5-turbo' if needed
      messages: messages,
      max_tokens: 2048,
      temperature: 0.7,
    });

    const enhancedContent = response.choices[0].message.content.trim();
    return enhancedContent;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(
      error.message || 'Failed to enhance content using OpenAI API.'
    );
  }
}
