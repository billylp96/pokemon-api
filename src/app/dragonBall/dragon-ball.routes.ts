import { Routes } from '@angular/router';
import { DbzHomePageComponent } from './pages/dbz-home-page/dbz-home-page.component';
import { ListPlanetsComponent } from './components/list/list-planets/list-planets.component';
import { ListCharactersComponent } from './components/list/list-characters/list-characters.component';
import { ListCaractersByComponent } from './components/list/list-caracters-by/list-caracters-by.component';

const DragonBallRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home', component: DbzHomePageComponent,
        children: [
          { path: 'characters', component: ListCharactersComponent },
          { path: 'characters-by', component: ListCaractersByComponent },
          { path: 'planets', component: ListPlanetsComponent },
          { path: '**', redirectTo: 'characters' },
        ]
      },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

export default DragonBallRoutes;
