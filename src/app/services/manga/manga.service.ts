import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MangadexBaseUrl } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private httpClient = inject(HttpClient)

  getFeatureMangaList() {

  }

  getMangaList(params) {
    return this.httpClient.get(`${MangadexBaseUrl}/manga`, params)
  }
}
