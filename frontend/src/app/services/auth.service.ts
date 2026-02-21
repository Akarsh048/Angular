import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/api/auth';

  constructor(private readonly http: HttpClient) {}

  register(username: string, password: string): Observable<{ id: number; username: string }> {
    return this.http.post<{ id: number; username: string }>(`${this.baseUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { username, password });
  }
}
