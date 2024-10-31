import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MangaService } from '../../services/manga/manga.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Manga } from '../../models/mangadex';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [NzGridModule, NgOptimizedImage],
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent {
  mangaService = inject(MangaService);
  mangaId = input.required<string>();
  manga = signal<Manga | undefined>(undefined);

  ngOnInit() {
    this.mangaService.getManga(this.mangaId()).subscribe({
      next: data => {
        console.log(data);
      },
    });
  }
}
