import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, map, Observable, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonResponse } from '../interfaces/pokemon-response.interface';

export interface Options {
  limit?: number,
  offset?: number,
  term?: string,
  paramsPage?: number,
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = environment.URL_API_POKEMON;
  private http = inject(HttpClient);

  getPokemons(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0 } = options;
    console.log("limit",limit);
    console.log("offset",offset);
    
    let params = new HttpParams().append("limit", limit).append("offset", offset);
    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: params }).pipe(
      delay(300),
      tap(
        (res)=>console.log("count",res.count)
        
      )
    )
  }

  getAllPokemons(options: Options): Observable<PokemonResponse> {
    const { limit = 12, offset = 0, term = '', paramsPage = 0 } = options;
    let paramsHttp = new HttpParams().append("limit", 100000).append("offset", 0);
    return this.http.get<PokemonResponse>(`${this.url}/pokemon`, { params: paramsHttp}).pipe(
      delay(300),
      map(res => {
        const results = res.results.filter((p: any) =>
          p.name.includes(term)
        );

        return {
          count: results.length,
          results: results.slice(
            paramsPage * limit,
            paramsPage * limit + limit
          )
        } as PokemonResponse;

       
      })
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