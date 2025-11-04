import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

const API_KEY = "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";


/**
 * Traduit plusieurs textes en une seule requête GPT-4o-mini.
 * Conserve la structure JSON d’origine.
 */
export async function translateTextGroup(
    texts: Record<string, string>,
    targetLang: string
) {
    console.log(` Envoi unique vers GPT-4o (${targetLang.toUpperCase()}) :`, texts);

    try {
        const jsonToTranslate = JSON.stringify(texts, null, 2);

        const res = await axios.post(
            API_URL,
            {
                model: "gpt-4o-mini",
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
                max_tokens: 800,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = res.data.choices[0].message.content.trim();
        const parsed = JSON.parse(content);
        console.log(" Réponse GPT-4o groupée :", parsed);

        return parsed;
    } catch (err: any) {
        console.error(" Erreur OpenAI (grouped):", err.response?.data || err.message);
        return texts;
    }
}
