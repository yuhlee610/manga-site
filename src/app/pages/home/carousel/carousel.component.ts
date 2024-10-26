import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Manga } from '../../../models/mangadex';
import { CommonModule } from '@angular/common';
import { CoverArtPipe } from '../../../pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../pipes/image-alt/image-alt.pipe';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CoverArtPipe, ImageAltPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  mangaList = input.required<Manga[]>();
}
