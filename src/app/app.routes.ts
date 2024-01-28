import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/company-list/company-list.component').then(c => c.CompanyListComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/company-detail/company-detail.component').then(c => c.CompanyDetailComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/company-yandex-map/company-yandex-map.component').then(c => c.CompanyYandexMapComponent)
  }
];
