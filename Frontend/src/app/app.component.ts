import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    NotificationComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-header></app-header>
      <main class="flex-grow container mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-100 py-4 border-t border-gray-200">
        <div class="container mx-auto px-4 text-center text-gray-600">
          <p>© {{ currentYear }} Catálogo de Videojuegos</p>
        </div>
      </footer>
      <app-notification></app-notification>
    </div>
  `,
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}