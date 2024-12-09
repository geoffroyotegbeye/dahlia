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
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Empowerment',
      description: 'Nous croyons en la capacité de chaque individu à transformer sa propre vie et sa communauté.'
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7',
      title: 'Innovation',
      description: 'Nous développons des solutions créatives et durables pour répondre aux défis sociaux.'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
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
