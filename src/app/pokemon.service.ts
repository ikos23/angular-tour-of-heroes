import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { MessageService } from './message.service';
import { Pokemon, Pokemons } from './types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getPokemons(): Observable<Pokemon[]> {
    const cachedData = localStorage.getItem('pokemons');

    if (!cachedData) {
      const url = 'https://pokeapi.co/api/v2/pokemon';
      return this.http.get<Pokemons>(url).pipe(
        mergeMap((resp) => from(resp.results)),
        mergeMap((pokemon) => this.http.get<Pokemon>(pokemon.url)),
        toArray(),
        tap((data) => localStorage.setItem('pokemons', JSON.stringify(data)))
      );
    } else {
      this.messageService.add('PokemonService: fetched data from cache.');
      return of(JSON.parse(cachedData));
    }
  }

  getPokemon(idOrName: number | string): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
    return this.http
      .get<Pokemon>(url)
      .pipe(catchError(this.handleError<Pokemon>('PokemonService.getPokemon')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.add(`${operation} failed. Status: ${error.status}`);
      console.error(error);

      return of();
    };
  }
}
