import { Component, input, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { PlanetModalComponent } from "../../modal/planet-modal/planet-modal.component";
import { Planet } from '../../../interfaces/planet-interface';
import { Character } from '../../../interfaces/character-interface';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html',
  styleUrls: ['./planet-card.component.css'],
  imports: [TitleCasePipe, PlanetModalComponent]
})
export class PlanetCardComponent {
  planet = input.required<Planet>();

  openModal=signal<boolean>(false);

  planetProperties(planet: Planet) {
    return Object.entries(planet)
      .filter(([key]) =>
        key !== 'image' &&
        key !== 'deletedAt' &&
        key !== 'id'
      )
      .map(([key, value]) => ({ key, value }));
  }

 
}
