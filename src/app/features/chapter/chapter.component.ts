import { Component, inject, input, OnInit } from '@angular/core';
import { ChapterService } from '../../shared/services/chapter/chapter.service';
import { map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { GetAtHomeServerChapterIdResponse } from '../../models/atHome';
import { AsyncPipe } from '@angular/common';
import { ChapterImagePipe } from '../../shared/pipes/chapter-image/chapter-image.pipe';
import { GetChapterIdResponse } from '../../models/chapter';
import { MangaService } from '../../shared/services/manga/manga.service';
import { GetMangaIdAggregateResponse } from '../../models/mangadex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MangaTitlePipe } from '../../shared/pipes/manga-title/manga-title.pipe';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import _ from 'lodash';
import { RelationshipPipe } from '../../shared/pipes/relationship/relationship.pipe';
import { MapPipe } from '../../shared/pipes/map/map.pipe';

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
  ],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent implements OnInit {
  private chapterService = inject(ChapterService);
  private mangaService = inject(MangaService);

  chapterId = input.required<string>();
  lang = input<'vi' | 'en'>();

  content$?: Observable<GetAtHomeServerChapterIdResponse>;
  chapter$?: Observable<GetChapterIdResponse>;
  manga$?: Observable<{ chapter: string; id: string }[]>;

  ngOnInit(): void {
    this.content$ = this.chapterService.getChapterContent(this.chapterId());
    this.chapter$ = this.chapterService.getChapter(this.chapterId()).pipe(
      shareReplay(1),
      tap({
        next: data => console.log(data),
      })
    );
    this.manga$ = this.chapter$.pipe(
      map(chapter => {
        console.log(chapter.data.relationships);
        return chapter.data.relationships[1].id;
      }),
      switchMap(mangaId =>
        this.mangaService.getMangaAggregate(mangaId, this.lang() ?? 'vi')
      ),
      map(response => {
        console.log(response);

        return [
          {
            chapter: '',
            id: '',
          },
        ];
      })
    );
  }
}
