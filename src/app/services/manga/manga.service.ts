import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DefaultTranslatedLanguages, MangadexBaseUrl } from '../constants';
import {
  GetMangaIdRequestOptions,
  GetMangaIdResponse,
  GetSearchMangaRequestOptions,
  GetSearchMangaResponse,
} from '../../models/mangadex';
import { Includes, Order } from '../../models/static';
import { buildQueryStringFromOptions } from '../utils';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private httpClient = inject(HttpClient);

  getFeatureMangaList() {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      order: {
        updatedAt: Order.DESC,
        rating: Order.DESC,
      },
      limit: 10,
      includes: [Includes.COVER_ART],
    });
  }

  getTrendingMangaList() {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      order: {
        followedCount: Order.DESC,
      },
      limit: 5,
      includes: [Includes.COVER_ART],
    });
  }

  getLatestMangaList() {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      order: {
        latestUploadedChapter: Order.DESC,
      },
      includes: [Includes.COVER_ART],
      limit: 30,
    });
  }

  getManga(id: string) {
    return this.getMangaById(id, { includes: [Includes.COVER_ART, Includes.AUTHOR] }).pipe(
      map(response => response.data)
    );
  }

  private getMangaList(queryParams: GetSearchMangaRequestOptions) {
    const qs = buildQueryStringFromOptions(queryParams);
    return this.httpClient.get<GetSearchMangaResponse>(
      `${MangadexBaseUrl}/manga${qs}`
    );
  }

  private getMangaById(id: string, queryParams?: GetMangaIdRequestOptions) {
    const qs = buildQueryStringFromOptions(queryParams);
    return this.httpClient.get<GetMangaIdResponse>(
      `${MangadexBaseUrl}/manga/${id}${qs}`
    );
  }
}
