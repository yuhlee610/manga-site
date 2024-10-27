import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Manga } from '../../../models/mangadex';
import { CoverArtPipe } from '../../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../pipes/image-alt/image-alt.pipe';
import { NgOptimizedImage } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TagComponent } from "../../../components/tag/tag.component";
import { UpdatedAtPipe } from '../../../pipes/updated-at.pipe';

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
    UpdatedAtPipe
],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  mangaList = input.required<Manga[]>();
}
