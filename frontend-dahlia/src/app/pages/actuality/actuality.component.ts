import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

interface NewsArticle {
  id: number;
  title: string;
  date: Date;
  author: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  readTime: number;
}

@Component({
  selector: 'app-actuality',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    NavigationComponent, 
    FooterComponent
  ],
  templateUrl: './actuality.component.html',
  styleUrls: ['./actuality.component.css']
})
export class ActualityComponent {
  heroImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  featuredArticle: NewsArticle = {
    id: 1,
    title: 'Transformation Communautaire : Notre Nouvelle Approche Innovante',
    date: new Date('2024-03-15'),
    author: 'Sophie Martin',
    summary: 'Découvrez comment notre nouvelle stratégie d\'intervention permet de créer un impact durable dans les communautés marginalisées.',
    content: `
      Depuis sa création, Dahlia a toujours cherché à aller au-delà des solutions temporaires. Aujourd'hui, nous sommes fiers de présenter une approche révolutionnaire qui place les communautés au cœur de leur propre développement.

      Notre nouvelle méthodologie repose sur trois piliers fondamentaux :
      1. Autonomisation locale
      2. Éducation participative
      3. Développement des compétences durables

      Cette approche nous permet de ne plus simplement "aider", mais de co-construire des solutions avec les communautés elles-mêmes.
    `,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
    tags: ['Innovation', 'Développement Social', 'Stratégie'],
    readTime: 5
  };

  latestArticles: NewsArticle[] = [
    {
      id: 2,
      title: 'Succès de Notre Programme d\'Entrepreneuriat Féminin',
      date: new Date('2024-02-20'),
      author: 'Emma Rousseau',
      summary: 'Retour sur le programme qui a permis à plus de 50 femmes de lancer leur entreprise sociale.',
      content: `
        Notre programme d'entrepreneuriat féminin continue de porter ses fruits. Depuis son lancement, ce sont plus de 50 femmes qui ont pu créer leur propre entreprise, générant des revenus durables pour leurs communautés.

        Les résultats sont plus qu'encourageants : augmentation des revenus, amélioration de l'estime de soi et impact économique local.
      `,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      tags: ['Entrepreneuriat', 'Autonomisation Féminine', 'Impact Social'],
      readTime: 4
    },
    {
      id: 3,
      title: 'Nouvelle Collaboration Internationale',
      date: new Date('2024-01-10'),
      author: 'Lucas Dupont',
      summary: 'Partenariat stratégique avec une ONG internationale pour amplifier notre impact.',
      content: `
        Nous sommes ravis d'annoncer un partenariat stratégique avec Global Community Solutions, une organisation internationale reconnue pour son expertise en développement communautaire.

        Cette collaboration nous permettra d'étendre nos programmes et de toucher un nombre encore plus important de communautés vulnérables.
      `,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc9c4d267?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      tags: ['Partenariat', 'Développement International', 'Collaboration'],
      readTime: 3
    }
  ];

  selectedTag: string | null = null;

  constructor(private router: Router) {}

  filterByTag(tag?: string) {
    this.selectedTag = tag || null;
  }

  getFilteredArticles(): NewsArticle[] {
    if (!this.selectedTag) return this.latestArticles;
    return this.latestArticles.filter(article => 
      article.tags.includes(this.selectedTag!)
    );
  }

  scrollToNewsletter() {
    this.router.navigate(['/'], { fragment: 'newsletter-section' });
  }
}
