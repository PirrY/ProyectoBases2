import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ConsultationService } from '../../services/consultation.service';
import { NotificationService } from '../../services/notification.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-search-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <div class="card">
        <h2 class="text-2xl font-bold text-primary-600 mb-6">Buscar Videojuego</h2>
        
        <div class="mb-6">
          <form (ngSubmit)="searchGame()" class="flex">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              name="searchTerm"
              placeholder="Nombre del juego..." 
              required
              class="form-input flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
            <button 
              type="submit" 
              [disabled]="!searchTerm || isSearching"
              [ngClass]="{'opacity-50 cursor-not-allowed': !searchTerm || isSearching}"
              class="btn bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors"
            >
              <span *ngIf="isSearching" class="inline-block animate-spin mr-2">↻</span>
              {{ isSearching ? 'Buscando...' : 'Buscar' }}
            </button>
          </form>
          <p *ngIf="!gameFound && searched && !isSearching" class="mt-2 text-red-500">
            No se encontró ningún juego con ese nombre
          </p>
        </div>
        
        <div *ngIf="gameFound" class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-xl font-semibold text-gray-800">{{ gameFound.nombre }}</h3>
          </div>
          
          <div class="px-6 py-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Género</p>
                <p class="font-medium">{{ gameFound.genero }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-600">Plataforma</p>
                <p class="font-medium">{{ gameFound.plataforma }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-600">Precio</p>
                <p class="font-medium">{{ gameFound.precio.toFixed(2) }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-600">Stock</p>
                <p [ngClass]="{
                  'font-medium': true,
                  'text-green-600': gameFound.stock > 10,
                  'text-yellow-600': gameFound.stock > 0 && gameFound.stock <= 10,
                  'text-red-600': gameFound.stock === 0
                }">
                  {{ gameFound.stock }} unidades
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="searched && gameFound" class="mt-4 text-sm text-gray-600">
          <p>Esta consulta ha sido registrada para análisis de frecuencia.</p>
        </div>
      </div>
    </div>
  `
})
export class SearchGameComponent {
  searchTerm = '';
  gameFound: Game | null = null;
  isSearching = false;
  searched = false;
  
  constructor(
    private gameService: GameService,
    private consultationService: ConsultationService,
    private notificationService: NotificationService
  ) {}
  
  searchGame(): void {
    if (!this.searchTerm) {
      return;
    }
    
    this.isSearching = true;
    this.searched = false;
    this.gameFound = null;
    
    this.gameService.searchGameByName(this.searchTerm).subscribe({
      next: (game) => {
        this.gameFound = game;
        this.searched = true;
        this.isSearching = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.gameFound = null;
          this.searched = true;
        } else {
          this.notificationService.showError('Error al buscar el juego: ' + (error.message || 'Desconocido'));
        }
        this.isSearching = false;
      }
    });
  }
}