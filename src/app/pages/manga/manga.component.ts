import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MangaService } from '../../services/manga/manga.service';
import { ChapterList, Manga, MangaStatistic } from '../../models/mangadex';
import { map, switchMap } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { InfoSectionComponent } from './info-section/info-section.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Includes, Order } from '../../models/static';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

const ChapterPerPage = 50;

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [InfoSectionComponent, ChaptersComponent, NzPaginationModule],
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent implements OnInit {
  mangaService = inject(MangaService);
  statisticService = inject(StatisticService);
  destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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
  totalPage = computed(() => (this.chapterList()?.total ?? 0) / ChapterPerPage);

  constructor() {
    effect(() => {
      const subscription = this.fetchMangaFeed(this.page(), this.lang());

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
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

  changePage(pageIndex: number) {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: { page: pageIndex },
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
    });
  }

  ngOnInit() {
    const mangaAndStatisticSubscription = this.fetchMangaAndStatistic();
    const mangaFeedSubscription = this.fetchMangaFeed(this.page(), this.lang());

    this.destroyRef.onDestroy(() => {
      mangaAndStatisticSubscription.unsubscribe();
      mangaFeedSubscription.unsubscribe();
    });
  }
}
