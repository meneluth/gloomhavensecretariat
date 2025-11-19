import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
    standalone: false,
    selector: '[soundboard]'
})
export class SoundboardDirective implements OnInit {
    @Input('soundboard') soundName!: string;

    private readonly sounds = [
        'bane.mp3',
        'bell.mp3',
        'brittle.mp3',
        'disarm.mp3',
        'immobilize.mp3',
        'muddle.mp3',
        'poison.mp3',
        'punch.mp3',
        'reveal.mp3',
        'stun.mp3',
        'wound.mp3',
    ];

    private audio!: HTMLAudioElement;

    ngOnInit() {
        if (!this.sounds.includes(this.soundName)) {
            return;
        }
        if (!document.getElementById(`preload-${this.soundName}`)) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'audio';
            link.href = `assets/audio/${this.soundName}`;
            link.id = `preload-${this.soundName}`;
            document.querySelector('head')?.appendChild(link);
        }
    }

    @HostListener('click')
    async playSound() {
        if (!this.sounds.includes(this.soundName)) {
            return;
        }
        this.audio = new Audio(`assets/audio/${this.soundName}`);
        await this.audio.play();
    }
}