import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('bounce', [
      state('*', style({
        transform: 'translateY(0)',
      })),
      transition('* => *', [
        animate('1000ms ease-in-out', style({
          transform: 'translateY(-10px)',
        })),
        animate('1000ms ease-in-out', style({
          transform: 'translateY(0)',
        })),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private slideInterval: any;
  private loadedImages: Set<string> = new Set();
  
  slides: Slide[] = [
    {
      image: 'assets/images/hero1.webp',
      title: "Il y a plus de bonheur à donner qu'à recevoir",
      subtitle: "(Actes 20:35)",
      description: 'Apprenez comment vos dons aident à transformer des vies et à offrir un avenir meilleur à ceux dans le besoin.'
    },
    {
      image: 'assets/images/hero2.webp',
      title: "Celui qui a pitié du pauvre prête à l'Éternel, Et il lui rendra son bienfait",
      subtitle: "(Proverbes 19:17)",
      description: 'Découvrez nos actions pour soutenir les familles démunies grâce à la générosité et à la solidarité de chacun.'
    },
    {
      image: '/assets/images/image4.webp',
      title: "Car Dieu aime celui qui donne avec joie.",
      subtitle: "(2 Corinthiens 9:7)",
      description: 'Rejoignez notre communauté et contribuez à redonner espoir et dignité à ceux qui en ont le plus besoin.'
    }
  ];
 

  @ViewChild('about') private aboutSection!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  heroTitle = "Celui qui a pitié du pauvre prête à l'Éternel, Qui lui rendra selon son œuvre.";
  heroSubtitle = 'Rejoignez notre mission pour un monde meilleur à travers des actions concrètes et significatives.';
  
  heroStats = [
    { 
      value: '10K+', 
      label: 'Personnes Aidées', 
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    { 
      value: '50+', 
      label: 'Projets Réalisés', 
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' 
    },
    { 
      value: '25', 
      label: 'Pays Impactés', 
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
    }
  ];

  videoModalOpen = false;
  videoUrl = '/assets/videos/video1.mp4'; 

  constructor() {
    this.preloadImages();
  }

  ngOnInit(): void {
    this.startSlideShow();
  }

  ngOnDestroy(): void {
    this.stopSlideShow();
  }

  private preloadImages(): void {
    this.slides.forEach(slide => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(slide.image);
      };
      img.src = slide.image;
    });
  }

  protected isImageLoaded(imagePath: string): boolean {
    return this.loadedImages.has(imagePath);
  }

  protected startSlideShow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  protected stopSlideShow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  protected nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  protected prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  protected goToSlide(index: number): void {
    this.currentSlide = index;
  }

  protected scrollToAbout(): void {
    this.aboutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  openVideoModal() {
    this.videoModalOpen = true;
    // Attendre que le DOM soit mis à jour
    setTimeout(() => {
      if (this.videoPlayer) {
        this.videoPlayer.nativeElement.play();
      }
    });
  }

  closeVideoModal() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
    this.videoModalOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
