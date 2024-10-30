import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetMangasStatisticResponse, Manga, MangaStatistic } from '../../models/mangadex';
import { MangadexBaseUrl } from '../constants';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private httpClient = inject(HttpClient);

  getStatisticsFromMangaList(mangaList: Manga[]): Observable<Record<string, MangaStatistic>> {
    const observables = mangaList.map((manga) =>
      this.httpClient.get<GetMangasStatisticResponse>(
        `${MangadexBaseUrl}/statistics/manga/${manga.id}`
      )
    );

    return forkJoin(observables).pipe(
      map((responses) =>
        responses
          .map((response) => response.statistics)
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})
      )
    );
  }
}
