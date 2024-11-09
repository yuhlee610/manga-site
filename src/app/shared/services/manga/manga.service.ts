import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GetMangaIdAggregateResponse,
  GetMangaIdFeedRequestOptions,
  GetMangaIdFeedResponse,
  GetMangaIdRequestOptions,
  GetMangaIdResponse,
  GetSearchMangaRequestOptions,
  GetSearchMangaResponse,
} from '../../../models/mangadex';
import { Includes, Order } from '../../../models/static';
import { map } from 'rxjs';
import { buildQueryStringFromOptions } from '../../../core/utils';
import {
  DefaultTranslatedLanguages,
  MangadexBaseUrl,
} from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private httpClient = inject(HttpClient);

  searchManga(queryParams: GetSearchMangaRequestOptions) {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      includes: [Includes.COVER_ART],
      limit: 30,
      ...queryParams,
    });
  }

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

  getLatestMangaList(queryParams: GetSearchMangaRequestOptions) {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      order: {
        latestUploadedChapter: Order.DESC,
      },
      includes: [Includes.COVER_ART],
      limit: 30,
      ...queryParams,
    });
  }

  getManga(mangaId: string) {
    return this.getMangaById(mangaId, {
      includes: [Includes.COVER_ART, Includes.AUTHOR],
    }).pipe(map(response => response.data));
  }

  getMangaFeed(id: string, queryParams?: GetMangaIdFeedRequestOptions) {
    const qs = buildQueryStringFromOptions(queryParams);
    return this.httpClient.get<GetMangaIdFeedResponse>(
      `${MangadexBaseUrl}/manga/${id}/feed${qs}`
    );
  }

  getMangaAggregate(mangaId: string, lang: 'vi' | 'en') {
    console.log('hello');
    
    const qs = buildQueryStringFromOptions({
      translatedLanguage: [lang],
    });
    return this.httpClient.get<GetMangaIdAggregateResponse>(
      `${MangadexBaseUrl}/manga/${mangaId}/aggregate${qs}`
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
