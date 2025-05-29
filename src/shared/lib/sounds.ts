// Sound effect URLs (using free sounds from mixkit.co)
const SOUND_URLS = {
  spin: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  win: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      Object.entries(SOUND_URLS).forEach(([key, url]) => {
        this.sounds[key] = new Audio(url);
      });
      this.initialized = true;
    }
  }

  play(soundName: keyof typeof SOUND_URLS) {
    if (!this.initialized) return;

    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors - some browsers block autoplay
      });
    }
  }

  stop(soundName: keyof typeof SOUND_URLS) {
    if (!this.initialized) return;

    const sound = this.sounds[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
}

export const soundManager = new SoundManager();
