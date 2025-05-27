import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { NotificationService } from '../../services/notification.service';
import { GameRanking } from '../../models/game-ranking.model';

@Component({
  selector: 'app-game-ranking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="card">
        <h2 class="text-2xl font-bold text-primary-600 mb-6">Ranking de Juegos Más Consultados</h2>
        
        <div *ngIf="isLoading" class="text-center py-8">
          <div class="inline-block animate-spin text-primary-600 text-4xl">↻</div>
          <p class="mt-2 text-gray-600">Cargando ranking...</p>
        </div>
        
        <div *ngIf="!isLoading && gameRankings.length === 0" class="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-600 mb-2">No hay datos de consultas disponibles</p>
          <a routerLink="/search" class="text-primary-600 hover:underline">Realizar una búsqueda</a>
        </div>
        
        <div *ngIf="!isLoading && gameRankings.length > 0">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posición
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Juego
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consultas
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularidad
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let ranking of gameRankings; let i = index" class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div [ngClass]="{
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold': true,
                      'bg-yellow-500': i === 0,
                      'bg-gray-400': i === 1,
                      'bg-amber-700': i === 2,
                      'bg-gray-200 text-gray-700': i > 2
                    }">
                      {{ i + 1 }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{{ ranking.gameName }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ ranking.consultationCount }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        class="bg-primary-600 h-2.5 rounded-full" 
                        [style.width]="(ranking.consultationCount / maxCount * 100) + '%'"
                      ></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class GameRankingComponent implements OnInit {
  gameRankings: GameRanking[] = [];
  isLoading = true;
  maxCount = 0;
  
  constructor(
    private gameService: GameService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadRankings();
  }
  
  loadRankings(): void {
    this.isLoading = true;
    
    this.gameService.getMostConsultedGames().subscribe({
      next: (rankings) => {
        this.gameRankings = rankings.sort((a, b) => b.consultationCount - a.consultationCount);
        
        if (this.gameRankings.length > 0) {
          this.maxCount = this.gameRankings[0].consultationCount;
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error al cargar el ranking: ' + (error.message || 'Desconocido'));
        this.isLoading = false;
      }
    });
  }
}