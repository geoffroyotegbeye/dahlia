import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { MediaItem } from '../../../models/content.model';

@Component({
  selector: 'app-admin-media-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Gestion des Médias</h1>
      
      <!-- Upload Media Section -->
      <div class="mb-6 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Télécharger un Média</h2>
        <div class="flex items-center space-x-4">
          <input 
            type="file" 
            (change)="onFileSelected($event)"
            class="flex-grow"
            accept="image/*,video/*,audio/*"
          >
          <input 
            type="text" 
            [(ngModel)]="newMediaMetadata.title"
            placeholder="Titre du média"
            class="px-3 py-2 border rounded-lg"
          >
          <select 
            [(ngModel)]="newMediaMetadata.type"
            class="px-3 py-2 border rounded-lg"
          >
            <option value="">Type de média</option>
            <option value="image">Image</option>
            <option value="video">Vidéo</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>
          <button 
            (click)="uploadMedia()"
            class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            [disabled]="!selectedFile"
          >
            Télécharger
          </button>
        </div>
      </div>

      <!-- Media Filters -->
      <div class="mb-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <select 
            [(ngModel)]="selectedMediaType" 
            class="px-3 py-2 border rounded-lg"
            (change)="filterMedia()"
          >
            <option value="">Tous les types</option>
            <option value="image">Images</option>
            <option value="video">Vidéos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
          </select>
        </div>
      </div>

      <!-- Media Grid -->
      <div class="grid grid-cols-3 gap-4">
        <div 
          *ngFor="let media of filteredMedia" 
          class="bg-white shadow-md rounded-lg overflow-hidden relative group"
        >
          <!-- Media Preview -->
          <div class="relative">
            <ng-container [ngSwitch]="media.type">
              <img 
                *ngSwitchCase="'image'" 
                [src]="media.url" 
                class="w-full h-48 object-cover"
              >
              <video 
                *ngSwitchCase="'video'" 
                [src]="media.url" 
                class="w-full h-48 object-cover"
              ></video>
              <div 
                *ngSwitchCase="'audio'" 
                class="w-full h-48 bg-gray-200 flex items-center justify-center"
              >
                <i class="fas fa-music text-4xl text-gray-500"></i>
              </div>
              <div 
                *ngSwitchCase="'document'" 
                class="w-full h-48 bg-gray-100 flex items-center justify-center"
              >
                <i class="fas fa-file text-4xl text-gray-500"></i>
              </div>
            </ng-container>

            <!-- Overlay Actions -->
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                class="bg-white text-orange-600 px-3 py-2 rounded-lg mr-2"
                (click)="copyMediaUrl(media.url)"
              >
                Copier URL
              </button>
              <button 
                class="bg-red-600 text-white px-3 py-2 rounded-lg"
                (click)="deleteMedia(media.id)"
              >
                Supprimer
              </button>
            </div>
          </div>

          <!-- Media Details -->
          <div class="p-4">
            <h3 class="font-semibold">{{ media.title }}</h3>
            <p class="text-sm text-gray-500">{{ media.type }} | {{ media.size | number }} octets</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminMediaComponent implements OnInit {
  media: MediaItem[] = [];
  filteredMedia: MediaItem[] = [];
  
  selectedFile: File | null = null;
  selectedMediaType: string = '';
  
  newMediaMetadata: Partial<MediaItem> = {
    title: '',
    type: undefined
  };

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia() {
    this.contentService.getMedia().subscribe({
      next: (mediaItems) => {
        this.media = mediaItems;
        this.filteredMedia = mediaItems;
      },
      error: (err) => {
        console.error('Erreur de chargement des médias', err);
        // TODO: Ajouter une notification d'erreur
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Pré-remplir le titre avec le nom du fichier
      this.newMediaMetadata.title = file.name;
      
      // Déterminer automatiquement le type de média
      const fileType = file.type.split('/')[0];
      switch (fileType) {
        case 'image': this.newMediaMetadata.type = 'image'; break;
        case 'video': this.newMediaMetadata.type = 'video'; break;
        case 'audio': this.newMediaMetadata.type = 'audio'; break;
        default: this.newMediaMetadata.type = 'document';
      }
    }
  }

  uploadMedia() {
    if (this.selectedFile && this.newMediaMetadata.title && this.newMediaMetadata.type) {
      this.contentService.uploadMedia(this.selectedFile, this.newMediaMetadata).subscribe({
        next: (uploadedMedia) => {
          this.media.push(uploadedMedia);
          this.filteredMedia = this.media;
          
          // Réinitialiser le formulaire
          this.selectedFile = null;
          this.newMediaMetadata = {};
          
          // Réinitialiser l'input file
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        },
        error: (err) => {
          console.error('Erreur de téléchargement', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    }
  }

  filterMedia() {
    this.filteredMedia = this.media.filter(mediaItem => 
      !this.selectedMediaType || mediaItem.type === this.selectedMediaType
    );
  }

  copyMediaUrl(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      // TODO: Ajouter un toast de confirmation
      console.log('URL copiée');
    });
  }

  deleteMedia(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
      this.contentService.deleteMedia(id).subscribe({
        next: () => {
          this.media = this.media.filter(m => m.id !== id);
          this.filteredMedia = this.media;
        },
        error: (err) => {
          console.error('Erreur de suppression', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    }
  }
}
