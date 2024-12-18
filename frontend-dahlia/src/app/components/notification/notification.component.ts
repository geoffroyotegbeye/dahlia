import { Component } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  template: `
    <div class="fixed top-0 right-0 m-4 space-y-2">
      <div *ngFor="let notification of notifications" [ngClass]="{
        'bg-green-500': notification.type === 'success',
        'bg-red-500': notification.type === 'error'
      }" class="text-white px-4 py-2 rounded shadow-md">
        {{ notification.message }}
      </div>
    </div>
  `,
  standalone: true
})
export class NotificationComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => this.notifications.shift(), 3000);
    });
  }
}
