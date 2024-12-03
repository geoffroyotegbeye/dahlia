import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../home/hero/hero.component';
import { BannerComponent } from '../../home/banner/banner.component';
import { MissionSummaryComponent } from '../../home/mission-summary/mission-summary.component';
import { FundraiserListComponent } from '../../home/fundraiser-list/fundraiser-list.component';
import { CallToActionComponent } from '../../home/call-to-action/call-to-action.component';
import { HighlightsComponent } from '../../home/highlights/highlights.component';
import { ActualityComponent } from '../../home/actuality/actuality.component';
import { NewsletterComponent } from '../../home/newsletter/newsletter.component';
import { NavigationComponent } from '../../home/navigation/navigation.component';
import { FooterComponent } from '../../home/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    NavigationComponent,
    HeroComponent, 
    BannerComponent, 
    MissionSummaryComponent, 
    FundraiserListComponent, 
    CallToActionComponent, 
    HighlightsComponent,
    ActualityComponent,
    NewsletterComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
}
