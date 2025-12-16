import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
  styleUrls: ['./pokemon-list-page.component.css'],
  imports: [PokemonListComponent]
})
export default class PokemonListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
