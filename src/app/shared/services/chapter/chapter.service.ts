import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Manga } from '../../../models/mangadex';
import { map } from 'rxjs';
import {
  GetChapterIdResponse,
  GetChapterResponse,
} from '../../../models/chapter';
import _ from 'lodash';
import { buildQueryStringFromOptions } from '../../../core/utils';
import { MangadexBaseUrl } from '../../../core/constants';
import { GetAtHomeServerChapterIdResponse } from '../../../models/atHome';
import { Includes } from '../../../models/static';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  private httpClient = inject(HttpClient);

  getLatestChapterList(mangaList: Manga[]) {
    const latestChapterIds = mangaList.map(
      manga => manga.attributes.latestUploadedChapter
    );
    const qs = buildQueryStringFromOptions({
      ids: latestChapterIds,
      limit: 100,
    });

    return this.httpClient
      .get<GetChapterResponse>(`${MangadexBaseUrl}/chapter${qs}`)
      .pipe(
        map(response => response.data),
        map(chapters => _.keyBy(chapters, 'id'))
      );
  }

  getChapter(chapterId: string) {
    const qs = buildQueryStringFromOptions({
      includes: [Includes.MANGA],
    });
    return this.httpClient.get<GetChapterIdResponse>(
      `${MangadexBaseUrl}/chapter/${chapterId}${qs}`
    );
  }

  getChapterContent(chapterId: string) {
    return this.httpClient.get<GetAtHomeServerChapterIdResponse>(
      `${MangadexBaseUrl}/at-home/server/${chapterId}`
    );
  }
}
