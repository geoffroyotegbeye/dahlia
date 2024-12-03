import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BannerItem {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class BannerComponent {
  bannerItems: BannerItem[] = [
    {
      id: 1,
      title: 'Campagne de Collecte',
      description: 'Soutenez notre mission et aidez-nous à faire la différence.',
      link: '/fundraiser',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      backgroundColor: 'bg-orange-100'
    },
    {
      id: 2,
      title: 'Événements à Venir',
      description: 'Découvrez nos prochaines initiatives et participez.',
      link: '/events',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      backgroundColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Devenir Bénévole',
      description: 'Rejoignez notre équipe et contribuez au changement.',
      link: '/volunteer',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      backgroundColor: 'bg-blue-100'
    }
  ];

  navigateTo(link: string) {
    console.log('Navigation vers:', link);
    // Implémenter la navigation réelle
  }
}
