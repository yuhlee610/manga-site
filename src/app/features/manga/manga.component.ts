import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
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
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../shared/services/history/history.service';

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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private historyService = inject(HistoryService);

  mangaId = input.required<string>();
  page = input.required({
    transform: (value: string) => (value ? Number.parseInt(value) : 1),
  });
  lang = input.required({
    transform: (value: string) => (value ? value : 'vi'),
  });
  preview = input(false);
  closeDrawer = output();

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
    if (this.preview()) {
      this.router
        .navigate(['/manga', this.mangaId()], {
          queryParams: { page: pageIndex },
        })
        .then(() => {
          this.closeDrawer.emit();
        });
      return;
    }
    this.paginationService.changePage(pageIndex);
  }

  changeLang() {
    const params = {
      queryParams: { lang: this.lang() === 'vi' ? 'en' : 'vi' },
    };

    if (this.preview()) {
      this.router
        .navigate(['/manga', this.mangaId()], {
          ...params,
        })
        .then(() => {
          this.closeDrawer.emit();
        });
      return;
    }
    this.router.navigate(['./'], {
      ...params,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
    });
  }

  trackHistory(chapterId: string) {
    const mangaId = this.mangaId();
    const chapter = this.chapterList()?.data.find(c => c.id === chapterId);
    if (!chapter) return;

    this.historyService.setHistory(mangaId, {
      id: chapter.id,
      chapter: chapter.attributes.chapter || '',
    });
  }
}
