import { Component, effect, inject, input } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MangaService } from '../../services/manga/manga.service';
import {
  Chapter,
  Manga,
  MangaList,
  MangaStatistic,
} from '../../models/mangadex';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarouselComponent } from './carousel/carousel.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RankMangaCardComponent } from '../../components/rank-manga-card/rank-manga-card.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SpaceDirective } from '../../directives/space/space.directive';
import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ChapterService } from '../../services/chapter/chapter.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Dictionary } from 'lodash';
import { PaginationTotalItemsPipe } from '../../pipes/pagination-total-items/pagination-total-items.pipe';

const MangaPerPage = 50;

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
    RouterLink,
    NzPaginationModule,
    AsyncPipe,
    CommonModule,
    PaginationTotalItemsPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private statisticService = inject(StatisticService);
  private mangaService = inject(MangaService);
  private chapterService = inject(ChapterService);
  private paginationService = inject(PaginationService);

  page = input.required({
    transform: (value: string) => (value ? Number.parseInt(value) : 1),
  });

  latestMangaList$?: Observable<MangaList>;
  latestMangaStatistics$?: Observable<Record<string, MangaStatistic>>;
  latestChapters$?: Observable<Dictionary<Chapter>>;

  featureMangaList = toSignal(
    this.activatedRoute.data.pipe(
      map(data => (data['featureMangaList'] as MangaList).data)
    ),
    { initialValue: [] }
  );
  featureMangaListStatistics = toSignal(
    toObservable(this.featureMangaList).pipe(
      switchMap(mangaData =>
        this.statisticService.findStatisticsFromMangaList(mangaData)
      )
    )
  );

  trendingMangaList = toSignal(
    this.mangaService
      .getTrendingMangaList()
      .pipe(map(mangaList => mangaList.data)),
    { initialValue: [] }
  );
  trendingMangaListStatistics = toSignal(
    toObservable(this.trendingMangaList).pipe(
      switchMap(mangaData =>
        this.statisticService.findStatisticsFromMangaList(mangaData)
      )
    )
  );

  get pageSize() {
    return MangaPerPage;
  }

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    this.latestMangaList$ = this.mangaService
      .getLatestMangaList({
        offset: (this.page() - 1) * MangaPerPage,
      })
      .pipe(shareReplay(2));

    this.latestMangaStatistics$ = this.latestMangaList$.pipe(
      switchMap(mangaList =>
        this.statisticService.findStatisticsFromMangaList(
          mangaList?.data as Manga[]
        )
      )
    );

    this.latestChapters$ = this.latestMangaList$.pipe(
      switchMap(mangaList =>
        this.chapterService.getLatestChapterList(mangaList?.data as Manga[])
      )
    );
  }

  changePage(pageIndex: number) {
    this.paginationService.changePage(pageIndex);
  }
}

export const featureMangaListResolver = () => {
  const mangaService = inject(MangaService);

  return mangaService.getFeatureMangaList();
};
