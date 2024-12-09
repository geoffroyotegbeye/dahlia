import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { Article } from '../../../models/content.model';

@Component({
  selector: 'app-admin-articles-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Gestion des Articles</h1>
      
      <!-- Bouton Nouvel Article -->
      <div class="mb-4 flex justify-between items-center">
        <button 
          class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          (click)="openCreateModal()"
        >
          Nouvel Article
        </button>
        
        <!-- Filtres -->
        <div class="flex space-x-2">
          <select 
            [(ngModel)]="selectedCategory" 
            class="px-3 py-2 border rounded-lg"
            (change)="filterArticles()"
          >
            <option value="">Toutes les catégories</option>
            <option value="actualite">Actualité</option>
            <option value="evenement">Événement</option>
            <option value="projet">Projet</option>
          </select>
          
          <select 
            [(ngModel)]="selectedStatus" 
            class="px-3 py-2 border rounded-lg"
            (change)="filterArticles()"
          >
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <!-- Tableau des Articles -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-3 text-left">Titre</th>
              <th class="p-3 text-left">Auteur</th>
              <th class="p-3 text-left">Catégorie</th>
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Statut</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let article of filteredArticles" class="border-b hover:bg-gray-50">
              <td class="p-3">{{ article.title }}</td>
              <td class="p-3">{{ article.author }}</td>
              <td class="p-3">{{ article.category }}</td>
              <td class="p-3">{{ article.publishDate | date:'shortDate' }}</td>
              <td class="p-3">
                <span 
                  [ngClass]="{
                    'text-green-600': article.status === 'published',
                    'text-yellow-600': article.status === 'draft',
                    'text-gray-600': article.status === 'archived'
                  }"
                >
                  {{ article.status }}
                </span>
              </td>
              <td class="p-3">
                <button 
                  class="text-orange-600 hover:text-orange-800 mr-2"
                  (click)="openEditModal(article)"
                >
                  Éditer
                </button>
                <button 
                  class="text-red-600 hover:text-red-800"
                  (click)="deleteArticle(article.id)"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Création/Édition -->
      <div 
        *ngIf="showModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-lg w-4/5 max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">
            {{ isEditing ? 'Éditer' : 'Créer' }} un Article
          </h2>
          
          <div class="grid grid-cols-3 gap-4">
            <!-- Colonne 1: Métadonnées -->
            <div class="space-y-4">
              <input 
                type="text" 
                [(ngModel)]="currentArticle.title"
                placeholder="Titre de l'article"
                class="w-full px-3 py-2 border rounded-lg"
              >
              
              <input 
                type="text" 
                [(ngModel)]="currentArticle.author"
                placeholder="Auteur"
                class="w-full px-3 py-2 border rounded-lg"
              >
              
              <select 
                [(ngModel)]="currentArticle.category"
                class="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="actualite">Actualité</option>
                <option value="evenement">Événement</option>
                <option value="projet">Projet</option>
              </select>
              
              <select 
                [(ngModel)]="currentArticle.status"
                class="w-full px-3 py-2 border rounded-lg"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>

              <input 
                type="text" 
                [(ngModel)]="currentArticle.featuredImage"
                placeholder="URL de l'image à la une"
                class="w-full px-3 py-2 border rounded-lg"
              >
            </div>

            <!-- Colonne 2: Éditeur de texte riche -->
            <div class="col-span-2">
              <div class="mb-2 flex space-x-2">
                <button 
                  (click)="applyFormat('bold')"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <strong>B</strong>
                </button>
                <button 
                  (click)="applyFormat('italic')"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <em>I</em>
                </button>
                <button 
                  (click)="applyFormat('underline')"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <u>U</u>
                </button>
                <button 
                  (click)="uploadEditorImage()"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <i class="fas fa-image"></i>
                </button>
              </div>

              <textarea 
                #contentEditor
                [(ngModel)]="currentArticle.content"
                placeholder="Contenu de l'article"
                rows="15"
                class="w-full px-3 py-2 border rounded-lg"
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-end mt-4 space-x-2">
            <button 
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              (click)="closeModal()"
            >
              Annuler
            </button>
            <button 
              class="bg-orange-600 text-white px-4 py-2 rounded-lg"
              (click)="saveChanges()"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminArticlesComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentArticle: Partial<Article> = {};
  
  // Filtres
  selectedCategory: string = '';
  selectedStatus: string = '';

  @ViewChild('contentEditor') contentEditor!: ElementRef;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.contentService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.filteredArticles = articles;
      },
      error: (err) => {
        console.error('Erreur de chargement des articles', err);
        // TODO: Ajouter une notification d'erreur
      }
    });
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      const categoryMatch = !this.selectedCategory || article.category === this.selectedCategory;
      const statusMatch = !this.selectedStatus || article.status === this.selectedStatus;
      return categoryMatch && statusMatch;
    });
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentArticle = {
      title: '',
      content: '',
      summary: '',
      author: '',
      publishDate: new Date(),
      lastUpdated: new Date(),
      tags: [],
      category: '',
      featuredImage: '',
      status: 'draft'
    };
    this.showModal = true;
  }

  openEditModal(article: Article) {
    this.isEditing = true;
    this.currentArticle = { ...article };
    this.showModal = true;
  }

  saveChanges() {
    if (this.isEditing) {
      // Mise à jour d'un article existant
      this.contentService.updateArticle(this.currentArticle as Article).subscribe({
        next: (updatedArticle) => {
          const index = this.articles.findIndex(a => a.id === updatedArticle.id);
          if (index !== -1) {
            this.articles[index] = updatedArticle;
            this.filterArticles(); // Mettre à jour la liste filtrée
          }
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur de mise à jour', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    } else {
      // Création d'un nouvel article
      this.contentService.createArticle(this.currentArticle as Article).subscribe({
        next: (newArticle) => {
          this.articles.push(newArticle);
          this.filterArticles(); // Mettre à jour la liste filtrée
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur de création', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    }
  }

  deleteArticle(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.contentService.deleteArticle(id).subscribe({
        next: () => {
          this.articles = this.articles.filter(a => a.id !== id);
          this.filterArticles(); // Mettre à jour la liste filtrée
        },
        error: (err) => {
          console.error('Erreur de suppression', err);
          // TODO: Ajouter une notification d'erreur
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentArticle = {};
  }

  applyFormat(format: 'bold' | 'italic' | 'underline') {
    const textarea = this.contentEditor.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText: string;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    const newText = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    this.currentArticle.content = newText;
    
    // Repositionner le curseur après le texte formatté
    setTimeout(() => {
      textarea.setSelectionRange(
        start + formattedText.length, 
        start + formattedText.length
      );
      textarea.focus();
    });
  }

  uploadEditorImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.contentService.uploadMedia(file, { 
          title: file.name, 
          type: 'image' 
        }).subscribe({
          next: (uploadedMedia) => {
            const textarea = this.contentEditor.nativeElement;
            const cursorPosition = textarea.selectionStart;
            const textBefore = textarea.value.substring(0, cursorPosition);
            const textAfter = textarea.value.substring(cursorPosition);
            
            // Insérer le markdown pour l'image
            const imageMarkdown = `\n![${uploadedMedia.title}](${uploadedMedia.url})\n`;
            this.currentArticle.content = textBefore + imageMarkdown + textAfter;
            
            // Repositionner le curseur après l'image
            setTimeout(() => {
              textarea.setSelectionRange(
                cursorPosition + imageMarkdown.length, 
                cursorPosition + imageMarkdown.length
              );
              textarea.focus();
            });
          },
          error: (err) => {
            console.error('Erreur de téléchargement', err);
            // TODO: Ajouter une notification d'erreur
          }
        });
      }
    };
    input.click();
  }
}
