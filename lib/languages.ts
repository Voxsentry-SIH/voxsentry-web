export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", ttsVoice: "en-US" },
  { code: "hi", name: "Hindi", ttsVoice: "hi-IN" },
  { code: "bn", name: "Bengali", ttsVoice: "bn-IN" },
  { code: "ta", name: "Tamil", ttsVoice: "ta-IN" },
  { code: "te", name: "Telugu", ttsVoice: "te-IN" },
  { code: "mr", name: "Marathi", ttsVoice: "mr-IN" },
  { code: "gu", name: "Gujarati", ttsVoice: "gu-IN" },
  { code: "kn", name: "Kannada", ttsVoice: "kn-IN" },
  { code: "ml", name: "Malayalam", ttsVoice: "ml-IN" },
  { code: "pa", name: "Punjabi", ttsVoice: "pa-IN" },
  { code: "ur", name: "Urdu", ttsVoice: "ur-PK" },
  { code: "fr", name: "French", ttsVoice: "fr-FR" },
  { code: "de", name: "German", ttsVoice: "de-DE" },
  { code: "es", name: "Spanish", ttsVoice: "es-ES" },
  { code: "pt", name: "Portuguese", ttsVoice: "pt-BR" },
  { code: "ar", name: "Arabic", ttsVoice: "ar-SA" },
  { code: "zh", name: "Chinese", ttsVoice: "zh-CN" },
  { code: "ja", name: "Japanese", ttsVoice: "ja-JP" },
  { code: "ko", name: "Korean", ttsVoice: "ko-KR" },
  { code: "ru", name: "Russian", ttsVoice: "ru-RU" },
];

export function getLanguageName(code: string): string {
  return SUPPORTED_LANGUAGES.find(l => l.code === code)?.name || code;
}

export function getLanguageCode(name: string): string {
  return SUPPORTED_LANGUAGES.find(l => l.name === name)?.code || "en";
}

export function getTTSVoice(code: string): string {
  return SUPPORTED_LANGUAGES.find(l => l.code === code)?.ttsVoice || "en-US";
}
