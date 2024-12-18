import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MissionValue {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-mission-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-summary.component.html',
  styleUrls: ['./mission-summary.component.css']
})
export class MissionSummaryComponent implements OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  thumbnailPath = 'assets/images/image1.webp';
  videoPath = '/assets/videos/video2.mp4';
  isVideoPlaying = false;

  missionValues: MissionValue[] = [
    {
      // Icône représentant une personne qui s'élève, symbolisant l'autonomisation
      icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
      title: 'Autonomisation',
      description: 'Nous croyons en la capacité de chaque individu à transformer sa propre vie et sa communauté.'
    },
    {
      // Icône représentant une ampoule avec des rayons, symbolisant l'innovation
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      title: 'Innovation',
      description: 'Nous développons des solutions créatives et durables pour répondre aux défis sociaux.'
    },
    {
      // Icône représentant des personnes connectées, symbolisant la collaboration
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      title: 'Collaboration',
      description: 'Nous tissons des liens solides entre communautés, organisations et individus.'
    }
  ];

  constructor(private router: Router) {}

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

  openVideo(): void {
    if (!this.isVideoPlaying) {
      this.isVideoPlaying = true;

      setTimeout(() => {
        if (this.videoPlayer?.nativeElement) {
          this.videoPlayer.nativeElement.play();
        }
      });
    }
  }

  closeVideo(event?: MouseEvent): void {
    // Vérification supplémentaire pour gérer les différents types d'événements
    if (event && (event.target as HTMLElement).closest('.video-player')) {
      return;
    }

    this.isVideoPlaying = false;
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.currentTime = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
  }
}
