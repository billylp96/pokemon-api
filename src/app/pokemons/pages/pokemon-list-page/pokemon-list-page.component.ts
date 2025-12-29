import { Component, input, OnInit } from '@angular/core';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";
import { TittleComponent } from "../../../shared/components/tittle/tittle.component";

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.css'],
  imports: [PokemonListComponent, TittleComponent]
})
export default class PokemonListPageComponent  {

  title='List of Pokémons';

}
