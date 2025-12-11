import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { PokemonService } from '../../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonResponse, PokemonResult } from '../../interfaces/pokemon-response.interface';
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { PaginatorService } from '../../../shared/components/paginator/paginator.service';
import { filter, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [PokemonCardComponent, PaginatorComponent]
})
export class PokemonListComponent {
  private service = inject(PokemonService)
  paginatorService = inject(PaginatorService);
  router = inject(Router);

  limit = signal(12);
  // offset = signal(0);
  apiCount = computed(() => this.pokemonResource.value()?.count ?? 0);
  totalPages = computed(() => Math.ceil(this.apiCount() / this.limit()))

  search = signal('');

  // pokemonResource = rxResource({
  //   params: () => ({page: this.paginatorService.currentPage() -1 }),
  //   stream: ({ params }) => this.service.getPokemons({
  //     offset: params.page * this.limit()
  //   })
  // });


  onSearch(term: string) {
    this.search.set(term.toLowerCase());
    this.router.navigate([])
  }


  pokemonResource = rxResource({
    params: () => ({
      page: this.paginatorService.currentPage() - 1,
      search: this.search()
    }),
    stream: ({ params }) => {

      // Caso A: si search no está vacío → búsqueda local
      if (params.search.trim().length > 0) {
        console.log("entro a search");

        return this.service.getAllPokemons({
          offset: params.page * this.limit(),
          paramsPage: params.page,
          term: params.search
        })
      }

      // Caso B: búsqueda vacía → paginación normal
      return this.service.getPokemons({
        offset: params.page * this.limit()
      }).pipe(
        //filter(()=>params.search.trim().length==0),
        tap((res) => {
          console.log("entro al normal")
          console.log(res.count)
        }
        )
      );
    }
  });


  // firstPage() {
  //   this.offset.update(v => 0);
  // }
  // lastPage() {
  //   this.offset.set((this.totalPages() - 1) * this.limit());
  //   //this.offset.update(v => this.apiCount() - this.limit());
  // }

  // nextPage() {
  //   this.offset.update(v => this.offset() + this.limit());
  // }

  // previousPage() {
  //   this.offset.update(v => Math.max(0, (this.offset() - this.limit())));
  // }




























  // private service = inject(PokemonService);

  // limit = signal(12);
  // offset = signal(0);

  // pokemonResource = rxResource({
  //   params: () => ({ limit: this.limit(), offset: this.offset() }),
  //   stream: ({ params }) =>
  //     this.service.getPokemons(params.limit, params.offset),
  // });

  // nextPage() {
  //   this.offset.update(o => o + this.limit());
  // }

  // prevPage() {
  //   this.offset.update(o => Math.max(0, o - this.limit()));
  // }

  // total = computed(() => this.pokemonResource.value()?.count ?? 0);

  // totalPages = computed(() =>
  //   Math.ceil(this.total() / this.limit())
  // );

  // currentPage = computed(() =>
  //   Math.floor(this.offset() / this.limit()) + 1
  // );

  // goToPage(page: number) {
  //   const p = Math.min(Math.max(page, 1), this.totalPages());
  //   this.offset.set((p - 1) * this.limit());
  // }

  // firstPage() {
  //   this.offset.set(0);
  // }

  // lastPage() {
  //   this.offset.set((this.totalPages() - 1) * this.limit());
  // }


}

/*

<div class="flex justify-center items-center gap-4 my-4">
  <span>
    Página {{ currentPage() }} de {{ totalPages() }}
  </span>
</div>

<!-- 🔹 BOTONES SUPERIORES -->
<div class="flex justify-center gap-2 mb-4">
  <button (click)="firstPage()" [disabled]="currentPage() === 1">
    ⏮ Primero
  </button>

  <button (click)="prevPage()" [disabled]="currentPage() === 1">
    ⬅ Anterior
  </button>

  <button (click)="nextPage()" [disabled]="currentPage() === totalPages()">
    Siguiente ➡
  </button>

  <button (click)="lastPage()" [disabled]="currentPage() === totalPages()">
    Último ⏭
  </button>
</div>
*/