import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Actuality {
  id: number;
  title: string;
  summary: string;
  date: Date;
  imageUrl: string;
  category: string;
  readTime: number;
}

@Component({
  standalone: true,
  selector: 'app-actuality',
  templateUrl: './actuality.component.html',
  styleUrls: ['./actuality.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ActualityComponent {

  actualities: Actuality[] = [
    {
      id: 1,
      title: 'Nouvelle Campagne d\'Éducation',
      summary: 'Lancement d\'un programme innovant pour soutenir l\'éducation des jeunes dans les zones rurales.',
      date: new Date('2024-01-15'),
      imageUrl: 'assets/images/education.webp',
      category: 'Éducation',
      readTime: 3
    },
    {
      id: 2,
      title: 'Projet de Développement Communautaire',
      summary: 'Nos équipes ont travaillé dur pour améliorer les infrastructures locales et créer de nouvelles opportunités.',
      date: new Date('2024-02-01'),
      imageUrl: 'assets/images/developpement.webp',
      category: 'Développement',
      readTime: 4
    },
    {
      id: 3,
      title: 'Partenariat avec une ONG Internationale',
      summary: 'Un nouveau partenariat stratégique pour amplifier notre impact et étendre nos programmes.',
      date: new Date('2024-02-20'),
      imageUrl: 'assets/images/partenariat.webp',
      category: 'Collaboration',
      readTime: 2
    }
  ];

  navigateToActuality(id: number) {
    // Implémenter la navigation vers la page de détail de l'actualité
    console.log(`Navigation vers l'actualité ${id}`);
  }
}
