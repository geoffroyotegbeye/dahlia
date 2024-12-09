import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  image: string;
  category: 'Collecte de Fonds' | 'Sensibilisation' | 'Formation' | 'Bénévolat';
  registrationLink?: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule, 
    NavigationComponent, 
    FooterComponent
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  heroImage = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Journée Mondiale de l\'Éducation',
      date: new Date('2024-04-15T09:00:00'),
      location: 'Centre Communautaire, Paris',
      description: 'Une journée dédiée à sensibiliser l\'importance de l\'éducation pour tous. Venez découvrir nos projets éducatifs et comment vous pouvez contribuer.',
      image: 'https://images.unsplash.com/photo-1588783341882-9c9fd0ed0eac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      category: 'Sensibilisation',
      registrationLink: '/register/education-day'
    },
    {
      id: 2,
      title: 'Atelier d\'Entrepreneuriat Social',
      date: new Date('2024-05-22T14:00:00'),
      location: 'Espace Innovation, Lyon',
      description: 'Apprenez à développer des solutions entrepreneuriales durables qui ont un impact social positif. Animé par des experts du secteur.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc9c4d267?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      category: 'Formation',
      registrationLink: '/register/social-entrepreneurship'
    },
    {
      id: 3,
      title: 'Grande Collecte de Fonds Annuelle',
      date: new Date('2024-06-10T18:00:00'),
      location: 'Palais des Congrès, Marseille',
      description: 'Soirée caritative pour soutenir nos programmes d\'éducation et d\'autonomisation. Dîner de gala, témoignages et concert caritatif.',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3a7db99?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      category: 'Collecte de Fonds',
      registrationLink: '/register/fundraising-gala'
    }
  ];

  pastEvents: Event[] = [
    {
      id: 4,
      title: 'Semaine du Bénévolat International',
      date: new Date('2023-11-15T10:00:00'),
      location: 'Multiple Locations',
      description: 'Une semaine de mobilisation mondiale où nos bénévoles ont contribué à des projets communautaires dans différents pays.',
      image: 'https://images.unsplash.com/photo-1573495627361-d9b187f1f4f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      category: 'Bénévolat'
    }
  ];

  filterCategory: string | null = null;

  filterEvents(category?: string) {
    this.filterCategory = category || null;
  }

  getFilteredUpcomingEvents(): Event[] {
    return this.filterCategory 
      ? this.upcomingEvents.filter(event => event.category === this.filterCategory)
      : this.upcomingEvents;
  }

  getFilteredPastEvents(): Event[] {
    return this.filterCategory 
      ? this.pastEvents.filter(event => event.category === this.filterCategory)
      : this.pastEvents;
  }
}
