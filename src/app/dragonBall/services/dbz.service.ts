import { CharactersResponse } from './../interfaces/characters-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, of, tap } from 'rxjs';
import { Character } from '../interfaces/character-interface';

interface DbzOptions {
  page?: number,
  limit?: number
}

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private url = environment.URL_API_DBZ;
  private http = inject(HttpClient);

  getCharacters(options: DbzOptions): Observable<CharactersResponse> {
    const { page = 0, limit = 10 } = options
    const key = `dbz-${page}-${limit}`

    if(sessionStorage.getItem(key)){
      const characterResponse=JSON.parse(sessionStorage.getItem(key) || "{}");
      return of(characterResponse)
    }

    return this.http.get<CharactersResponse>(`${this.url}/characters`, {
      params:
      {
        page,
        limit
      }
    }).pipe(
      tap((res)=>sessionStorage.setItem(key,JSON.stringify(res)))
    )

  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/characters/${id}`);
  }

}
