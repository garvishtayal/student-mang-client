import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const loginModel: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      role: this.loginForm.value.role
    };

    this.auth.login(loginModel)
      .subscribe(response => {
        console.log('Login successful:', response);
        localStorage.setItem("userEmail", loginModel.email);
        localStorage.setItem("userRole", loginModel.role);
        localStorage.setItem("token", response.token);
        this.errorMessage = '';
        this.router.navigate(['/main']);
      }, error => {
        this.errorMessage = 'Invalid email or password.';
        console.error('Login error:', error.error);
      });

  }
}