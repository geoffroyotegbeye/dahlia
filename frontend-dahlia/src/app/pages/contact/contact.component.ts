import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  type: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NavigationComponent, 
    FooterComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('contactForm') contactForm!: NgForm;

  heroImage = 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb';

  contactData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  contactInfos: ContactInfo[] = [
    {
      type: 'Adresse',
      value: 'Rue Jean-Jacques Rousseau, Abidjan, Côte d\'Ivoire',
      icon: 'map-pin'
    },
    {
      type: 'Téléphone',
      value: '+225 07 00 00 00 00',
      icon: 'phone'
    },
    {
      type: 'Email',
      value: 'contact@dahlia.org',
      icon: 'mail'
    }
  ];

  socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/dahlia', 
      icon: 'facebook' 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/dahlia', 
      icon: 'twitter' 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/company/dahlia', 
      icon: 'linkedin' 
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/dahlia', 
      icon: 'instagram' 
    }
  ];

  subjectOptions = [
    'Demande de Partenariat',
    'Bénévolat',
    'Support',
    'Autres'
  ];

  formSubmitted = false;
  formError = false;

  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    if (this.contactForm.valid) {
      // Simulation d'envoi de formulaire
      this.simulateFormSubmission();
    } else {
      this.formError = true;
    }
  }

  simulateFormSubmission() {
    // Simuler un appel API pour envoyer le formulaire
    setTimeout(() => {
      this.formSubmitted = true;
      this.formError = false;
      
      // Réinitialiser le formulaire après 5 secondes
      setTimeout(() => {
        this.formSubmitted = false;
        this.contactData = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
      }, 5000);
    }, 1500);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copié dans le presse-papiers !');
    });
  }
}
