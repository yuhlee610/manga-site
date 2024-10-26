import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { HistoryComponent } from './pages/history/history.component';
import { PopularComponent } from './pages/popular/popular.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
];
