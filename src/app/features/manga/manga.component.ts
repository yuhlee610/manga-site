import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  Chapter,
  ChapterList,
  Manga,
  MangaStatistic,
} from '../../models/mangadex';
import { map, switchMap } from 'rxjs';
import { Includes, Order } from '../../models/static';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { MangaService } from '../../shared/services/manga/manga.service';
import { StatisticService } from '../../shared/services/statistic/statistic.service';
import { PaginationService } from '../../shared/services/pagination/pagination.service';

const ChapterPerPage = 50;

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [InfoSectionComponent, ChaptersComponent, NzPaginationModule],
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent {
  private mangaService = inject(MangaService);
  private statisticService = inject(StatisticService);
  private destroyRef = inject(DestroyRef);
  private paginationService = inject(PaginationService);

  mangaId = input.required<string>();
  page = input.required({
    transform: (value: string) => (value ? Number.parseInt(value) : 1),
  });
  lang = input.required({
    transform: (value: string) => (value ? value : 'vi'),
  });

  manga = signal<Manga | undefined>(undefined);
  statistic = signal<MangaStatistic | undefined>(undefined);
  chapterList = signal<ChapterList | undefined>(undefined);
  firstChapter = signal<Chapter | undefined>(undefined);

  totalPage = computed(() => (this.chapterList()?.total ?? 0) / ChapterPerPage);

  constructor() {
    effect(() => {
      const mangaAndStatisticSubscription = this.fetchMangaAndStatistic();
      const mangaFeedSubscription = this.fetchMangaFeed(
        this.page(),
        this.lang()
      );
      const firstChapterSubscription = this.fetchFirstChapter(this.lang());

      this.destroyRef.onDestroy(() => {
        mangaAndStatisticSubscription.unsubscribe();
        mangaFeedSubscription.unsubscribe();
        firstChapterSubscription.unsubscribe();
      });
    });
  }

  private fetchMangaAndStatistic() {
    return this.mangaService
      .getManga(this.mangaId())
      .pipe(
        switchMap(mangaData =>
          this.statisticService
            .getStatistic(mangaData)
            .pipe(map(statisticData => ({ statisticData, mangaData })))
        )
      )
      .subscribe({
        next: ({ statisticData, mangaData }) => {
          this.manga.set(mangaData);
          this.statistic.set(statisticData[mangaData.id]);
        },
      });
  }

  private fetchMangaFeed(page: number, lang: string) {
    return this.mangaService
      .getMangaFeed(this.mangaId(), {
        offset: (page - 1) * ChapterPerPage,
        limit: ChapterPerPage,
        translatedLanguage: [lang === 'en' ? 'en' : 'vi'],
        order: {
          chapter: Order.DESC,
        },
        includes: [Includes.SCANLATION_GROUP],
      })
      .subscribe({
        next: chapterListData => this.chapterList.set(chapterListData),
      });
  }

  private fetchFirstChapter(lang: string) {
    return this.mangaService
      .getMangaFeed(this.mangaId(), {
        limit: 1,
        translatedLanguage: [lang === 'en' ? 'en' : 'vi'],
        order: {
          chapter: Order.ASC,
        },
      })
      .subscribe({
        next: chapterListData => this.firstChapter.set(chapterListData.data[0]),
      });
  }

  changePage(pageIndex: number) {
    this.paginationService.changePage(pageIndex);
  }
}
