import OpenAI from "openai";

// Instanciez OpenAI côté serveur, jamais côté navigateur
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
   apiKey: "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",
  dangerouslyAllowBrowser: true
});

/**
 * Nettoie le JSON renvoyé par GPT (supprime ```json ... ``` ou backticks)
 */
function cleanJSONFromGPT(content: string): string {
  return content
    .replace(/```json\s*/g, "")
    .replace(/```/g, "")
    .replace(/`/g, "")
    .trim();
}

/**
 * Traduit plusieurs textes en une seule requête GPT-OSS-20B.
 * Conserve la structure JSON d’origine.
 */
export async function translateTextGroup(
  texts: Record<string, string>,
  targetLang: string
) {
  console.log(`Envoi unique vers GPT-OSS-20B (${targetLang.toUpperCase()}) :`, texts);

  try {
    const jsonToTranslate = JSON.stringify(texts, null, 2);

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content: `
You are a professional translator. 
Translate only the **values** of the provided JSON into the requested language, keeping the **keys and JSON structure** exactly identical.

⚠️ Special rule for Arabic (ar):
- Always translate the English or French word "clinic didon" or "Clinique" as "مصحة ديدون".
- Do not use "عيادة".
- Preserve emojis and punctuation.
- Keep the JSON format valid.
          `,
        },
        {
          role: "user",
          content: `Translate this JSON to ${targetLang.toUpperCase()}:\n${jsonToTranslate}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    const rawContent = completion.choices[0].message?.content || "";
    const cleanedContent = cleanJSONFromGPT(rawContent);

    let parsed: Record<string, string> = texts;
    try {
      parsed = JSON.parse(cleanedContent);
    } catch (e) {
      console.warn("Impossible de parser le JSON GPT, retour original :", e);
    }

    console.log("Réponse GPT-OSS-20B groupée :", parsed);
    return parsed;
  } catch (err: any) {
    console.error("Erreur GPT-OSS-20B (grouped):", err.response?.data || err.message);
    return texts;
  }
}
