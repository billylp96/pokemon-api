import { Routes } from '@angular/router';
import PokemonHomePageComponent from './pages/pokemon-home-page/pokemon-home-page.component';
import PokemonListPageComponent from './pages/pokemon-list-page/pokemon-list-page.component';
import { PokemonViewPageComponent } from './pages/pokemon-view-page/pokemon-view-page.component';
export const pokemonRoutes: Routes = [
    {
        path: "",
        component:PokemonHomePageComponent,
        children: [
            {
                path: "list",
                component:PokemonListPageComponent
            },
            {
                path: "view/:name",
                component:PokemonViewPageComponent
            }
            ,{
                path: "**",
                redirectTo:'list'
            },
        ]
    }
]

export default pokemonRoutes;