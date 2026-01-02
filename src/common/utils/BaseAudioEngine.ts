
export class BaseAudioEngine {
    protected context: AudioContext | null = null;
    protected masterGain: GainNode | null = null;
    protected unlocked = false;
    protected wasRunningBeforeHidden = false;

    constructor() { }

    protected getContext(): AudioContext {
        if (!this.context || this.context.state === 'closed') {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContextClass();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
        }
        return this.context;
    }

    async unlock(): Promise<void> {
        if (this.unlocked) return;
        const ctx = this.getContext();
        if (ctx.state === 'suspended') {
            try {
                await ctx.resume();
                this.unlocked = true;
            } catch (e) {
                console.warn("Audio unlock failed", e);
            }
        } else {
            this.unlocked = true;
        }
    }

    async pause(): Promise<void> {
        if (this.context && this.context.state === 'running') {
            this.wasRunningBeforeHidden = true;
            await this.context.suspend();
        }
    }

    async resume(): Promise<void> {
        if (this.context && this.wasRunningBeforeHidden && this.context.state === 'suspended') {
            await this.context.resume();
            this.wasRunningBeforeHidden = false;
        }
    }

    protected createOscillator(
        freq: number,
        oscType: OscillatorType,
        startTime: number,
        duration: number,
        volume: number
    ) {
        const ctx = this.getContext();
        if (ctx.state === 'suspended' && this.unlocked) ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    destroy() {
        if (this.context && this.context.state !== 'closed') {
            this.context.close();
        }
    }
}
