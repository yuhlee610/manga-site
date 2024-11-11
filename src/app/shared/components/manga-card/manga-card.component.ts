import { Component, input } from '@angular/core';
import { Chapter, Manga, MangaStatistic } from '../../../models/mangadex';
import { RouterLink } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SpaceDirective } from '../../directives/space/space.directive';
import { DecimalPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CoverArtPipe } from '../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../pipes/image-alt/image-alt.pipe';
import { MangaTitlePipe } from '../../pipes/manga-title/manga-title.pipe';
import { UpdatedAtPipe } from '../../pipes/updated-at/updated-at.pipe';

@Component({
  selector: 'app-manga-card',
  standalone: true,
  imports: [
    CoverArtPipe,
    ImageAltPipe,
    RouterLink,
    MangaTitlePipe,
    NzTypographyModule,
    SpaceDirective,
    DecimalPipe,
    NzIconModule,
    UpdatedAtPipe,
    RouterLink,
  ],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  manga = input.required<Manga>();
  statistic = input<MangaStatistic>();
  latestChapter = input<Chapter>();
}
