import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get userId(): number {
    return Number(localStorage.getItem('userId') || 0);
  }

  saveSession(token: string, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(userId));
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
