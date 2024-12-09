import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { MediaItem } from '../../../models/content.model';

interface PageSection {
  id: string;
  type: 'hero' | 'mission' | 'footer-objective';
  title: string;
  description: string;
  image?: string;
  video?: string;
}

@Component({
  selector: 'app-pages-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Gestion du Contenu des Pages</h1>
      
      <!-- Sections Selection -->
      <div class="mb-6 flex space-x-4">
        <button 
          *ngFor="let section of sectionTypes"
          class="px-4 py-2 rounded-lg"
          [ngClass]="{
            'bg-orange-600 text-white': selectedSection === section,
            'bg-gray-200 text-gray-700': selectedSection !== section
          }"
          (click)="selectSection(section)"
        >
          {{ getSectionLabel(section) }}
        </button>
      </div>

      <!-- Section Edition -->
      <div *ngIf="currentSection" class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">
          Édition de {{ getSectionLabel(currentSection.type) }}
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Texte et Métadonnées -->
          <div class="space-y-4">
            <input 
              type="text"
              [(ngModel)]="currentSection.title"
              placeholder="Titre"
              class="w-full px-3 py-2 border rounded-lg"
            >
            <textarea 
              [(ngModel)]="currentSection.description"
              placeholder="Description"
              rows="5"
              class="w-full px-3 py-2 border rounded-lg"
            ></textarea>
          </div>

          <!-- Média -->
          <div class="space-y-4">
            <!-- Sélection d'image -->
            <div>
              <label class="block mb-2">Image</label>
              <div class="flex items-center space-x-4">
                <input 
                  type="file" 
                  (change)="onImageSelected($event)"
                  accept="image/*"
                  class="flex-grow"
                >
                <img 
                  *ngIf="currentSection.image" 
                  [src]="currentSection.image" 
                  class="w-24 h-24 object-cover rounded-lg"
                >
              </div>
            </div>

            <!-- Sélection de vidéo -->
            <div *ngIf="currentSection.type !== 'footer-objective'">
              <label class="block mb-2">Vidéo</label>
              <div class="flex items-center space-x-4">
                <input 
                  type="file" 
                  (change)="onVideoSelected($event)"
                  accept="video/*"
                  class="flex-grow"
                >
                <video 
                  *ngIf="currentSection.video" 
                  [src]="currentSection.video" 
                  class="w-24 h-24 object-cover rounded-lg"
                ></video>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end mt-6 space-x-4">
          <button 
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            (click)="cancelEdition()"
          >
            Annuler
          </button>
          <button 
            class="bg-orange-600 text-white px-4 py-2 rounded-lg"
            (click)="saveSection()"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <!-- Prévisualisation -->
      <div *ngIf="currentSection" class="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Prévisualisation</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-bold">Titre</h4>
            <p>{{ currentSection.title }}</p>
          </div>
          <div>
            <h4 class="font-bold">Description</h4>
            <p>{{ currentSection.description }}</p>
          </div>
          <div *ngIf="currentSection.image">
            <h4 class="font-bold">Image</h4>
            <img 
              [src]="currentSection.image" 
              class="max-w-full h-auto rounded-lg"
            >
          </div>
          <div *ngIf="currentSection.video && currentSection.type !== 'footer-objective'">
            <h4 class="font-bold">Vidéo</h4>
            <video 
              [src]="currentSection.video" 
              controls 
              class="max-w-full h-auto rounded-lg"
            ></video>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminContentPagesComponent implements OnInit {
  sectionTypes: PageSection['type'][] = ['hero', 'mission', 'footer-objective'];
  selectedSection: PageSection['type'] | null = null;
  currentSection: PageSection | null = null;

  sections: { [key in PageSection['type']]: PageSection } = {
    hero: {
      id: 'hero-section',
      type: 'hero',
      title: 'Dahlia : Ensemble pour un Avenir Meilleur',
      description: 'Notre mission est de créer un impact positif dans la communauté.',
      image: '',
      video: ''
    },
    mission: {
      id: 'mission-section',
      type: 'mission',
      title: 'Notre Mission',
      description: 'Nous nous engageons à transformer des vies et à construire des communautés résilientes.',
      image: '',
      video: ''
    },
    'footer-objective': {
      id: 'footer-objective-section',
      type: 'footer-objective',
      title: 'Objectif Annuel',
      description: 'Cette année, nous visons à soutenir 500 familles et à lever 100 000€ pour nos programmes.',
      image: ''
    }
  };

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    // Charger les données existantes depuis le service
    this.loadPageSections();
  }

  loadPageSections() {
    // TODO: Implémenter le chargement réel depuis le backend
    // Pour l'instant, on utilise les données par défaut
  }

  selectSection(type: PageSection['type']) {
    this.selectedSection = type;
    this.currentSection = { ...this.sections[type] };
  }

  getSectionLabel(type: PageSection['type']): string {
    const labels = {
      'hero': 'Section Héro',
      'mission': 'Section Mission',
      'footer-objective': 'Objectif Annuel (Footer)'
    };
    return labels[type];
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.currentSection) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.currentSection) {
          this.currentSection.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.currentSection && this.currentSection.type !== 'footer-objective') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.currentSection) {
          this.currentSection.video = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  cancelEdition() {
    if (this.selectedSection) {
      this.currentSection = { ...this.sections[this.selectedSection] };
    }
  }

  saveSection() {
    if (this.currentSection && this.selectedSection) {
      // Mettre à jour la section dans l'objet sections
      this.sections[this.selectedSection] = { ...this.currentSection };

      // TODO: Envoyer la mise à jour au backend
      this.contentService.updatePageSection(this.currentSection).subscribe({
        next: (updatedSection) => {
          console.log('Section mise à jour', updatedSection);
          // Optionnel : afficher une notification de succès
        },
        error: (err) => {
          console.error('Erreur de mise à jour', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    }
  }
}
