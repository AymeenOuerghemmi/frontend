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

Translate only the values of the JSON.
DO NOT translate proper names or personal names (prenom/nom/patientName).
Keep the JSON structure and keys unchanged.

For Arabic (ar):
- Translate "clinic didon" or "Clinique" as "مصحة ديدون"
- Do not use "عيادة".
- Keep emojis.
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
