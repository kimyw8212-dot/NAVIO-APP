import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction:
          "당신은 NAVIO 앱의 AI 여행 도우미입니다. 여행 계획, 맛집, 관광지, 교통, 숙소 등 여행과 관련된 질문에 친절하고 간결하게 한국어로 답변해 주세요.",
      },
      history: (history ?? []).map((m: { role: string; text: string }) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    const text = result.text;

    return NextResponse.json({ text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Gemini Error]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
