import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CallToActionComponent {
  impactStats = [
    { number: '1000+', label: 'Vies Impactées' },
    { number: '50+', label: 'Projets Réalisés' },
    { number: '20+', label: 'Pays d\'Intervention' }
  ];

  donate() {
    // Implémenter la logique de don
    console.log('Redirection vers la page de don');
  }

  volunteer() {
    // Implémenter la logique de bénévolat
    console.log('Redirection vers la page de bénévolat');
  }
}
