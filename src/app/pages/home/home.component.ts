import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { MangaService } from '../../services/manga/manga.service';
import { Manga, MangaList } from '../../models/mangadex';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  featureMangaList = signal<Manga[]>([]);

  ngOnInit(): void {
    const subscription = this.activatedRoute.data.subscribe((response) => {
      const mangaList = response['featureMangaList'] as MangaList;
      this.featureMangaList.set(mangaList.data);
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const featureMangaListResolver = () => {
  const mangaService = inject(MangaService);

  return mangaService.getFeatureMangaList();
};
