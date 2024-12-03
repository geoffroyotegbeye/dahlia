import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fundraiser-list',
  standalone: true,
  templateUrl: './fundraiser-list.component.html',
  styleUrls: ['./fundraiser-list.component.css'],
  imports: [CommonModule]
})
export class FundraiserListComponent {
  fundraisers = [
    {
      name: 'Construction d\'une École',
      description: 'Aidez-nous à construire une nouvelle école pour les enfants défavorisés.',
      goal: 50000,
      collected: 37500,
      progress: 75,
      image: '/assets/images/school-project.jpg'
    },
    {
      name: 'Programme Alimentaire',
      description: 'Soutenez notre programme de distribution de repas aux familles dans le besoin.',
      goal: 25000,
      collected: 12500,
      progress: 50,
      image: '/assets/images/food-program.jpg'
    },
    {
      name: 'Formation Professionnelle',
      description: 'Financez la formation professionnelle des jeunes pour leur assurer un meilleur avenir.',
      goal: 35000,
      collected: 24500,
      progress: 70,
      image: '/assets/images/training-program.jpg'
    }
  ];

  onContribute(fundraiser: any) {
    console.log('Contribution pour:', fundraiser.name);
  }

  onToggleFavorite(fundraiser: any) {
    console.log('Ajout/Retrait des favoris:', fundraiser.name);
  }
}
