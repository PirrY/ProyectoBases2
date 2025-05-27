import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center">
      <div class="max-w-3xl w-full text-center">
        <h1 class="text-4xl font-bold text-primary-600 mb-6">Gestión de Catálogo de Videojuegos</h1>
        <p class="text-lg mb-8">
          Bienvenido a la aplicación de gestión de catálogo de videojuegos. Esta plataforma te permite
          registrar, consultar, eliminar y analizar la frecuencia de consultas de videojuegos.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 class="text-lg font-semibold mb-2">Añadir Juego</h2>
            <p class="text-gray-600 text-center mb-4">Registra nuevos videojuegos en el catálogo</p>
            <a routerLink="/add" class="btn btn-primary mt-auto">Añadir</a>
          </div>

          <div class="card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-secondary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <h2 class="text-lg font-semibold mb-2">Listar Juegos</h2>
            <p class="text-gray-600 text-center mb-4">Visualiza todos los juegos registrados</p>
            <a routerLink="/list" class="btn btn-secondary mt-auto">Listar</a>
          </div>

          <div class="card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-accent-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 class="text-lg font-semibold mb-2">Buscar Juego</h2>
            <p class="text-gray-600 text-center mb-4">Encuentra un juego por su nombre</p>
            <a routerLink="/search" class="btn btn-accent mt-auto">Buscar</a>
          </div>

          <div class="card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 class="text-lg font-semibold mb-2">Ranking</h2>
            <p class="text-gray-600 text-center mb-4">Ver juegos más consultados</p>
            <a routerLink="/ranking" class="btn btn-primary mt-auto">Ranking</a>
          </div>
        </div>

        <div class="bg-primary-50 p-6 rounded-lg border border-primary-100">
          <h2 class="text-xl font-semibold text-primary-800 mb-3">Características principales</h2>
          <ul class="list-disc list-inside text-left">
            <li class="mb-2">Insertar nuevos videojuegos con nombre, género, plataforma, precio y stock</li>
            <li class="mb-2">Listar todos los videojuegos registrados con todos sus detalles</li>
            <li class="mb-2">Buscar videojuegos por nombre con registro automático de consultas</li>
            <li class="mb-2">Eliminar videojuegos del catálogo</li>
            <li>Ver ranking de juegos más consultados mediante análisis MapReduce</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}