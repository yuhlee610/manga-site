import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetMangasStatisticResponse, Manga } from '../../models/mangadex';
import { MangadexBaseUrl } from '../constants';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private httpClient = inject(HttpClient);

  getStatisticsFromMangaList(mangaList: Manga[]) {
    const observables = mangaList.map((manga) =>
      this.httpClient.get<GetMangasStatisticResponse>(
        `${MangadexBaseUrl}/statistics/manga/${manga.id}`
      )
    );

    return forkJoin(observables).pipe(
      map((responses) => responses.map((response) => response.statistics))
    );
  }
}
