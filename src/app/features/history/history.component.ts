import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { HistoryService } from '../../shared/services/history/history.service';
import { MangaService } from '../../shared/services/manga/manga.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import _ from 'lodash';
import { map } from 'rxjs';
import { Manga } from '../../models/mangadex';
import { HistoryCardComponent } from './components/history-card/history-card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

const HistoryPerPage = 30;

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HistoryCardComponent, NzButtonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  private historyService = inject(HistoryService);
  private mangaService = inject(MangaService);
  private destroyRef = inject(DestroyRef);

  history = this.historyService.getHistory();
  chunkIds = _.chunk(Object.keys(this.history), HistoryPerPage);

  page = signal(0);
  isDisabled = computed(() => this.page() === this.chunkIds.length - 1);
  historyManga = signal<Manga[]>([]);

  constructor() {
    effect(() => {
      this.mangaService
        .fetchHistoryOrFavoriteManga({
          ids: this.chunkIds[this.page()],
          limit: HistoryPerPage,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          map(mangaList => mangaList.data)
        )
        .subscribe({
          next: mangaData =>
            this.historyManga.update(historyManga =>
              historyManga
                .concat(mangaData)
                .sort(
                  (a, b) =>
                    this.history[b.id].readAt - this.history[a.id].readAt
                )
            ),
        });
    });
  }

  loadMore() {
    if (this.isDisabled()) return;
    this.page.update(page => page + 1);
  }
}
