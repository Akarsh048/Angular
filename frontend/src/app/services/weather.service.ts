import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherResponse {
  location: { latitude: number; longitude: number };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly baseUrl = 'http://localhost:5000/api/external/weather';

  constructor(private readonly http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.baseUrl}?lat=${lat}&lon=${lon}`);
  }
}
