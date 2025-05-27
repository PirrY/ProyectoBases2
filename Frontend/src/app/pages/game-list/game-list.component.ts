import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { NotificationService } from '../../services/notification.service';
import { Game } from '../../models/game.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-list.component.html'
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  isLoading = true;
  searchTerm = '';
  sortField = 'nombre';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  showDeleteModal = false;
  gameToDelete: Game | null = null;
  
  constructor(
    private gameService: GameService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadGames();
  }
  
  loadGames(): void {
    this.isLoading = true;
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        this.games = games;
        this.filterGames();
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error al cargar los juegos: ' + (error.message || 'Desconocido'));
        this.isLoading = false;
      }
    });
  }
  
  filterGames(): void {
    if (!this.searchTerm) {
      this.filteredGames = [...this.games];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredGames = this.games.filter(game => 
        game.nombre.toLowerCase().includes(term) ||
        game.genero.toLowerCase().includes(term) ||
        game.plataforma.toLowerCase().includes(term)
      );
    }
    
    this.sortGames();
  }
  
  sortGames(): void {
    this.filteredGames.sort((a, b) => {
      let valueA: any = a[this.sortField as keyof Game];
      let valueB: any = b[this.sortField as keyof Game];
      
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortGames();
  }
  
  confirmDelete(game: Game): void {
    this.gameToDelete = game;
    this.showDeleteModal = true;
  }
  
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.gameToDelete = null;
  }
  
  deleteGame(): void {
    if (!this.gameToDelete || !this.gameToDelete.nombre) {
      return;
    }
    
    this.gameService.deleteGameByName(this.gameToDelete.nombre).subscribe({
      next: () => {
        this.notificationService.showSuccess('Juego eliminado exitosamente');
        this.games = this.games.filter(g => g.nombre !== this.gameToDelete?.nombre);
        this.filterGames();
        this.showDeleteModal = false;
        this.gameToDelete = null;
      },
      error: (error) => {
        this.notificationService.showError('Error al eliminar el juego: ' + (error.message || 'Desconocido'));
        this.showDeleteModal = false;
        this.gameToDelete = null;
      }
    });
  }
}