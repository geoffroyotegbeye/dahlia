import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  totalDonation = 45678; // Montant total des dons
  donationGoal = 100000; // Objectif de collecte

  // Calcul du pourcentage de progression
  get donationProgress(): number {
    return Math.round((this.totalDonation / this.donationGoal) * 100);
  }

  // Formatage du montant total
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}
