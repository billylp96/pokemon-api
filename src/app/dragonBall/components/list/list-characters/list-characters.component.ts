import { Component, computed, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay } from 'rxjs';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { PaginatorService } from '../../../../shared/components/paginator/paginator.service';
import { DbzService } from '../../../services/dbz.service';
import { CharacterCardComponent } from '../../card/character-card/character-card.component';


@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css'],
  imports: [PaginatorComponent, CharacterCardComponent]
})
export class ListCharactersComponent {

 service = inject(DbzService);
  paginationService = inject(PaginatorService)


  dbzResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage()  }),
    stream: ({ params }) => {
      return this.service.getCharacters({ page: params.page }).pipe(delay(300),)
    }
  });

  characters = computed(() => {
    return this.dbzResource.value()?.items;
  });

  totalPages = computed(() => {
    return this.dbzResource.value()?.meta.totalPages!;
  });

}
