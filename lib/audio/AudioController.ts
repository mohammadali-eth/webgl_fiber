/**
 * ALIDEV Audio Architecture Controller
 * Prepares sound engine interfaces for future audio implementation (Ambient City, Scene Transitions, UI SFX).
 */

export interface SoundTrack {
  id: string;
  src: string;
  volume: number;
  loop: boolean;
}

export class AudioController {
  private static instance: AudioController;
  public isMuted = true;
  private activeTracks: Map<string, HTMLAudioElement> = new Map();
  private masterVolume = 1.0;

  private constructor() {
    // Audio engine prepared for future phase loading
  }

  public static getInstance(): AudioController {
    if (!AudioController.instance) {
      AudioController.instance = new AudioController();
    }
    return AudioController.instance;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.activeTracks.forEach((audio) => {
      audio.muted = this.isMuted;
    });
    return this.isMuted;
  }

  public playSoundEffect(id: string, volume = 0.5) {
    if (this.isMuted || typeof window === 'undefined') return;
    // Reserved for future audio dispatching
    const track = this.activeTracks.get(id);
    if (track) {
      track.volume = volume * this.masterVolume;
    }
  }

  public setAmbientVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }
}

export default AudioController;
