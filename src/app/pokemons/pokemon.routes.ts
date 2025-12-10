import { Routes } from '@angular/router';
export const pokemonRoutes: Routes = [
    {
        path: "",
        loadComponent: ()=>import("./pages/pokemon-home-page/pokemon-home-page.component")
    }
]

export default pokemonRoutes;