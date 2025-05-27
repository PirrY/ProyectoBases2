import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-game/add-game.component').then(m => m.AddGameComponent)
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/game-list/game-list.component').then(m => m.GameListComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-game/search-game.component').then(m => m.SearchGameComponent)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./pages/game-ranking/game-ranking.component').then(m => m.GameRankingComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];