import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewsletterComponent {
  email: string = '';
  first_name: string = '';
  isSubscribed: boolean = false;
  subscriptionError: string | null = null;

  onSubmit() {
    // Validation de base
    if (!this.email || !this.first_name) {
      this.subscriptionError = 'Veuillez remplir tous les champs.';
      return;
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.subscriptionError = 'Veuillez entrer une adresse email valide.';
      return;
    }

    // Simulation d'un abonnement (à remplacer par un vrai service backend)
    try {
      // Ici, vous appelleriez votre service d'abonnement
      console.log('Abonnement:', { email: this.email, first_name: this.first_name });
      
      // Réinitialisation du formulaire
      this.isSubscribed = true;
      this.subscriptionError = null;
      this.email = '';
      this.first_name = '';
    } catch (error) {
      this.subscriptionError = 'Une erreur est survenue. Veuillez réessayer.';
      this.isSubscribed = false;
    }
  }

  // Méthode pour fermer le message de succès
  dismissSubscriptionMessage() {
    this.isSubscribed = false;
  }
}
