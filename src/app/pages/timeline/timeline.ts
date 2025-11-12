import { Component, AfterViewInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { MEMORIES } from '../../data/memories';
import { Memory } from '../../models/memory.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss']
})
export class TimelineComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  // 👇 AQUÍ están las propiedades que faltaban
  memories: (Memory & { visible?: boolean })[] = MEMORIES.map(m => ({ ...m, visible: false }));
  expanded: boolean[] = this.memories.map(() => false);

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser) return;
    const elements = document.querySelectorAll('.content');
    elements.forEach((el, i) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) this.memories[i].visible = true;
    });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.onScroll(); // disparo inicial
  }

  toggleExpand(i: number) {
    if (!this.isBrowser) return;
    this.expanded[i] = !this.expanded[i];
  }
}
