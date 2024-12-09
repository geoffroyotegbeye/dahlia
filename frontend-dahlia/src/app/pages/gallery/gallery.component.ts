import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  event?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  heroImage = 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1573495627361-d9b187f1f4f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      thumbnail: 'https://images.unsplash.com/photo-1573495627361-d9b187f1f4f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=400&fit=crop',
      title: 'Atelier d\'Autonomisation Féminine',
      description: 'Nos femmes entrepreneurs en action',
      date: new Date('2023-09-15'),
      tags: ['Entrepreneuriat', 'Femmes'],
      event: 'Autonomisation'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1588783341882-9c9fd0ed0eac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=400&fit=crop',
      title: 'Projet Éducation Rurale',
      description: 'Construire des écoles, transformer des vies',
      date: new Date('2023-06-20'),
      tags: ['Éducation', 'Communauté'],
      event: 'Éducation'
    },
    // Plus d'éléments multimédias
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1532629345422-7515f3a7db99?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3a7db99?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=400&fit=crop',
      title: 'Campagne de Santé Communautaire',
      description: 'Dépistage et sensibilisation',
      date: new Date('2023-11-10'),
      tags: ['Santé', 'Communauté'],
      event: 'Santé'
    }
  ];

  filteredMediaItems: MediaItem[] = [];

  // Filtres
  selectedType: 'all' | 'image' | 'video' = 'all';
  selectedEvent: string = 'Tous';
  selectedYear: number | 'all' = 'all';

  // Options de filtrage
  eventOptions: string[] = ['Tous', 'Autonomisation', 'Éducation', 'Santé'];
  yearOptions: (number | 'all')[] = ['all', 2023, 2022, 2021];

  // Modal pour la visualisation
  selectedMedia: MediaItem | null = null;

  constructor() {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredMediaItems = this.mediaItems.filter(item => {
      const typeMatch = this.selectedType === 'all' || item.type === this.selectedType;
      const eventMatch = this.selectedEvent === 'Tous' || item.event === this.selectedEvent;
      const yearMatch = this.selectedYear === 'all' || item.date.getFullYear() === this.selectedYear;

      return typeMatch && eventMatch && yearMatch;
    });
  }

  openMediaModal(media: MediaItem) {
    this.selectedMedia = media;
  }

  closeMediaModal() {
    this.selectedMedia = null;
  }

  downloadMedia(media: MediaItem) {
    // Logique de téléchargement
    const link = document.createElement('a');
    link.href = media.url;
    link.download = media.title;
    link.click();
  }
}
