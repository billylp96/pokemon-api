import { Routes } from '@angular/router';
import { DbzHomePageComponent } from './pages/dbz-home-page/dbz-home-page.component';

const DragonBallRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: DbzHomePageComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

export default DragonBallRoutes;
