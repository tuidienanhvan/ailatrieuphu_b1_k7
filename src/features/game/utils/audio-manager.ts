import { BaseAudioEngine } from '../../../common/utils/BaseAudioEngine';

export type SoundType = 'correct' | 'wrong' | 'lifeline' | 'win' | 'lose' | 'select' | 'start' | 'tick' | 'heartbeat';

class AudioManager extends BaseAudioEngine {
  private ambientNodes: { osc: OscillatorNode[], gain: GainNode } | null = null;

  playAmbient() {
    try {
      if (this.ambientNodes) return;
      const ctx = this.getContext();
      if (ctx.state === 'suspended' && this.unlocked) ctx.resume();

      const now = ctx.currentTime;
      const ambientGain = ctx.createGain();

      ambientGain.gain.setValueAtTime(0, now);
      ambientGain.gain.linearRampToValueAtTime(0.15, now + 2);
      ambientGain.connect(this.masterGain!);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 80;
      osc1.connect(ambientGain);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 82;
      osc2.connect(ambientGain);

      osc1.start(now);
      osc2.start(now);

      this.ambientNodes = { osc: [osc1, osc2], gain: ambientGain };
    } catch (e) { console.error("Ambient error", e); }
  }

  stopAmbient() {
    if (!this.ambientNodes) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      this.ambientNodes.gain.gain.cancelScheduledValues(now);
      this.ambientNodes.gain.gain.setValueAtTime(this.ambientNodes.gain.gain.value, now);
      this.ambientNodes.gain.gain.linearRampToValueAtTime(0, now + 0.5);

      const oscs = this.ambientNodes.osc;
      setTimeout(() => {
        oscs.forEach(o => { try { o.stop(); o.disconnect(); } catch { } });
      }, 600);

      this.ambientNodes = null;
    } catch (e) { console.error("Stop ambient error", e); }
  }

  playSound(type: SoundType) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      switch (type) {
        case 'start':
          [261.63, 329.63, 392.00, 523.25].forEach((f, i) => this.createOscillator(f, 'triangle', now + i * 0.1, 1, 0.2));
          break;
        case 'select':
          this.createOscillator(880, 'sine', now, 0.1, 0.1);
          break;
        case 'correct':
          this.createOscillator(523.25, 'sine', now, 0.6, 0.2);
          this.createOscillator(659.25, 'sine', now + 0.1, 0.6, 0.2);
          this.createOscillator(783.99, 'sine', now + 0.2, 0.8, 0.2);
          break;
        case 'wrong':
          const oscW = ctx.createOscillator();
          const gainW = ctx.createGain();
          oscW.type = 'sawtooth';
          oscW.frequency.setValueAtTime(110, now);
          oscW.frequency.exponentialRampToValueAtTime(55, now + 0.5);
          gainW.gain.setValueAtTime(0.3, now);
          gainW.gain.linearRampToValueAtTime(0, now + 0.6);
          oscW.connect(gainW);
          gainW.connect(this.masterGain!);
          oscW.start();
          oscW.stop(now + 0.6);
          break;
        case 'lifeline':
          for (let i = 0; i < 8; i++) this.createOscillator(1000 + i * 200, 'sine', now + i * 0.05, 0.3, 0.1);
          break;
        case 'tick':
          const oscT = ctx.createOscillator();
          const gainT = ctx.createGain();
          oscT.type = 'sine';
          oscT.frequency.setValueAtTime(1000, now);
          gainT.gain.cancelScheduledValues(now);
          gainT.gain.setValueAtTime(0, now);
          gainT.gain.linearRampToValueAtTime(0.7, now + 0.02);
          gainT.gain.linearRampToValueAtTime(0.001, now + 0.1);
          oscT.connect(gainT);
          gainT.connect(this.masterGain!);
          oscT.start(now);
          oscT.stop(now + 0.12);
          break;
        case 'heartbeat':
          const oscH = ctx.createOscillator();
          const gainH = ctx.createGain();
          oscH.type = 'sine';
          oscH.frequency.setValueAtTime(150, now);
          oscH.frequency.exponentialRampToValueAtTime(40, now + 0.15);
          gainH.gain.cancelScheduledValues(now);
          gainH.gain.setValueAtTime(0, now);
          gainH.gain.linearRampToValueAtTime(1.0, now + 0.01);
          gainH.gain.linearRampToValueAtTime(0.001, now + 0.5);
          oscH.connect(gainH);
          gainH.connect(this.masterGain!);
          oscH.start(now);
          oscH.stop(now + 0.6);
          break;
        case 'win':
          const chords = [523.25, 659.25, 783.99, 1046.50];
          for (let j = 0; j < 3; j++) chords.forEach((f, i) => this.createOscillator(f, 'triangle', now + j * 0.6 + i * 0.1, 0.5, 0.15));
          break;
        case 'lose':
          [220, 207, 196, 185].forEach((f, i) => this.createOscillator(f, 'sawtooth', now + i * 0.2, 0.8, 0.1));
          break;
      }
    } catch (e) { console.error("SFX error", e); }
  }
}

export const audioManager = new AudioManager();

export const playSound = (type: SoundType) => audioManager.playSound(type);
export const playAmbient = () => audioManager.playAmbient();
export const stopAmbient = () => audioManager.stopAmbient();
