import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HighlightsComponent {
  highlights = [
    {
      title: 'Éducation pour Tous',
      description: 'Notre programme d\'éducation a permis à plus de 500 enfants d\'accéder à une éducation de qualité cette année.',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0112 20.055',
      link: '/education'
    },
    {
      title: 'Aide Alimentaire',
      description: 'Distribution de plus de 10 000 repas aux familles dans le besoin à travers notre réseau de banques alimentaires.',
      icon: 'M21 15.999h-2.25v-1.5h2.25v1.5zm-3 0H3v-1.5h15v1.5zm3-3h-2.25v-1.5h2.25v1.5zm-3 0H3v-1.5h15v1.5zm3-3h-2.25v-1.5h2.25v1.5zm-3 0H3v-1.5h15v1.5z',
      link: '/aide-alimentaire'
    },
    {
      title: 'Formation Professionnelle',
      description: 'Lancement de notre nouveau programme de formation professionnelle avec 200 jeunes bénéficiaires.',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      link: '/formation'
    },
    {
      title: 'Projets Communautaires',
      description: 'Réalisation de 15 projets communautaires impactant directement plus de 1000 personnes.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      link: '/projets'
    }
  ];

  navigateToProject(link: string) {
    console.log('Navigation vers:', link);
    // Implémenter la navigation
  }
}
