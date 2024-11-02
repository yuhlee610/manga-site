import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetMangasStatisticResponse, Manga } from '../../models/mangadex';
import { MangadexBaseUrl } from '../constants';
import { map } from 'rxjs';
import { buildQueryStringFromOptions } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private httpClient = inject(HttpClient);

  findStatisticsFromMangaList(mangaList: Manga[]) {
    const mangaIds = mangaList.map((manga) => manga.id);
    const qs = buildQueryStringFromOptions({ manga: mangaIds });

    return this.httpClient
      .get<GetMangasStatisticResponse>(`${MangadexBaseUrl}/statistics/manga${qs}`)
      .pipe(map((response) => response.statistics));
  }

  getStatistic(manga: Manga) {
    return this.httpClient
      .get<GetMangasStatisticResponse>(
        `${MangadexBaseUrl}/statistics/manga/${manga.id}`
      )
      .pipe(map(response => response.statistics));
  }
}
