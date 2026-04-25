import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUser: any = null;

  setUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user)); // opcional: persistir
  }

  getUser(): any {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }
}
