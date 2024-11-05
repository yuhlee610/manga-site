import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetMangaTagResponse } from '../../models/mangadex';
import { MangadexBaseUrl } from '../constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private httpClient = inject(HttpClient);

  getTagList() {
    return this.httpClient
      .get<GetMangaTagResponse>(`${MangadexBaseUrl}/manga/tag`)
      .pipe(
        map(response => response.data),
        map(tagList =>
          tagList.sort((a, b) => {
            if (a.attributes.name['en'] < b.attributes.name['en']) {
              return -1;
            }
            if (a.attributes.name['en'] > b.attributes.name['en']) {
              return 1;
            }
            return 0;
          })
        )
      );
  }
}
