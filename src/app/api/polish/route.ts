import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "../.././../db";
import { generations } from "../../../db/schema";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { text, tone } = await req.json();

    if (!text || !tone) {
      return NextResponse.json(
        { error: "Missing text or tone" },
        { status: 400 },
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a strict text transformation filter. Your only purpose is to take the input text and rewrite it to match the requested tone (${tone}). CRITICAL RULE: You MUST output the result in the EXACT SAME LANGUAGE as the input text provided by the user. Do NOT translate it to English unless the input was in English. Output ONLY the transformed text, no quotes, no explanations.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.3,
    });

    const polishedText = completion.choices[0]?.message?.content?.trim() || "";
    await db.insert(generations).values({
      originalText: text,
      polishedText,
      tone,
    });

    return NextResponse.json({ success: true, polishedText });
  } catch (error) {
    console.error("Error polishing text with Groq:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
