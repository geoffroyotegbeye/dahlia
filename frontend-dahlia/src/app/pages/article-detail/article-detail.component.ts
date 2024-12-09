import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

interface Article {
  id: number;
  title: string;
  author: string;
  date: Date;
  category: string;
  coverImage: string;
  content: string[];
  tags: string[];
  readTime: number;
}

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;

  // Exemple de données d'article (à remplacer par un service de récupération)
  articles: Article[] = [
    {
      id: 1,
      title: 'L\'Impact de l\'Éducation dans les Communautés Rurales',
      author: 'Marie Dupont',
      date: new Date('2024-01-15'),
      category: 'Éducation',
      coverImage: 'https://images.unsplash.com/photo-1588783341882-9c9fd0ed0eac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      content: [
        'Dans les régions rurales de notre pays, l\'accès à l\'éducation reste un défi majeur. Chaque jour, des milliers d\'enfants sont privés des opportunités fondamentales qui leur permettraient de construire un avenir meilleur.',
        'Notre organisation, Dahlia, s\'engage depuis plusieurs années à transformer cette réalité. Nous croyons fermement que l\'éducation est la clé de l\'émancipation et du développement communautaire.',
        'Nos programmes se concentrent sur plusieurs axes stratégiques :',
        '- Construction d\'infrastructures scolaires adaptées',
        '- Formation continue des enseignants',
        '- Bourses pour les élèves issus de familles défavorisées',
        '- Programmes de mentorat et de soutien scolaire',
        'Chaque investissement dans l\'éducation est un investissement dans l\'avenir. Ensemble, nous pouvons créer un cercle vertueux de transformation sociale.'
      ],
      tags: ['Éducation', 'Développement', 'Communauté'],
      readTime: 5
    },
    // Ajouter d'autres articles ici
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'article depuis l'URL
    this.route.paramMap.subscribe(params => {
      const articleId = Number(params.get('id'));
      this.article = this.articles.find(a => a.id === articleId) || null;
    });
  }

  shareArticle(platform: string) {
    // Logique de partage sur les réseaux sociaux
    const shareUrls: {[key: string]: string} = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.article?.title || '')}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(this.article?.title || '')}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  }
}
