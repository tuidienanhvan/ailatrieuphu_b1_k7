/**
 * @game/audio/BaseAudioEngine.ts
 * Base audio engine for Web Audio API integration
 */

/**
 * Base class for audio operations using Web Audio API
 * Handles context creation, unlocking, and basic oscillator generation
 */
export class BaseAudioEngine {
  protected context: AudioContext | null = null;
  protected masterGain: GainNode | null = null;
  protected unlocked = false;
  protected wasRunningBeforeHidden = false;

  constructor() {}

  /**
   * Get or create AudioContext
   */
  protected getContext(): AudioContext {
    if (!this.context || this.context.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
    }
    return this.context;
  }

  /**
   * Unlock audio context for playback
   * Required on iOS and some browsers before audio can play
   */
  async unlock(): Promise<void> {
    if (this.unlocked) return;

    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
        this.unlocked = true;
      } catch (e) {
        console.warn('Audio unlock failed', e);
      }
    } else {
      this.unlocked = true;
    }
  }

  /**
   * Pause audio context (e.g., when page becomes hidden)
   */
  async pause(): Promise<void> {
    if (this.context && this.context.state === 'running') {
      this.wasRunningBeforeHidden = true;
      await this.context.suspend();
    }
  }

  /**
   * Resume audio context
   */
  async resume(): Promise<void> {
    if (
      this.context &&
      this.wasRunningBeforeHidden &&
      this.context.state === 'suspended'
    ) {
      await this.context.resume();
      this.wasRunningBeforeHidden = false;
    }
  }

  /**
   * Create an oscillator with envelope
   * Frequency ramps up, then exponentially decays to zero
   *
   * @param freq - Frequency in Hz
   * @param oscType - Oscillator type (sine, square, sawtooth, triangle)
   * @param startTime - Start time in seconds
   * @param duration - Duration in seconds
   * @param volume - Peak volume (0-1)
   */
  protected createOscillator(
    freq: number,
    oscType: OscillatorType,
    startTime: number,
    duration: number,
    volume: number
  ) {
    const ctx = this.getContext();

    // Resume if suspended but unlocked
    if (ctx.state === 'suspended' && this.unlocked) {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Setup oscillator
    osc.type = oscType;
    osc.frequency.setValueAtTime(freq, startTime);

    // Setup envelope
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Connect nodes
    osc.connect(gain);
    gain.connect(this.masterGain!);

    // Play
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * Cleanup audio context
   */
  destroy() {
    if (this.context && this.context.state !== 'closed') {
      this.context.close();
    }
  }
}
