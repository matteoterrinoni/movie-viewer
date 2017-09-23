import { MoviePageComponent } from './movies/page';

export const appRoutes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MoviePageComponent },
  { path: 'movies/:id', component: MoviePageComponent }
];
