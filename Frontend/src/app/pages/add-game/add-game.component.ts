import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { NotificationService } from '../../services/notification.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto">
      <div class="card">
        <h2 class="text-2xl font-bold text-primary-600 mb-6">Añadir Nuevo Videojuego</h2>
        
        <form [formGroup]="gameForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="nombre" class="form-label">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              formControlName="nombre"
              class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
            <div *ngIf="gameForm.get('nombre')?.invalid && (gameForm.get('nombre')?.dirty || gameForm.get('nombre')?.touched)" class="text-red-500 mt-1 text-sm">
              <div *ngIf="gameForm.get('nombre')?.errors?.['required']">El nombre es obligatorio.</div>
            </div>
          </div>
          
          <div>
            <label for="genero" class="form-label">Género</label>
            <select 
              id="genero" 
              formControlName="genero"
              class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
              <option value="">Seleccione un género</option>
              <option value="Acción">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="RPG">RPG</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Deportes">Deportes</option>
              <option value="Simulación">Simulación</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Shooter">Shooter</option>
              <option value="Plataformas">Plataformas</option>
              <option value="Otro">Otro</option>
            </select>
            <div *ngIf="gameForm.get('genero')?.invalid && (gameForm.get('genero')?.dirty || gameForm.get('genero')?.touched)" class="text-red-500 mt-1 text-sm">
              <div *ngIf="gameForm.get('genero')?.errors?.['required']">El género es obligatorio.</div>
            </div>
          </div>
          
          <div>
            <label for="plataforma" class="form-label">Plataforma</label>
            <select 
              id="plataforma" 
              formControlName="plataforma"
              class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
              <option value="">Seleccione una plataforma</option>
              <option value="PC">PC</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="PlayStation 4">PlayStation 4</option>
              <option value="Xbox Series X/S">Xbox Series X/S</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Nintendo 3DS">Nintendo 3DS</option>
              <option value="iOS">iOS</option>
              <option value="Android">Android</option>
              <option value="Otra">Otra</option>
            </select>
            <div *ngIf="gameForm.get('plataforma')?.invalid && (gameForm.get('plataforma')?.dirty || gameForm.get('plataforma')?.touched)" class="text-red-500 mt-1 text-sm">
              <div *ngIf="gameForm.get('plataforma')?.errors?.['required']">La plataforma es obligatoria.</div>
            </div>
          </div>
          
          <div>
            <label for="precio" class="form-label">Precio</label>
            <input 
              type="number" 
              id="precio" 
              formControlName="precio"
              min="0"
              step="0.01"
              class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
            <div *ngIf="gameForm.get('precio')?.invalid && (gameForm.get('precio')?.dirty || gameForm.get('precio')?.touched)" class="text-red-500 mt-1 text-sm">
              <div *ngIf="gameForm.get('precio')?.errors?.['required']">El precio es obligatorio.</div>
              <div *ngIf="gameForm.get('precio')?.errors?.['min']">El precio no puede ser negativo.</div>
            </div>
          </div>
          
          <div>
            <label for="stock" class="form-label">Stock</label>
            <input 
              type="number" 
              id="stock" 
              formControlName="stock"
              min="0"
              step="1"
              class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            >
            <div *ngIf="gameForm.get('stock')?.invalid && (gameForm.get('stock')?.dirty || gameForm.get('stock')?.touched)" class="text-red-500 mt-1 text-sm">
              <div *ngIf="gameForm.get('stock')?.errors?.['required']">El stock es obligatorio.</div>
              <div *ngIf="gameForm.get('stock')?.errors?.['min']">El stock no puede ser negativo.</div>
            </div>
          </div>
          
          <div class="pt-2">
            <button 
              type="submit" 
              [disabled]="gameForm.invalid || isSubmitting"
              [ngClass]="{'opacity-50 cursor-not-allowed': gameForm.invalid || isSubmitting}"
              class="btn btn-primary w-full"
            >
              <span *ngIf="isSubmitting" class="inline-block animate-spin mr-2">↻</span>
              {{ isSubmitting ? 'Guardando...' : 'Guardar Juego' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddGameComponent {
  gameForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private notificationService: NotificationService
  ) {
    this.gameForm = this.fb.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.gameForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const game: Game = this.gameForm.value;

    this.gameService.addGame(game).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Juego añadido exitosamente');
        this.gameForm.reset({
          precio: 0,
          stock: 0
        });
        this.isSubmitting = false;
      },
      error: (error) => {
        this.notificationService.showError('Error al añadir el juego: ' + (error.message || 'Desconocido'));
        this.isSubmitting = false;
      }
    });
  }
}