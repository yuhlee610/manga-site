import { Component, input } from '@angular/core';
import { Manga, MangaStatistic } from '../../../models/mangadex';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { CoverArtPipe } from '../../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../pipes/image-alt/image-alt.pipe';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MangaTitlePipe } from '../../../pipes/manga-title/manga-title.pipe';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TagComponent } from '../../../components/tag/tag.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MangaStatusPipe } from '../../../pipes/manga-status/manga-status.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SpaceDirective } from '../../../directives/space/space.directive';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CoverArtPipe,
    ImageAltPipe,
    NzTypographyModule,
    MangaTitlePipe,
    NzFlexModule,
    TagComponent,
    NzIconModule,
    MangaStatusPipe,
    DecimalPipe,
    NzButtonModule,
    SpaceDirective,
  ],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  manga = input.required<Manga>();
  statistic = input.required<MangaStatistic>();
}
