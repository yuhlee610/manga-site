import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Manga, MangaStatistic } from '../../../models/mangadex';
import { CoverArtPipe } from '../../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../pipes/image-alt/image-alt.pipe';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TagComponent } from '../../../components/tag/tag.component';
import { UpdatedAtPipe } from '../../../pipes/updated-at/updated-at.pipe';
import { NzSpaceModule } from 'ng-zorro-antd/space';

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
    NzSpaceModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  mangaList = input.required<Manga[]>();
  statistics = input<Record<string, MangaStatistic>[]>();
  statisticObj = computed(() => this.statistics()?.reduce((acc, val) => ({ ...acc, ...val }), {}));
}
