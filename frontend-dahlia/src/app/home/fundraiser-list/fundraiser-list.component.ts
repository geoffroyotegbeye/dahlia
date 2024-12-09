import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fundraiser-list',
  standalone: true,
  templateUrl: './fundraiser-list.component.html',
  imports: [CommonModule]
})
export class FundraiserListComponent {
  fundraisers = [
    {
      name: 'Achat de fournitures scolaires.', 
      description: 'Aidez-nous à acheter des fournitures scolaires pour les enfants afin de leur aider à avoir un avenir meilleur.',
      goal: 50000,
      collected: 37500,
      progress: 75,
      image: '/assets/images/fourniture1.webp'
    },
    {
      name: 'Programme Alimentaire',
      description: 'Soutenez notre programme de distribution de repas aux familles dans le besoin.',
      goal: 25000,
      collected: 12500,
      progress: 50,
      image: '/assets/images/image3.webp'
    },
    {
      name: 'Formation Professionnelle',
      description: 'Financez la formation professionnelle des jeunes pour leur assurer un meilleur avenir.',
      goal: 35000,
      collected: 24500,
      progress: 70,
      image: '/assets/images/formation2.webp'
    }
  ];

  onContribute(fundraiser: any) {
    console.log('Contribution pour:', fundraiser.name);
  }

  onToggleFavorite(fundraiser: any) {
    console.log('Ajout/Retrait des favoris:', fundraiser.name);
  }
}
