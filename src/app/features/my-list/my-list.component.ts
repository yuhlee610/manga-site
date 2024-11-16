import { Component, computed, effect, inject, signal } from '@angular/core';
import { FavoriteService } from '../../shared/services/favorite/favorite.service';
import _, { Dictionary } from 'lodash';
import {
  Chapter,
  Manga,
  MangaList,
  MangaStatistic,
} from '../../models/mangadex';
import { forkJoin, map, switchMap } from 'rxjs';
import { MangaService } from '../../shared/services/manga/manga.service';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { StatisticService } from '../../shared/services/statistic/statistic.service';
import { MangaCardComponent } from '../../shared/components/manga-card/manga-card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const MangaPerPage = 30;

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [MangaCardComponent, NzButtonModule],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent {
  private favoriteService = inject(FavoriteService);
  private mangaService = inject(MangaService);
  private chapterService = inject(ChapterService);
  private statisticService = inject(StatisticService);

  mangaIds = Object.keys(this.favoriteService.getStoredFavorites());
  chunkIds = _.chunk(this.mangaIds, MangaPerPage);

  page = signal(0);
  isDisabled = computed(() => this.page() === this.chunkIds.length - 1);

  mangaList = signal<Manga[]>([]);
  mangaStatistics = signal<Record<string, MangaStatistic>>({});
  latestChapters = signal<Dictionary<Chapter>>({});

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  private fetchData() {
    const fetchStatistics = (mangaList: MangaList) =>
      this.statisticService.findStatisticsFromMangaList(mangaList.data);
    const fetchLatestChapters = (mangaList: MangaList) =>
      this.chapterService.getLatestChapterList(mangaList.data);

    this.mangaService
      .fetchHistoryOrFavoriteManga({
        ids: this.chunkIds[this.page()],
        limit: MangaPerPage,
      })
      .pipe(
        switchMap(mangaList =>
          forkJoin([
            fetchStatistics(mangaList),
            fetchLatestChapters(mangaList),
          ]).pipe(map(responses => [mangaList, ...responses] as const))
        )
      )
      .subscribe(([mangaList, statistics, latestChapters]) => {
        this.mangaList.update(prev => prev.concat(mangaList.data));
        this.mangaStatistics.update(prev => ({ ...prev, ...statistics }));
        this.latestChapters.update(prev => ({ ...prev, ...latestChapters }));
      });
  }

  loadMore() {
    if (this.isDisabled()) return;
    this.page.update(page => page + 1);
  }
}
