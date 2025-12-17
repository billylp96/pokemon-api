import { PaginatorService } from './../../shared/components/paginator/paginator.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Character} from '../interfaces/character-interface';
import { CharactersResponse } from '../interfaces/characters-response';

interface DbzOptions {
  page?: number,
  limit?: number
}

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private url = environment.URL_API_DBZ;
  private http = inject(HttpClient)

  getCharacters(options: DbzOptions): Observable<CharactersResponse> {
    const { page = 0, limit = 10 } = options
    return this.http.get<CharactersResponse>(`${this.url}/characters`, {params:
      {
        page,
        limit
      }
    })
  }

  getCharacter(id:number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/characters/${id}`);
  }

}
