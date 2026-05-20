import "dotenv/config";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export const analyzeFeedback = async (message: string) => {
  try {
    const prompt = `
Analyze the customer feedback and return ONLY valid JSON.

Fields:
- sentiment: positive | negative | neutral | mixed
- category: bug | feature_request | pricing | usability | support | praise | other
- urgency: low | medium | high | critical
- summary: max 25 words
- key_topics: array of 1-3 short tags

Feedback:
"${message}"

Return ONLY valid JSON.
`;

    const completion = await client.chat.completions.create({
   model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const text =
      completion.choices[0]?.message?.content || "";

    const cleanedResponse = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedResponse);

    return parsedData;
  } catch (error) {
    console.log("AI Error:", error);

    return {
      sentiment: "neutral",
      category: "other",
      urgency: "low",
      summary: "AI analysis failed",
      key_topics: [],
    };
  }
};