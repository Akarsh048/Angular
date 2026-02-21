import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  registerForm = { username: '', password: '' };
  loginForm = { username: '', password: '' };
  message = '';

  constructor(
    private readonly authService: AuthService,
    private readonly session: SessionService
  ) {}

  register(): void {
    this.authService.register(this.registerForm.username, this.registerForm.password).subscribe({
      next: () => {
        this.message = 'Account created. You can sign in now.';
        this.registerForm = { username: '', password: '' };
      },
      error: (error) => {
        this.message = error?.error?.message || 'Registration failed';
      }
    });
  }

  login(): void {
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe({
      next: (response) => {
        this.session.saveSession(response.token, response.user.id);
        this.message = `Welcome ${response.user.username}`;
      },
      error: () => {
        this.message = 'Login failed';
      }
    });
  }

  logout(): void {
    this.session.clearSession();
    this.message = 'Logged out';
  }
}
