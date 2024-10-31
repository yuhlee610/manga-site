import { Routes } from '@angular/router';
import { featureMangaListResolver, HomeComponent } from './pages/home/home.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { HistoryComponent } from './pages/history/history.component';
import { PopularComponent } from './pages/popular/popular.component';
import { MangaComponent } from './pages/manga/manga.component';

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
];
