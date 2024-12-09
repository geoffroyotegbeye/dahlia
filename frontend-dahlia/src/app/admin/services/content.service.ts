import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { 
  PageContent, 
  Article, 
  Fundraiser, 
  MediaItem 
} from '../models/content.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Pages Management
  getPages(): Observable<PageContent[]> {
    return this.http.get<PageContent[]>(`${this.apiUrl}/pages`);
  }

  getPageById(id: string): Observable<PageContent> {
    return this.http.get<PageContent>(`${this.apiUrl}/pages/${id}`);
  }

  createPage(page: PageContent): Observable<PageContent> {
    return this.http.post<PageContent>(`${this.apiUrl}/pages`, page);
  }

  updatePage(page: PageContent): Observable<PageContent> {
    return this.http.put<PageContent>(`${this.apiUrl}/pages/${page.id}`, page);
  }

  deletePage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pages/${id}`);
  }

  // Articles Management
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articles`, {
      ...article,
      publishDate: new Date(),
      lastUpdated: new Date()
    });
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/${article.id}`, {
      ...article,
      lastUpdated: new Date()
    });
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/articles/${id}`);
  }

  // Fundraisers Management
  getFundraisers(): Observable<Fundraiser[]> {
    return this.http.get<Fundraiser[]>(`${this.apiUrl}/fundraisers`);
  }

  getFundraiserById(id: string): Observable<Fundraiser> {
    return this.http.get<Fundraiser>(`${this.apiUrl}/fundraisers/${id}`);
  }

  createFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    return this.http.post<Fundraiser>(`${this.apiUrl}/fundraisers`, fundraiser);
  }

  updateFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    return this.http.put<Fundraiser>(`${this.apiUrl}/fundraisers/${fundraiser.id}`, fundraiser);
  }

  deleteFundraiser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fundraisers/${id}`);
  }

  // Media Management
  getMedia(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.apiUrl}/media`);
  }

  uploadMedia(file: File, metadata: Partial<MediaItem>): Observable<MediaItem> {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key as keyof MediaItem] as string);
    });

    return this.http.post<MediaItem>(`${this.apiUrl}/media/upload`, formData);
  }

  deleteMedia(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/media/${id}`);
  }

  // Page Sections Management
  updatePageSection(section: {
    id: string;
    type: 'hero' | 'mission' | 'footer-objective';
    title: string;
    description: string;
    image?: string;
    video?: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/page-sections/${section.id}`, section);
  }

  // Mock data for development
  private mockPageSections = {
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

  // Méthode de développement pour retourner des sections mockées
  getMockPageSections(): Observable<any> {
    return of(this.mockPageSections);
  }
}
