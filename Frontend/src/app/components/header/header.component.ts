import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="bg-primary-600 text-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <h1 class="text-2xl font-bold">Catálogo de Videojuegos</h1>
          </div>
          
          <nav class="w-full md:w-auto">
            <ul class="flex flex-wrap justify-center md:space-x-6">
              <li class="mx-2 my-1"><a routerLink="/" routerLinkActive="font-bold underline" [routerLinkActiveOptions]="{exact: true}" class="hover:text-primary-200 transition-colors">Inicio</a></li>
              <li class="mx-2 my-1"><a routerLink="/add" routerLinkActive="font-bold underline" class="hover:text-primary-200 transition-colors">Añadir Juego</a></li>
              <li class="mx-2 my-1"><a routerLink="/list" routerLinkActive="font-bold underline" class="hover:text-primary-200 transition-colors">Listar Juegos</a></li>
              <li class="mx-2 my-1"><a routerLink="/search" routerLinkActive="font-bold underline" class="hover:text-primary-200 transition-colors">Buscar Juego</a></li>
              <li class="mx-2 my-1"><a routerLink="/ranking" routerLinkActive="font-bold underline" class="hover:text-primary-200 transition-colors">Ranking</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}