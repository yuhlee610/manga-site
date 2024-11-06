import { Component, computed, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Chapter,
  GetSearchMangaRequestOptions,
  Manga,
  MangaList,
  MangaStatistic,
} from '../../models/mangadex';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Dictionary } from 'lodash';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SpaceDirective } from '../../shared/directives/space/space.directive';
import { MangaCardComponent } from '../../shared/components/manga-card/manga-card.component';
import { PaginationTotalItemsPipe } from '../../shared/pipes/pagination-total-items/pagination-total-items.pipe';
import { TagService } from '../../shared/services/tag/tag.service';
import { MangaService } from '../../shared/services/manga/manga.service';
import { StatisticService } from '../../shared/services/statistic/statistic.service';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { PaginationService } from '../../shared/services/pagination/pagination.service';
import { SearchFormComponent } from './components/search-form/search-form.component';

const transformInput = (value: string | undefined) => value || '';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchFormComponent,
    CommonModule,
    AsyncPipe,
    MangaCardComponent,
    NzPaginationModule,
    SpaceDirective,
    PaginationTotalItemsPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private tagService = inject(TagService);
  private mangaService = inject(MangaService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private statisticService = inject(StatisticService);
  private chapterService = inject(ChapterService);
  private paginationService = inject(PaginationService);

  pageSize = 30;

  title = input('', {
    transform: transformInput,
  });
  status = input('', {
    transform: transformInput,
  });
  publicationDemographic = input('', {
    transform: transformInput,
  });
  includedTags = input([], {
    transform: (value: string | string[] | undefined) =>
      typeof value === 'string' ? [value] : value || [],
  });
  sort = input('updatedAt.desc', {
    transform: (value: string) => value ?? 'updatedAt.desc',
  });
  page = input(1, {
    transform: (value: string) => (value ? Number.parseInt(value) : 1),
  });

  tagList = toSignal(this.tagService.getTagList());
  initialValues = computed(() => ({
    title: this.title(),
    status: this.status(),
    sort: this.sort(),
    publicationDemographic: this.publicationDemographic(),
    includedTags: this.includedTags(),
  }));
  mangaList$?: Observable<MangaList>;
  mangaStatistics$?: Observable<Record<string, MangaStatistic>>;
  latestChapters$?: Observable<Dictionary<Chapter>>;

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  private buildSearchParams(): GetSearchMangaRequestOptions {
    const { title, status, sort, publicationDemographic, includedTags } =
      this.initialValues();
    const [orderKey, orderValue] = sort.split('.');

    return {
      ...this.formatQueryParams({
        title,
        status: [status],
        publicationDemographic: [publicationDemographic],
        includedTags,
      }),
      order: { [orderKey]: orderValue },
      offset: (this.page() - 1) * this.pageSize,
    };
  }

  private fetchData() {
    const params = this.buildSearchParams();

    this.mangaList$ = this.mangaService
      .searchManga(params)
      .pipe(shareReplay(1));

    this.mangaStatistics$ = this.mangaList$.pipe(
      switchMap(mangaList =>
        this.statisticService.findStatisticsFromMangaList(
          mangaList?.data as Manga[]
        )
      )
    );

    this.latestChapters$ = this.mangaList$.pipe(
      switchMap(mangaList =>
        this.chapterService.getLatestChapterList(mangaList?.data as Manga[])
      )
    );
  }

  private formatQueryParams(params: Record<string, string | string[]>) {
    return _.omitBy(params, value => {
      if (typeof value === 'string') return value === '';
      if (Array.isArray(value) && value.length === 1 && value[0] === '') {
        return true;
      }
      return false;
    });
  }

  search(values: Record<string, string | string[]>) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
      queryParams: this.formatQueryParams(values),
    });
  }

  changePage(pageIndex: number) {
    this.paginationService.changePage(pageIndex);
  }
}
