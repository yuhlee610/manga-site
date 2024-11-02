import { Component, inject, input, signal } from '@angular/core';
import { MangaService } from '../../services/manga/manga.service';
import { Manga, MangaStatistic } from '../../models/mangadex';
import { map, switchMap } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { InfoSectionComponent } from './info-section/info-section.component';
import { ChaptersComponent } from "./chapters/chapters.component";

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [InfoSectionComponent, ChaptersComponent],
  templateUrl: './manga.component.html',
  styleUrl: './manga.component.scss',
})
export class MangaComponent {
  mangaService = inject(MangaService);
  statisticService = inject(StatisticService);
  mangaId = input.required<string>();
  manga = signal<Manga | undefined>(undefined);
  statistic = signal<MangaStatistic | undefined>(undefined);

  ngOnInit() {
    this.mangaService
      .getManga(this.mangaId())
      .pipe(
        switchMap(mangaData =>
          this.statisticService
            .getStatistic(mangaData)
            .pipe(map(statisticData => ({ statisticData, mangaData })))
        )
      )
      .subscribe({
        next: ({ statisticData, mangaData }) => {
          console.log({ statisticData, mangaData });
          this.manga.set(mangaData);
          this.statistic.set(statisticData[mangaData.id]);
        },
      });
  }
}
