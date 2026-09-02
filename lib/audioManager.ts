/**
 * Singleton to track the active global audio session
 * to prevent conflicting microphone usage between modes.
 */

type SessionType = "detect" | "stt" | "sts" | null;

let activeSession: SessionType = null;
let stopCurrentSessionCallback: (() => void) | null = null;

export const audioManager = {
  /**
   * Request to start a new audio session.
   * If another session is active, it will be forcefully stopped.
   */
  requestSession(type: SessionType, stopCallback: () => void) {
    if (activeSession && activeSession !== type) {
      if (stopCurrentSessionCallback) {
        stopCurrentSessionCallback();
      }
    }
    activeSession = type;
    stopCurrentSessionCallback = stopCallback;
  },

  /**
   * Clear the active session if it matches the caller type.
   */
  clearSession(type: SessionType) {
    if (activeSession === type) {
      activeSession = null;
      stopCurrentSessionCallback = null;
    }
  },
  
  /**
   * Force stop everything (e.g. when unmounting the whole demo page)
   */
  stopAll() {
    if (stopCurrentSessionCallback) {
      stopCurrentSessionCallback();
    }
    activeSession = null;
    stopCurrentSessionCallback = null;
  }
};
