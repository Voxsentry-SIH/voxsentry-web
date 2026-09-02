/**
 * Safe abstraction for browser native Speech Recognition
 */

export interface SpeechServiceOptions {
  language?: string;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export class SpeechService {
  private recognition: any = null;
  private isRecording = false;

  constructor(private options: SpeechServiceOptions) {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (options.onError) {
          options.onError("Speech Recognition API is not supported in this browser. Please use Chrome or Safari.");
        }
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = options.language || "en-US";

      this.recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const isFinal = finalTranscript.length > 0;
        const currentText = isFinal ? finalTranscript : interimTranscript;
        
        if (currentText.trim() !== "") {
          this.options.onResult(currentText, isFinal);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        this.isRecording = false;
        if (this.options.onError) {
          this.options.onError(`Microphone error: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        if (this.options.onEnd) {
          this.options.onEnd();
        }
      };
    }
  }

  start() {
    if (!this.recognition) return;
    try {
      this.recognition.start();
      this.isRecording = true;
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
    }
  }

  stop() {
    if (!this.recognition || !this.isRecording) return;
    try {
      this.recognition.stop();
      this.isRecording = false;
    } catch (err) {
      console.error("Failed to stop speech recognition:", err);
    }
  }
}
