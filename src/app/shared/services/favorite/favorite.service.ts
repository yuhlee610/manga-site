import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { FavoriteKey } from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private localStorage = inject(LocalStorageService);
  private favoriteList = signal<Record<string, unknown>>(
    this.getStoredFavorites()
  );
  isFavorite = computed(
    () => (mangaId: string) => !!this.favoriteList()[mangaId]
  );

  toggleFavorite(mangaId: string) {
    const favorites = { ...this.favoriteList() };

    if (favorites[mangaId]) {
      delete favorites[mangaId];
    } else {
      favorites[mangaId] = true;
    }

    this.favoriteList.set(favorites);
    this.saveFavoritesToStorage(favorites);
  }

  private saveFavoritesToStorage(favorites: Record<string, unknown>) {
    this.localStorage.setItem(FavoriteKey, favorites);
  }

  getStoredFavorites() {
    return this.localStorage.getItem(FavoriteKey) ?? {};
  }
}
