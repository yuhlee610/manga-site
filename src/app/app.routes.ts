import { Routes } from '@angular/router';
import {
  featureMangaListResolver,
  HomeComponent,
} from './features/home/home.component';
import { MyListComponent } from './features/my-list/my-list.component';
import { HistoryComponent } from './features/history/history.component';
import { PopularComponent } from './features/popular/popular.component';
import { MangaComponent } from './features/manga/manga.component';
import { SearchComponent } from './features/search/search.component';
import { ChapterComponent } from './features/chapter/chapter.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      featureMangaList: featureMangaListResolver,
    },
  },
  {
    path: 'my-list',
    component: MyListComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'popular',
    component: PopularComponent,
  },
  {
    path: 'manga/:mangaId',
    component: MangaComponent,
  },
  {
    path: 'chapter/:chapterId',
    component: ChapterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
];
