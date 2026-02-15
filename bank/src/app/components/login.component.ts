import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // template: `
  // <div class="page">
  //   <div class="card" style="max-width:460px;margin:40px auto;">
  //     <h2>Login</h2>
  //     <form [formGroup]="loginForm" (ngSubmit)="submit()">
  //       <label>User Name</label>
  //       <input formControlName="username" />
  //       <label>Password</label>
  //       <input type="password" formControlName="password" />
  //       <button type="submit">Sign In</button>
  //     </form>
  //     <div class="inline-error" *ngIf="errorMessage">{{ errorMessage }}</div>
  //   </div>
  // </div>
  // `
  template: `
  <div class="login-page">
    <div class="login-card">
      <h2>Welcome to Sena Bank</h2>
      <p class="subtitle">Sign in to continue.</p>
      
      <form [formGroup]="loginForm" (ngSubmit)="submit()">
        <label for="username">User Name</label>
        <input 
          id="username"
          formControlName="username" 
          placeholder="Enter username"
        />
        
        <label for="password">Password</label>
        <input 
          id="password"
          type="password" 
          formControlName="password" 
          placeholder="Enter password"
        />
        
        <button type="submit" style="width: 100%; margin-top: 8px;">Login</button>
      </form>
      
      <div class="inline-error" *ngIf="errorMessage">{{ errorMessage }}</div>
      
      <p style="margin-top: 16px; color: #64748b; font-size: 12px;">
        Preview credentials: <strong>clerk</strong> or <strong>manager</strong>
      </p>
    </div>
  </div>
`
})
export class LoginComponent {
  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.errorMessage = 'Invalid info entered.';
      return;
    }

    this.auth.login(this.loginForm.getRawValue() as { username: string; password: string }).subscribe({
      next: (res) => {
        this.auth.setSession(res.token);
        if (this.auth.hasRole('ROLE_MGR')) {
          this.router.navigate(['/manager']);
          return;
        }
        if (this.auth.hasRole('ROLE_CLERK')) {
          this.router.navigate(['/clerk']);
          return;
        }
        this.errorMessage = 'Invalid info entered.';
      },
      error: () => {
        this.errorMessage = 'Invalid info entered.';
      }
    });
  }
}


