import {
  Component,
  computed,
  DestroyRef,
  effect,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { map, Observable, switchMap } from 'rxjs';
import { GetAtHomeServerChapterIdResponse } from '../../models/atHome';
import { AsyncPipe } from '@angular/common';
import { ChapterImagePipe } from '../../shared/pipes/chapter-image/chapter-image.pipe';
import { MangaService } from '../../shared/services/manga/manga.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MangaTitlePipe } from '../../shared/pipes/manga-title/manga-title.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RelationshipPipe } from '../../shared/pipes/relationship/relationship.pipe';
import { MapPipe } from '../../shared/pipes/map/map.pipe';
import {
  AggregateChapter,
  ChapterResponse,
  GetMangaIdAggregateResponse,
} from '../../models/mangadex';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HistoryService } from '../../shared/services/history/history.service';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [
    AsyncPipe,
    ChapterImagePipe,
    NzTypographyModule,
    AsyncPipe,
    MangaTitlePipe,
    RouterLink,
    NzSelectModule,
    RelationshipPipe,
    MapPipe,
    FormsModule,
    NzButtonModule,
  ],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  private chapterService = inject(ChapterService);
  private mangaService = inject(MangaService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private historyService = inject(HistoryService);

  chapterId = input.required<string>();
  lang = input<'vi' | 'en'>();

  content$?: Observable<GetAtHomeServerChapterIdResponse>;

  chapterList = signal<{ chapter: string; id: string }[]>([]);
  chapter = signal<ChapterResponse | undefined>(undefined);
  manga = computed(() =>
    this.chapter()?.data.relationships.find(
      relationship => relationship.type === 'manga'
    )
  );
  mangaId = computed(() => this.manga()?.id ?? '');

  constructor() {
    effect(() => {
      this.fetchData(this.chapterId());
    });
  }

  parseAggregate(
    aggregate: GetMangaIdAggregateResponse
  ): Record<string, AggregateChapter> {
    return Object.values(aggregate.volumes).reduce((acc, curr) => {
      return {
        ...acc,
        ...curr.chapters,
      };
    }, {});
  }

  findMangaRelationshipId(chapter: ChapterResponse) {
    return chapter.data.relationships.find(({ type }) => type === 'manga')?.id;
  }

  private fetchData(chapterId: string) {
    this.content$ = this.chapterService.getChapterContent(chapterId);
    this.chapterService
      .getChapter(chapterId)
      .pipe(
        switchMap(chapter =>
          this.mangaService
            .getMangaAggregate(
              this.findMangaRelationshipId(chapter) as string,
              this.lang() ?? 'vi'
            )
            .pipe(
              map(aggregate => ({
                aggregate: Object.values(this.parseAggregate(aggregate)),
                chapter,
              }))
            )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: response => {
          this.chapterList.set(response.aggregate);
          this.chapter.set(response.chapter);
        },
      });
  }

  prev() {
    const currentChapterIndex = this.chapterList().findIndex(
      ({ id }) => id === this.chapterId()
    );

    if (currentChapterIndex === 0) return;

    const newChapter = this.chapterList().at(currentChapterIndex - 1)!;
    this.historyService.setHistory(
      this.findMangaRelationshipId(this.chapter() as ChapterResponse) as string,
      newChapter
    );
    this.router.navigate(['/chapter', newChapter.id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
      queryParams: {
        lang: this.lang(),
      },
    });
  }

  next() {
    const currentChapterIndex = this.chapterList().findIndex(
      ({ id }) => id === this.chapterId()
    );

    if (currentChapterIndex === this.chapterList().length - 1) return;

    const newChapter = this.chapterList().at(currentChapterIndex + 1)!;
    this.historyService.setHistory(
      this.findMangaRelationshipId(this.chapter() as ChapterResponse) as string,
      newChapter
    );
    this.router.navigate(['/chapter', newChapter.id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
      queryParams: {
        lang: this.lang(),
      },
    });
  }

  @HostListener('document:keydown', ['$event'])
  pressNextKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.next();
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }

  changeChapter(chapterId: string) {
    const chapter = this.chapterList().find(c => c.id === chapterId);

    if (!chapter) return;

    this.historyService.setHistory(
      this.findMangaRelationshipId(this.chapter() as ChapterResponse) as string,
      chapter
    );
    this.router.navigate(['/chapter', chapterId], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      onSameUrlNavigation: 'reload',
      queryParams: {
        lang: this.lang(),
      },
    });
  }
}
