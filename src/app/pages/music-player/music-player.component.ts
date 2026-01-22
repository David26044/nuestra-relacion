import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Song = { title: string; url: string };

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements AfterViewInit {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  playlist: Song[] = [
    { title: 'Chachachá - Josean Log', url: 'assets/music/chachacha.mp3' },
    { title: 'Por el resto de mi vida - Andres Cepeda', url: 'assets/music/por-el-resto-de-mi-vida.mp3' },
    { title: 'Mami - Romeo Santos', url: 'assets/music/mami.mp3' },
  ];

  currentSongIndex = 0;
  isPlaying = false;
  isMinimized = false;
  showPlaylist = false;

  // Estado interno para hacer cambios “spotify-style”
  private pendingAutoplay = false;

  get currentSong(): Song {
    return this.playlist[this.currentSongIndex];
  }

  ngAfterViewInit() {
    const player = this.audioPlayerRef.nativeElement;

    // ⚡ para que cargue más rápido
    player.preload = 'auto';
    player.volume = 0.3;

    // Cuando el navegador ya puede reproducir, si estaba pendiente autoplay -> play
    player.addEventListener('canplaythrough', () => {
      if (this.pendingAutoplay) {
        this.pendingAutoplay = false;
        player.play()
          .then(() => (this.isPlaying = true))
          .catch(() => (this.isPlaying = false));
      }
    });

    // Carga la primera
    player.load();

    // Pre-carga la siguiente
    this.preloadNext();
  }

  togglePlay() {
    const player = this.audioPlayerRef.nativeElement;

    if (this.isPlaying) {
      player.pause();
      this.isPlaying = false;
    } else {
      player.play()
        .then(() => (this.isPlaying = true))
        .catch(() => (this.isPlaying = false));
    }
  }

  nextSong() {
    const wasPlaying = this.isPlaying;
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.changeSong(wasPlaying);
  }

  prevSong() {
    const wasPlaying = this.isPlaying;
    this.currentSongIndex =
      (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.changeSong(wasPlaying);
  }

  selectSong(index: number) {
    const wasPlaying = this.isPlaying;
    this.currentSongIndex = index;
    this.changeSong(wasPlaying);
  }

  /**
   * Cambio de canción “Spotify style”:
   * - Si venía sonando -> intenta reproducir apenas esté listo
   * - Si estaba pausado -> solo carga (sin autoplay)
   */
  changeSong(autoplay: boolean) {
    const player = this.audioPlayerRef.nativeElement;

    // Reset del estado
    this.isPlaying = false;
    this.pendingAutoplay = autoplay;

    // Cambiar fuente: el [src] del template cambia solo, pero igual forzamos carga
    player.pause();
    player.currentTime = 0;

    // Forzar carga inmediata del nuevo audio
    player.load();

    // Intento inmediato (a veces funciona sin esperar eventos)
    if (autoplay) {
      player.play()
        .then(() => {
          this.pendingAutoplay = false;
          this.isPlaying = true;
        })
        .catch(() => {
          // Si falla porque aún no está listo, canplaythrough lo dispara después
          this.isPlaying = false;
        });
    }

    // Pre-cargar la siguiente para minimizar delays
    this.preloadNext();
  }

  onSongEnded() {
    this.nextSong();
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    if (this.isMinimized) this.showPlaylist = false;
  }

  togglePlaylist() {
    this.showPlaylist = !this.showPlaylist;
  }

  trackByIndex(index: number) {
    return index;
  }

  /**
   * Pre-carga la siguiente canción en segundo plano
   * (esto reduce la demora al cambiar)
   */
  private preloadNext() {
    const nextIndex = (this.currentSongIndex + 1) % this.playlist.length;
    const nextUrl = this.playlist[nextIndex]?.url;
    if (!nextUrl) return;

    const a = new Audio();
    a.preload = 'auto';
    a.src = nextUrl;
    // Solo con asignar src + preload ya empieza a cachear.
  }
}
