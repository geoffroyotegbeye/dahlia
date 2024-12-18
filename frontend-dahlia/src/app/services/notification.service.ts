import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<Notification>();
  notifications$ = this.notificationsSubject.asObservable();

  showSuccess(message: string) {
    this.notificationsSubject.next({ type: 'success', message });
  }

  showError(message: string) {
    this.notificationsSubject.next({ type: 'error', message });
  }
}
