import { Component, input } from '@angular/core';
import { Manga, MangaStatistic } from '../../models/mangadex';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { CoverArtPipe } from '../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../pipes/image-alt/image-alt.pipe';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-rank-manga-card',
  standalone: true,
  imports: [
    NzFlexModule,
    DecimalPipe,
    NgOptimizedImage,
    CoverArtPipe,
    ImageAltPipe,
    NzTypographyModule,
    NzSpaceModule,
    NzIconModule,
  ],
  templateUrl: './rank-manga-card.component.html',
  styleUrl: './rank-manga-card.component.scss',
})
export class RankMangaCardComponent {
  manga = input.required<Manga>();
  statistic = input<MangaStatistic>();
  rank = input.required<number>();
}
