import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Paramètres du Site</h1>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Site Configuration -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Configuration Générale</h2>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Nom de l'Organisation</label>
            <input 
              type="text" 
              [(ngModel)]="siteName"
              class="w-full px-3 py-2 border rounded-lg"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Email de Contact</label>
            <input 
              type="email" 
              [(ngModel)]="contactEmail"
              class="w-full px-3 py-2 border rounded-lg"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Langue par Défaut</label>
            <select 
              [(ngModel)]="defaultLanguage"
              class="w-full px-3 py-2 border rounded-lg"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        
        <!-- Appearance Settings -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Apparence</h2>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Thème</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input 
                  type="radio" 
                  [(ngModel)]="theme" 
                  value="light"
                  class="form-radio"
                >
                <span class="ml-2">Clair</span>
              </label>
              <label class="inline-flex items-center">
                <input 
                  type="radio" 
                  [(ngModel)]="theme" 
                  value="dark"
                  class="form-radio"
                >
                <span class="ml-2">Sombre</span>
              </label>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Couleur Principale</label>
            <input 
              type="color" 
              [(ngModel)]="primaryColor"
              class="w-full h-12 border rounded-lg"
            >
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-right">
        <button 
          class="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          (click)="saveSettings()"
        >
          Enregistrer les Paramètres
        </button>
      </div>
    </div>
  `
})
export class AdminSettingsComponent implements OnInit {
  siteName: string = 'Dahlia';
  contactEmail: string = 'contact@dahlia.org';
  defaultLanguage: string = 'fr';
  theme: string = 'light';
  primaryColor: string = '#FF6B00'; // Orange par défaut

  constructor() {}

  ngOnInit(): void {
    this.loadCurrentSettings();
  }

  loadCurrentSettings() {
    // Charger les paramètres actuels depuis le stockage local ou un service backend
  }

  saveSettings() {
    // Logique pour sauvegarder les paramètres
    console.log('Paramètres sauvegardés', {
      siteName: this.siteName,
      contactEmail: this.contactEmail,
      defaultLanguage: this.defaultLanguage,
      theme: this.theme,
      primaryColor: this.primaryColor
    });
  }
}
