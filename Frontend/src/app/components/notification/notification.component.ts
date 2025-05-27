import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" [@fadeInOut]
      class="notification fixed top-4 right-4 p-4 rounded-md shadow-lg text-white animate-fade-in z-50"
      [ngClass]="{'bg-green-500': notification?.type === 'success', 'bg-red-500': notification?.type === 'error'}">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg *ngIf="notification?.type === 'success'" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg *ngIf="notification?.type === 'error'" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p>{{ notification?.message }}</p>
        </div>
        <div class="ml-auto pl-3">
          <button (click)="visible = false" class="inline-flex text-white hover:text-gray-200">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class NotificationComponent implements OnInit {
  notification: { message: string; type: 'success' | 'error' } | null = null;
  visible = false;
  private timeout: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {
      this.notification = notification;
      this.visible = true;
      
      // Clear any existing timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      // Auto-hide after 5 seconds
      this.timeout = setTimeout(() => {
        this.visible = false;
      }, 5000);
    });
  }
}