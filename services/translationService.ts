/**
 * Uses a free public API for translation to avoid needing backend API keys.
 * Note: MyMemory allows 500 words/day free without a key.
 */

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (!text || text.trim() === "") return "";
  if (sourceLang === targetLang) return text;

  try {
    // Convert e.g., 'en-US' -> 'en', 'hi-IN' -> 'hi'
    const source = sourceLang.split("-")[0];
    const target = targetLang.split("-")[0];

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
    );

    if (!response.ok) {
      throw new Error(`Translation API returned ${response.status}`);
    }

    const data = await response.json();
    
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    throw new Error("Translation service unavailable. Please try again later.");
  }
}
