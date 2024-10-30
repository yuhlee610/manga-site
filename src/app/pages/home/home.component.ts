import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MangaService } from '../../services/manga/manga.service';
import { Manga, MangaList } from '../../models/mangadex';
import { ActivatedRoute } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CarouselComponent } from './carousel/carousel.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { map, switchMap } from 'rxjs';
import { StatisticService } from '../../services/statistic/statistic.service';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RankMangaCardComponent } from '../../components/rank-manga-card/rank-manga-card.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzGridModule,
    CarouselComponent,
    NzTypographyModule,
    AsyncPipe,
    RankMangaCardComponent,
    NzFlexModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private statisticService = inject(StatisticService);
  private mangaService = inject(MangaService);
  featureMangaList = toSignal(
    this.activatedRoute.data.pipe(map((data) => (data['featureMangaList'] as MangaList).data)),
    { initialValue: [] }
  );
  featureMangaListStatistics = toSignal(
    toObservable(this.featureMangaList).pipe(
      switchMap((mangaData) => this.statisticService.getStatisticsFromMangaList(mangaData))
    )
  );
  trendingMangaList = toSignal(
    this.mangaService.getTrendingMangaList().pipe(map((mangaList) => mangaList.data)),
    { initialValue: [] }
  );
  trendingMangaListStatistics = toSignal(
    toObservable(this.trendingMangaList).pipe(
      switchMap((mangaData) => this.statisticService.getStatisticsFromMangaList(mangaData))
    )
  );
}

export const featureMangaListResolver = () => {
  const mangaService = inject(MangaService);

  return mangaService.getFeatureMangaList();
};
