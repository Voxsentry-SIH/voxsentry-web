/**
 * Safe abstraction for browser native Speech Synthesis (TTS)
 */

export class TTSService {
  private synthesis: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synthesis = window.speechSynthesis;
      
      // Load voices immediately if available
      this.loadVoices();
      
      // Chrome sometimes requires listening to the event to get voices
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = this.loadVoices.bind(this);
      }
    }
  }

  private loadVoices() {
    if (this.synthesis) {
      this.voices = this.synthesis.getVoices();
    }
  }

  /**
   * Speak the text using the best matching voice for the target language
   */
  speak(text: string, lang: string, onEnd?: () => void, onError?: (err: string) => void) {
    if (!this.synthesis) {
      if (onError) onError("Speech Synthesis is not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    if (!text || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Attempt to find a native-sounding voice for the language
    if (this.voices.length > 0) {
      const targetPrefix = lang.split("-")[0].toLowerCase();
      // Try exact match first
      let voice = this.voices.find(v => v.lang === lang || v.lang.replace("_", "-") === lang);
      
      // Try prefix match next
      if (!voice) {
        voice = this.voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
      }
      
      if (voice) {
        utterance.voice = voice;
      }
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    if (onError) {
      utterance.onerror = (e) => onError(`Speech synthesis failed: ${e.error}`);
    }

    this.synthesis.speak(utterance);
  }

  stop() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

// Export a singleton instance for easier usage
export const ttsService = new TTSService();
