import { Component, HostListener, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { MEMORIES } from '../../data/memories'; 
import { Memory } from '../../models/memory.model';
import { MusicPlayerComponent } from '../music-player/music-player.component'; 

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, DatePipe, MusicPlayerComponent], // Verifica que MusicPlayerComponent no tenga errores internos
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  // Mapeo inicial
  memories: (Memory & { visible?: boolean })[] = MEMORIES.map(m => ({ ...m, visible: false }));
  
  expanded: boolean[] = [];

  ngOnInit() {
    this.expanded = new Array(this.memories.length).fill(false);
    
    if (this.isBrowser) {
      setTimeout(() => this.checkScroll(), 100); 
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  checkScroll() {
    if (!this.isBrowser) return;

    const windowHeight = window.innerHeight;
    const elements = document.querySelectorAll('.timeline-row');

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.85) {
        if (this.memories[index]) {
          this.memories[index].visible = true;
        }
      }
    });
  }

  toggleExpand(index: number) {
    this.expanded[index] = !this.expanded[index];
  }
}