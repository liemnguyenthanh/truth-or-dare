// Sound effect URLs (using free sounds from mixkit.co)
const SOUND_URLS = {
  spin: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  win: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private initialized = false;
  private loading = false;

  constructor() {
    // Không khởi tạo ngay lập tức
  }

  // Lazy load sounds khi cần
  async initialize() {
    if (this.initialized || this.loading || typeof window === 'undefined')
      return;

    this.loading = true;

    try {
      await Promise.all(
        Object.entries(SOUND_URLS).map(async ([key, url]) => {
          this.sounds[key] = new Audio(url);
          // Preload audio
          this.sounds[key].preload = 'none'; // Chỉ load khi cần
        })
      );

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize sounds:', error);
    } finally {
      this.loading = false;
    }
  }

  async play(soundName: keyof typeof SOUND_URLS) {
    if (!this.initialized) {
      await this.initialize();
    }

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
