import { Component, computed, inject, OnInit } from '@angular/core';
import { DbzService } from '../../../services/dbz.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorService } from '../../../../shared/components/paginator/paginator.service';
import { PaginatorComponent } from "../../../../shared/components/paginator/paginator.component";
import { PlanetCardComponent } from "../../card/planet-card/planet-card.component";
import { TittleComponent } from "../../../../shared/components/tittle/tittle.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-list-planets',
  templateUrl: './list-planets.component.html',
  styleUrls: ['./list-planets.component.css'],
  imports: [PaginatorComponent, PlanetCardComponent, TittleComponent, LoadingSpinnerComponent]
})
export class ListPlanetsComponent {
  service = inject(DbzService);
  paginationService = inject(PaginatorService);
  title='List of Planets';

  planetsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.service.getPlanets({ page: params.page });
    }
  });


  totalPages = computed(() => {
    const totalPages = this.planetsResource.value()?.meta.totalPages!
    return totalPages
  });

}
