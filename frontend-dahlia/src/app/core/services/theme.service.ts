import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _isDarkMode = new BehaviorSubject<boolean>(true);
  isDarkMode$ = this._isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Vérifier si nous sommes côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Récupérer le thème depuis le localStorage ou utiliser le mode sombre par défaut
      const savedTheme = localStorage.getItem('app-theme');
      this._isDarkMode.next(savedTheme !== 'light');
      this.applyTheme(this._isDarkMode.value);
    }
  }

  toggleTheme() {
    const newTheme = !this._isDarkMode.value;
    this._isDarkMode.next(newTheme);
    this.applyTheme(newTheme);
    
    // Sauvegarder le thème dans le localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('app-theme', newTheme ? 'dark' : 'light');
    }
  }

  applyTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      
      if (isDark) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }
    }
  }

  getCurrentTheme(): boolean {
    return this._isDarkMode.value;
  }
}
