import { Component, computed, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, tap } from 'rxjs';
import { PaginatorService } from '../../../shared/components/paginator/paginator.service';
import { DbzService } from '../../services/dbz.service';
import { CharacterCardComponent } from "../../components/card/character-card/character-card.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-dbz-home-page',
  templateUrl: './dbz-home-page.component.html',
  styleUrls: ['./dbz-home-page.component.css'],
  imports: [ RouterOutlet, RouterLinkWithHref]
})
export class DbzHomePageComponent {
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
