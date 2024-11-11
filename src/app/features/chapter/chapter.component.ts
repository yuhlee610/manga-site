import {
  Component,
  DestroyRef,
  effect,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { GetAtHomeServerChapterIdResponse } from '../../models/atHome';
import { AsyncPipe } from '@angular/common';
import { ChapterImagePipe } from '../../shared/pipes/chapter-image/chapter-image.pipe';
import { GetChapterIdResponse } from '../../models/chapter';
import { MangaService } from '../../shared/services/manga/manga.service';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MangaTitlePipe } from '../../shared/pipes/manga-title/manga-title.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RelationshipPipe } from '../../shared/pipes/relationship/relationship.pipe';
import { MapPipe } from '../../shared/pipes/map/map.pipe';
import {
  AggregateChapter,
  GetMangaIdAggregateResponse,
} from '../../models/mangadex';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class ChapterComponent implements OnInit {
  private chapterService = inject(ChapterService);
  private mangaService = inject(MangaService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  chapterId = input.required<string>();
  lang = input<'vi' | 'en'>();

  content$?: Observable<GetAtHomeServerChapterIdResponse>;
  chapter$?: Observable<GetChapterIdResponse>;

  chapterList = signal<{ chapter: string; id: string }[]>([]);

  constructor() {
    effect(() => {
      this.fetchData(this.chapterId());
    });
  }

  ngOnInit(): void {
    this.fetchData(this.chapterId());
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

  private fetchData(chapterId: string) {
    this.content$ = this.chapterService.getChapterContent(chapterId);
    this.chapter$ = this.chapterService
      .getChapter(chapterId)
      .pipe(shareReplay(1));
    this.chapter$
      .pipe(
        map(chapter => {
          const mangaRelationship = chapter.data.relationships.find(
            relationship => relationship.type === 'manga'
          );

          return mangaRelationship?.id ?? '';
        }),
        switchMap(mangaId =>
          this.mangaService.getMangaAggregate(mangaId, this.lang() ?? 'vi')
        ),
        takeUntilDestroyed(this.destroyRef),
        map(aggregate => Object.values(this.parseAggregate(aggregate)))
      )
      .subscribe(data => this.chapterList.set(data));
  }

  prev() {
    const currentChapterIndex = this.chapterList().findIndex(
      ({ id }) => id === this.chapterId()
    );

    if (currentChapterIndex === 0) return;

    this.router.navigate(
      ['/chapter', this.chapterList().at(currentChapterIndex - 1)?.id],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
        onSameUrlNavigation: 'reload',
        queryParams: {
          lang: this.lang(),
        },
      }
    );
  }

  next() {
    const currentChapterIndex = this.chapterList().findIndex(
      ({ id }) => id === this.chapterId()
    );

    if (currentChapterIndex === this.chapterList().length - 1) return;

    this.router.navigate(
      ['/chapter', this.chapterList().at(currentChapterIndex + 1)?.id],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
        onSameUrlNavigation: 'reload',
        queryParams: {
          lang: this.lang(),
        },
      }
    );
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
}
