import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MangaService } from '../../services/manga/manga.service';
import { MangaList } from '../../models/mangadex';
import { ActivatedRoute } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarouselComponent } from './carousel/carousel.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, switchMap } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RankMangaCardComponent } from '../../components/rank-manga-card/rank-manga-card.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SpaceDirective } from '../../directives/space/space.directive';
import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ChapterService } from '../../services/chapter/chapter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzGridModule,
    CarouselComponent,
    NzTypographyModule,
    AsyncPipe,
    RankMangaCardComponent,
    NzFlexModule,
    SpaceDirective,
    MangaCardComponent,
    NzSpaceModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private statisticService = inject(StatisticService);
  private mangaService = inject(MangaService);
  private chapterService = inject(ChapterService);

  featureMangaList = toSignal(
    this.activatedRoute.data.pipe(map((data) => (data['featureMangaList'] as MangaList).data)),
    { initialValue: [] }
  );
  featureMangaListStatistics = toSignal(
    toObservable(this.featureMangaList).pipe(
      switchMap((mangaData) => this.statisticService.findStatisticsFromMangaList(mangaData))
    )
  );

  trendingMangaList = toSignal(
    this.mangaService.getTrendingMangaList().pipe(map((mangaList) => mangaList.data)),
    { initialValue: [] }
  );
  trendingMangaListStatistics = toSignal(
    toObservable(this.trendingMangaList).pipe(
      switchMap((mangaData) => this.statisticService.findStatisticsFromMangaList(mangaData))
    )
  );

  latestMangaList = toSignal(
    this.mangaService.getLatestMangaList().pipe(map((mangaList) => mangaList.data)),
    { initialValue: [] }
  );
  latestMangaStatistics = toSignal(
    toObservable(this.latestMangaList).pipe(
      switchMap((mangaData) => this.statisticService.findStatisticsFromMangaList(mangaData))
    )
  );
  latestChapters = toSignal(
    toObservable(this.latestMangaList).pipe(
      switchMap((mangaData) => this.chapterService.getLatestChapterList(mangaData))
    )
  );
}

export const featureMangaListResolver = () => {
  const mangaService = inject(MangaService);

  return mangaService.getFeatureMangaList();
};
