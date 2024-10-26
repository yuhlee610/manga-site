import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DefaultTranslatedLanguages, MangadexBaseUrl } from '../constants';
import { GetSearchMangaRequestOptions, GetSearchMangaResponse } from '../../models/mangadex';
import { Includes, Order } from '../../models/static';
import { buildQueryStringFromOptions } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private httpClient = inject(HttpClient);

  getFeatureMangaList() {
    return this.getMangaList({
      availableTranslatedLanguage: DefaultTranslatedLanguages,
      order: {
        latestUploadedChapter: Order.DESC,
        rating: Order.DESC,
      },
      limit: 5,
      includes: [Includes.COVER_ART],
    });
  }

  getMangaList(queryParams: GetSearchMangaRequestOptions) {
    const qs = buildQueryStringFromOptions(queryParams);
    return this.httpClient.get<GetSearchMangaResponse>(`${MangadexBaseUrl}/manga${qs}`);
  }
}
