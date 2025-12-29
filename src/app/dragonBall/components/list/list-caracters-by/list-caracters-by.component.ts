import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TittleComponent } from "../../../../shared/components/tittle/tittle.component";
import { MenuButtonsComponent } from "../../menu-buttons/menuButtons/menuButtons.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { DbzService } from '../../../services/dbz.service';
import { CharacterCardComponent } from "../../card/character-card/character-card.component";

@Component({
  selector: 'app-list-caracters-by',
  templateUrl: './list-caracters-by.component.html',
  styleUrls: ['./list-caracters-by.component.css'],
  imports: [TittleComponent, MenuButtonsComponent, LoadingSpinnerComponent, CharacterCardComponent]
})
export class ListCaractersByComponent {
  races = signal(['Human', 'Saiyan', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race',
    'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown']);

  race = signal('Human')
  title = "Characters By"
  dbzService = inject(DbzService);

  dbzResource = rxResource({
    params: () => ({ race: this.race() }),
    stream: ({ params }) => {
      return this.dbzService.getCharactersByRace({ race: params.race })
    }
  });

  characters = computed(() => {
    return this.dbzResource.value();
  });

  filtrar(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.race.set(select.value);

  }
}
