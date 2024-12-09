import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Tableau de Bord Analytics</h1>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Visiteurs -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Visiteurs</h2>
          <canvas #visitorsChart></canvas>
        </div>
        
        <!-- Sources de Trafic -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Sources de Trafic</h2>
          <canvas #trafficSourcesChart></canvas>
        </div>
        
        <!-- Statistiques Générales -->
        <div class="bg-white shadow-md rounded-lg p-6 col-span-full">
          <h2 class="text-xl font-semibold mb-4">Statistiques Générales</h2>
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <h3 class="text-lg font-bold text-orange-600">{{ totalVisitors }}</h3>
              <p class="text-gray-600">Visiteurs Totaux</p>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-orange-600">{{ pageViews }}</h3>
              <p class="text-gray-600">Pages Vues</p>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-orange-600">{{ averageTime }}</h3>
              <p class="text-gray-600">Temps Moyen</p>
            </div>
            <div class="text-center">
              <h3 class="text-lg font-bold text-orange-600">{{ bounceRate }}%</h3>
              <p class="text-gray-600">Taux de Rebond</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminAnalyticsComponent implements OnInit {
  totalVisitors: number = 15_234;
  pageViews: number = 45_678;
  averageTime: string = '3m 45s';
  bounceRate: number = 42;

  constructor() {}

  ngOnInit(): void {
    this.createVisitorsChart();
    this.createTrafficSourcesChart();
  }

  createVisitorsChart() {
    const ctx = document.querySelector('#visitorsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Visiteurs',
          data: [1200, 1900, 3000, 5000, 8000, 12000],
          borderColor: 'rgb(255, 107, 0)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  createTrafficSourcesChart() {
    const ctx = document.querySelector('#trafficSourcesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Direct', 'Réseaux Sociaux', 'Recherche', 'Autres'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            'rgb(255, 107, 0)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
