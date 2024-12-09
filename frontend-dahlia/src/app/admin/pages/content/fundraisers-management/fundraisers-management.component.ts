import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../services/content.service';
import { Fundraiser } from '../../../models/content.model';

@Component({
  selector: 'app-admin-fundraisers-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Gestion des Collectes</h1>
      
      <!-- Bouton Nouvelle Collecte -->
      <div class="mb-4">
        <button 
          class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          (click)="openCreateModal()"
        >
          Nouvelle Collecte
        </button>
      </div>

      <!-- Tableau des Collectes -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-3 text-left">Titre</th>
              <th class="p-3 text-left">Objectif</th>
              <th class="p-3 text-left">Collecté</th>
              <th class="p-3 text-left">Statut</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let fundraiser of fundraisers" class="border-b">
              <td class="p-3">{{ fundraiser.title }}</td>
              <td class="p-3">{{ fundraiser.goal | currency:'EUR' }}</td>
              <td class="p-3">
                {{ fundraiser.currentAmount | currency:'EUR' }}
                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-orange-600 h-2 rounded-full" 
                    [style.width.%]="(fundraiser.currentAmount / fundraiser.goal) * 100"
                  ></div>
                </div>
              </td>
              <td class="p-3">
                <span 
                  [ngClass]="{
                    'text-green-600': fundraiser.status === 'active',
                    'text-gray-600': fundraiser.status === 'completed',
                    'text-red-600': fundraiser.status === 'cancelled'
                  }"
                >
                  {{ fundraiser.status }}
                </span>
              </td>
              <td class="p-3">
                <button 
                  class="text-orange-600 hover:text-orange-800 mr-2"
                  (click)="openEditModal(fundraiser)"
                >
                  Éditer
                </button>
                <button 
                  class="text-red-600 hover:text-red-800"
                  (click)="deleteFundraiser(fundraiser.id)"
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
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg w-1/2">
          <h2 class="text-xl font-bold mb-4">
            {{ isEditing ? 'Éditer' : 'Créer' }} une Collecte
          </h2>
          
          <div class="space-y-4">
            <input 
              type="text" 
              [(ngModel)]="currentFundraiser.title"
              placeholder="Titre de la collecte"
              class="w-full px-3 py-2 border rounded-lg"
            >
            <input 
              type="number" 
              [(ngModel)]="currentFundraiser.goal"
              placeholder="Objectif de collecte"
              class="w-full px-3 py-2 border rounded-lg"
            >
            <textarea 
              [(ngModel)]="currentFundraiser.description"
              placeholder="Description de la collecte"
              class="w-full px-3 py-2 border rounded-lg"
              rows="4"
            ></textarea>
            
            <div>
              <label class="block mb-2">Statut</label>
              <select 
                [(ngModel)]="currentFundraiser.status"
                class="w-full px-3 py-2 border rounded-lg"
              >
                <option value="active">Actif</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
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
export class AdminFundraisersComponent implements OnInit {
  fundraisers: Fundraiser[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentFundraiser: Partial<Fundraiser> = {};

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadFundraisers();
  }

  loadFundraisers() {
    this.contentService.getFundraisers().subscribe({
      next: (fundraisers) => {
        this.fundraisers = fundraisers;
      },
      error: (err) => {
        console.error('Erreur de chargement des collectes', err);
        // Ajouter une notification d'erreur
      }
    });
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentFundraiser = {
      title: '',
      description: '',
      goal: 0,
      currentAmount: 0,
      startDate: new Date(),
      endDate: new Date(),
      status: 'active',
      images: [],
      category: ''
    };
    this.showModal = true;
  }

  openEditModal(fundraiser: Fundraiser) {
    this.isEditing = true;
    this.currentFundraiser = { ...fundraiser };
    this.showModal = true;
  }

  saveChanges() {
    if (this.isEditing) {
      // Mise à jour d'une collecte existante
      this.contentService.updateFundraiser(this.currentFundraiser as Fundraiser).subscribe({
        next: (updatedFundraiser) => {
          const index = this.fundraisers.findIndex(f => f.id === updatedFundraiser.id);
          if (index !== -1) {
            this.fundraisers[index] = updatedFundraiser;
          }
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur de mise à jour', err);
          // Ajouter une notification d'erreur
        }
      });
    } else {
      // Création d'une nouvelle collecte
      this.contentService.createFundraiser(this.currentFundraiser as Fundraiser).subscribe({
        next: (newFundraiser) => {
          this.fundraisers.push(newFundraiser);
          this.closeModal();
        },
        error: (err) => {
          console.error('Erreur de création', err);
          // Ajouter une notification d'erreur
        }
      });
    }
  }

  deleteFundraiser(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette collecte ?')) {
      this.contentService.deleteFundraiser(id).subscribe({
        next: () => {
          this.fundraisers = this.fundraisers.filter(f => f.id !== id);
        },
        error: (err) => {
          console.error('Erreur de suppression', err);
          // Ajouter une notification d'erreur
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.currentFundraiser = {};
  }
}
