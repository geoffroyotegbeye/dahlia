import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';
import { Router } from '@angular/router';

declare var KKiaPay: any;

interface Fundraiser {
  id: number;
  title: string;
  description: string;
  goal: number;
  current: number;
  image: string;
  endDate: Date;
  category: string;
}

interface DonationForm {
  amount: number;
  name: string;
  email: string;
  message?: string;
}

@Component({
  selector: 'app-fundraising',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NavigationComponent, 
    FooterComponent
  ],
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {
  @ViewChild('donationModal') donationModal!: ElementRef;
  @ViewChild('donationForm') donationForm!: NgForm;

  heroImage = 'https://images.unsplash.com/photo-1532629345422-7515f3a7db99?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  fundraisers: Fundraiser[] = [
    {
      id: 1,
      title: 'Éducation pour Tous',
      description: 'Permettre à 100 enfants défavorisés d\'accéder à une éducation de qualité.',
      goal: 50000,
      current: 32750,
      image: 'https://images.unsplash.com/photo-1588783341882-9c9fd0ed0eac?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      endDate: new Date('2024-12-31'),
      category: 'Éducation'
    },
    {
      id: 2,
      title: 'Santé Communautaire',
      description: 'Construire un centre de santé mobile pour les zones rurales isolées.',
      goal: 75000,
      current: 45200,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      endDate: new Date('2024-09-30'),
      category: 'Santé'
    },
    {
      id: 3,
      title: 'Autonomisation Féminine',
      description: 'Soutenir 50 femmes entrepreneures dans le développement de leur activité.',
      goal: 40000,
      current: 22500,
      image: 'https://images.unsplash.com/photo-1573495627361-d9b187f1f4f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
      endDate: new Date('2024-11-15'),
      category: 'Entrepreneuriat'
    }
  ];

  selectedFundraiser: Fundraiser | null = null;
  donationData: DonationForm = {
    amount: 0,
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    // Initialisation de KKiaPay
    this.initKKiaPay();
  }

  initKKiaPay() {
    // Configuration de KKiaPay (à adapter avec vos identifiants réels)
    if (typeof KKiaPay !== 'undefined') {
      KKiaPay.init({
        amount: 0,
        position: 'center',
        callback: this.handlePaymentCallback.bind(this)
      });
    }
  }

  openDonationModal(fundraiser: Fundraiser) {
    this.selectedFundraiser = fundraiser;
    // Réinitialiser le formulaire
    this.donationData = {
      amount: 0,
      name: '',
      email: '',
      message: ''
    };
  }

  processDonation() {
    if (this.donationForm.valid && this.selectedFundraiser) {
      // Initialiser le paiement KKiaPay
      if (typeof KKiaPay !== 'undefined') {
        KKiaPay.start({
          amount: this.donationData.amount,
          position: 'center',
          callback: this.handlePaymentCallback.bind(this)
        });
      } else {
        console.error('KKiaPay non chargé');
      }
    }
  }

  handlePaymentCallback(response: any) {
    // Gérer la réponse de paiement
    if (response.status === 'success') {
      // Mettre à jour la collecte
      if (this.selectedFundraiser) {
        this.selectedFundraiser.current += this.donationData.amount;
      }
      
      // Afficher un message de succès
      alert('Merci pour votre don ! Votre soutien fait la différence.');
      
      // Réinitialiser le formulaire
      this.donationData = {
        amount: 0,
        name: '',
        email: '',
        message: ''
      };
      this.selectedFundraiser = null;
    } else {
      // Gérer l'échec du paiement
      alert('Le paiement a échoué. Veuillez réessayer.');
    }
  }

  calculateProgress(fundraiser: Fundraiser): number {
    return (fundraiser.current / fundraiser.goal) * 100;
  }

  getDaysRemaining(endDate: Date): number {
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  scrollToNewsletter() {
    this.router.navigate(['/'], { fragment: 'newsletter-section' });
  }
}
