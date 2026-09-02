export async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  if (!text || !text.trim()) return "";
  if (sourceLang === targetLang) return text;
  
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    if (!response.ok) {
      throw new Error("Translation service unavailable");
    }
    const data = await response.json();
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    throw new Error("Invalid translation response");
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Translation service unavailable");
  }
}
