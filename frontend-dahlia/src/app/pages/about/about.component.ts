import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';
import { Router } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface ValueSection {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule, 
    NavigationComponent, 
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Sophie Martin',
      role: 'Fondatrice & Présidente',
      bio: 'Passionnée par l\'impact social, Sophie a fondé Dahlia pour transformer des vies.',
      image: 'https://images.unsplash.com/photo-1573496359394-025c4b977050?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
    },
    {
      name: 'Lucas Dupont',
      role: 'Directeur des Opérations',
      bio: 'Expert en gestion de projets humanitaires avec plus de 15 ans d\'expérience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0fc1feef5473?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
    },
    {
      name: 'Emma Rousseau',
      role: 'Responsable des Partenariats',
      bio: 'Créatrice de ponts entre les communautés et les ressources.',
      image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'
    }
  ];

  values: ValueSection[] = [
    {
      title: 'Compassion',
      description: 'Nous croyons en la dignité de chaque individu et agissons avec empathie.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    },
    {
      title: 'Innovation',
      description: 'Nous recherchons constamment des solutions créatives aux défis sociaux.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.071 0l-.344.344a2.5 2.5 0 01-3.536 0l-.344-.344z'
    },
    {
      title: 'Durabilité',
      description: 'Notre approche vise des changements durables et structurels.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9'
    }
  ];

  heroImage = 'https://images.unsplash.com/photo-1532629345422-7515f3a7db99?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  constructor(private router: Router) {}

  scrollToNewsletter() {
    this.router.navigate(['/'], { fragment: 'newsletter-section' });
  }
}
