import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6">Tableau de Bord Admin</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Content Cards -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Articles</h2>
            <p class="text-3xl font-bold">{{ articleCount }}</p>
            <div class="mt-4">
              <a 
                routerLink="/admin/content/articles" 
                class="text-orange-600 hover:text-orange-800"
              >
                Gérer les Articles
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Pages</h2>
            <p class="text-3xl font-bold">{{ pageCount }}</p>
            <div class="mt-4">
              <a 
                routerLink="/admin/content/pages" 
                class="text-orange-600 hover:text-orange-800"
              >
                Gérer les Pages
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Collectes</h2>
            <p class="text-3xl font-bold">{{ fundraiserCount }}</p>
            <div class="mt-4">
              <a 
                routerLink="/admin/content/fundraisers" 
                class="text-orange-600 hover:text-orange-800"
              >
                Gérer les Collectes
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Médias</h2>
            <p class="text-3xl font-bold">{{ mediaCount }}</p>
            <div class="mt-4">
              <a 
                routerLink="/admin/content/media" 
                class="text-orange-600 hover:text-orange-800"
              >
                Gérer les Médias
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Actions Rapides</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              (click)="createNewArticle()"
            >
              Nouvel Article
            </button>
            <button 
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              (click)="createNewFundraiser()"
            >
              Nouvelle Collecte
            </button>
            <button 
              class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              (click)="uploadMedia()"
            >
              Téléverser un Média
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  articleCount: number = 0;
  pageCount: number = 0;
  fundraiserCount: number = 0;
  mediaCount: number = 0;

  constructor(
    private contentService: ContentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.contentService.getArticles().subscribe(
      articles => this.articleCount = articles.length
    );
    this.contentService.getPages().subscribe(
      pages => this.pageCount = pages.length
    );
    this.contentService.getFundraisers().subscribe(
      fundraisers => this.fundraiserCount = fundraisers.length
    );
    this.contentService.getMedia().subscribe(
      media => this.mediaCount = media.length
    );
  }

  createNewArticle() {
    // Redirect to article creation page
  }

  createNewFundraiser() {
    // Redirect to fundraiser creation page
  }

  uploadMedia() {
    // Open media upload modal
  }
}
