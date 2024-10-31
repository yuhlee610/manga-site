import { Component, input } from '@angular/core';
import { Manga, MangaStatistic } from '../../models/mangadex';
import { CoverArtPipe } from '../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../pipes/image-alt/image-alt.pipe';

@Component({
  selector: 'app-manga-card',
  standalone: true,
  imports: [CoverArtPipe, ImageAltPipe],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  manga = input.required<Manga>();
  statistic = input<MangaStatistic>();
}
