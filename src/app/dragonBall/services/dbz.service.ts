import { CharactersResponse } from './../interfaces/characters-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { delay, Observable, of, tap } from 'rxjs';
import { Character } from '../interfaces/character-interface';
import {PlanetResponse } from '../interfaces/planet-response';
import { Planet } from '../interfaces/planet-interface';

interface DbzOptions {
  page?: number,
  limit?: number,
  race?:string
}

export interface CharactersVM {
  items: Character[];
  totalPages: number;
}


@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private url = environment.URL_API_DBZ;
  private http = inject(HttpClient);

  getCharacters(options: DbzOptions): Observable<CharactersResponse> {
    const { page = 0, limit = 10} = options
    const key = `dbz-characters-${page}-${limit}`

    if(sessionStorage.getItem(key)){
      const characterResponse=JSON.parse(sessionStorage.getItem(key) || "{}");
      return of(characterResponse).pipe(
        delay(100)
      )
    }
    return this.http.get<CharactersResponse>(`${this.url}/characters`, {
      params:
      {
        page,
        limit
      }
    }).pipe(
      tap((res)=>sessionStorage.setItem(key,JSON.stringify(res))),
      delay(300)
    )

  }

  getCharactersByRace(options: DbzOptions): Observable<Character[]> {
    const { race="Human" } = options
    const key = `dbz-characters-${race}`

    if(sessionStorage.getItem(key)){
      const characterResponse=JSON.parse(sessionStorage.getItem(key) || "{}");
      return of(characterResponse).pipe(
        delay(100)
      )
    }

    return this.http.get<Character[]>(`${this.url}/characters`, {
      params:
      {
        race,
      }
    }).pipe(
      tap((res)=>sessionStorage.setItem(key,JSON.stringify(res))),
      delay(300)
    )

  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/characters/${id}`);
  }

  //PLANETS------------------------------
   getPlanets(options: DbzOptions): Observable<PlanetResponse> {
    const { page = 0, limit = 10 } = options
    const key = `dbz-planets-${page}-${limit}`

    if(sessionStorage.getItem(key)){
      const planetResponse=JSON.parse(sessionStorage.getItem(key) || "{}");
      return of(planetResponse)
    }

    return this.http.get<PlanetResponse>(`${this.url}/planets`, {
      params:
      {
        page,
        limit
      }
    }).pipe(
      tap((res)=>sessionStorage.setItem(key,JSON.stringify(res)))
    )
  };

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.url}/planets/${id}`);
  }

}
