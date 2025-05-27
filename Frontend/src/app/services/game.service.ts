import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { GameRanking } from '../models/game-ranking.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = '/api'; // Game service API

  constructor(private http: HttpClient) { }

  // Add a new game
  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games`, game);
  }

  // Get all games
  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  // Search for a game by name
  searchGameByName(name: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/search?name=${name}`);
  }

  // Search games by name (returns list)
  searchGames(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games/search-list?name=${name}`);
  }

  // Delete a game by name
  deleteGameByName(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/games/${name}`);
  }

  // Get ranking of most consulted games
  getMostConsultedGames(): Observable<GameRanking[]> {
    return this.http.get<GameRanking[]>(`${this.apiUrl}/games/ranking`);
  }
}