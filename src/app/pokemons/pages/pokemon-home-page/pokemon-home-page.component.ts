import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-home-page',
  templateUrl: './pokemon-home-page.component.html',
  styleUrls: ['./pokemon-home-page.component.css'],
    imports: [PokemonListComponent]
})
export default class PokemonHomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
