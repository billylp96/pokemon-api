import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { HomePageComponent } from './pages/home-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path:'home',
        component:HomePageComponent,
        children:[
          {
            path:'pokemon',
            loadChildren: ()=>import("../pokemons/pokemon.routes")
          },
          {
            path:'**',
            redirectTo:'pokemon'
          }
        ]
      },

      {
        path:"**",
        redirectTo:'home/pokemon'
      }
      
    ]

  },
];

export default homeRoutes;

