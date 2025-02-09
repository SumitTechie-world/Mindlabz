import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  private tokenKey = 'access_token';
  
  setKey(key: string, token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, token);
    }
  }

  getKey(key: string): string | null { 
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;  // Or handle the SSR case as needed
  }

  removeKey(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = this.getKey(this.tokenKey);
    return !!token;
  }
}
