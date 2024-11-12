import {
  Component,
  effect,
  inject,
  input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  Chapter,
  Manga,
  MangaList,
  MangaStatistic,
} from '../../models/mangadex';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { SpaceDirective } from '../../shared/directives/space/space.directive';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Dictionary } from 'lodash';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RankMangaCardComponent } from './components/rank-manga-card/rank-manga-card.component';
import { MangaCardComponent } from '../../shared/components/manga-card/manga-card.component';
import { PaginationTotalItemsPipe } from '../../shared/pipes/pagination-total-items/pagination-total-items.pipe';
import { StatisticService } from '../../shared/services/statistic/statistic.service';
import { MangaService } from '../../shared/services/manga/manga.service';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { PaginationService } from '../../shared/services/pagination/pagination.service';
import { MangaComponent } from '../manga/manga.component';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';

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
    MangaComponent,
    NzDrawerModule,
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
  private drawerService = inject(NzDrawerService);
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  page = input.required({
    transform: (value: string) => (value ? Number.parseInt(value) : 1),
  });
  previewMangaId = signal('');

  latestMangaList$?: Observable<MangaList>;
  latestMangaStatistics$?: Observable<Record<string, MangaStatistic>>;
  latestChapters$?: Observable<Dictionary<Chapter>>;
  drawerRef?: NzDrawerRef<
    {
      mangaId: string;
      page: string;
      lang: string;
    },
    unknown
  >;

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
      .pipe(shareReplay(1));

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

  previewManga(mangaId: string) {
    this.drawerRef = this.drawerService.create({
      nzWidth: '2000px',
      nzContent: this.drawerTemplate,
      nzContentParams: {
        mangaId: mangaId,
        page: '1',
        lang: 'vi',
      },
    });
  }

  closeDrawer() {
    this.drawerRef?.close();
  }
}

export const featureMangaListResolver = () => {
  const mangaService = inject(MangaService);

  return mangaService.getFeatureMangaList();
};
