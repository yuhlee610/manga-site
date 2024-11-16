import { Component, input } from '@angular/core';
import { Manga } from '../../../../models/mangadex';
import { History } from '../../../../models/history';
import { CoverArtPipe } from '../../../../shared/pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../../shared/pipes/image-alt/image-alt.pipe';
import { MangaTitlePipe } from '../../../../shared/pipes/manga-title/manga-title.pipe';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [
    CoverArtPipe,
    ImageAltPipe,
    MangaTitlePipe,
    NzTypographyModule,
    RouterLink,
    DatePipe,
    NzFlexModule,
    NgOptimizedImage,
  ],
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.scss',
})
export class HistoryCardComponent {
  manga = input<Manga>();
  chapter = input<History[string]>();
}
