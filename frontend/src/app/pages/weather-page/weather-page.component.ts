import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css'
})
export class WeatherPageComponent {
  message = '';
  weather = { lat: 28.6139, lon: 77.2090, data: null as unknown };

  constructor(private readonly weatherService: WeatherService) {}

  loadWeather(): void {
    this.weatherService.getWeather(this.weather.lat, this.weather.lon).subscribe({
      next: (data) => {
        this.weather.data = data;
      },
      error: () => {
        this.message = 'Failed to load weather';
      }
    });
  }
}
