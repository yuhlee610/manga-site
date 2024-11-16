import { inject, Injectable } from '@angular/core';
import { HistoryKey } from '../../../core/constants';
import { History } from '../../../models/history';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private localStorage = inject(LocalStorageService);

  setHistory(mangaId: string, chapter: { id: string; chapter: string }) {
    const history = this.getHistory();
    history[mangaId] = {
      chapterId: chapter.id,
      chapter: chapter.chapter,
      readAt: Date.now(),
    };

    this.localStorage.setItem(HistoryKey, history);
  }

  getHistory() {
    return (this.localStorage.getItem(HistoryKey) ?? {}) as History;
  }
}
