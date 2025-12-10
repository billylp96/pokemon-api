import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, map, Observable, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonResponse } from '../interfaces/pokemon-response.interface';

export interface Options{
  limit?:number,
  offset?:number
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = environment.URL_API_POKEMON;
  private http = inject(HttpClient);

  getPokemons(options:Options): Observable<PokemonResponse> {
    const {limit=12,offset=0}=options;
    let params = new HttpParams().append("limit", limit).append("offset", offset);
    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: params }).pipe(
      delay(300)
    )
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/pokemon/${name}`)
      .pipe(
        map(response => {
          return {
            name: response.name,
            order: response.order,
            weight: response.weight,
            abilities: response.abilities,
            cries: response.cries,
            moves: response.moves,
            sprites: response.sprites,
            types: response.types,
          }
        })

      );
  }

}
