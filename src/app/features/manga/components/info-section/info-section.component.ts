import { Component, input, output } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CoverArtPipe } from '../../../../shared/pipes/cover-art/cover-art.pipe';
import { ImageAltPipe } from '../../../../shared/pipes/image-alt/image-alt.pipe';
import { MangaTitlePipe } from '../../../../shared/pipes/manga-title/manga-title.pipe';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { MangaStatusPipe } from '../../../../shared/pipes/manga-status/manga-status.pipe';
import { SpaceDirective } from '../../../../shared/directives/space/space.directive';
import { Chapter, Manga, MangaStatistic } from '../../../../models/mangadex';
import { RouterLink } from '@angular/router';

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
    RouterLink,
  ],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  manga = input.required<Manga>();
  statistic = input.required<MangaStatistic>();
  totalChapter = input.required<number>();
  firstChapter = input<Chapter>();

  trackHistory = output<string>();

  get mangadexLink() {
    return `https://mangadex.org/title/${this.manga().id}`;
  }

  track() {
    if (this.firstChapter()?.id) {
      this.trackHistory.emit(this.firstChapter()?.id as string);
    }
  }
}
