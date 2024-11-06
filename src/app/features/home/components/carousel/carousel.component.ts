import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RouterLink } from '@angular/router';
import { CoverArtPipe } from '../../../../shared/pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../../shared/pipes/image-alt/image-alt.pipe';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { UpdatedAtPipe } from '../../../../shared/pipes/updated-at/updated-at.pipe';
import { MangaTitlePipe } from '../../../../shared/pipes/manga-title/manga-title.pipe';
import { Manga, MangaStatistic } from '../../../../models/mangadex';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CoverArtPipe,
    ImageAltPipe,
    NgOptimizedImage,
    NzIconModule,
    NzCarouselModule,
    NzTypographyModule,
    NzGridModule,
    NzFlexModule,
    TagComponent,
    UpdatedAtPipe,
    DecimalPipe,
    NzSpaceModule,
    RouterLink,
    MangaTitlePipe,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  mangaList = input.required<Manga[]>();
  statistics = input<Record<string, MangaStatistic>>();
}
