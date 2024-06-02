import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');
    if (state.url !== '/login' && !token) {
      console.log('token not found');
      this.router.navigate(['/login']);
      return false;
    }

    if (token) {
      this.authService.validate(token)
        .subscribe(res => {
          console.log('valid token', res)
          this.authService.setRole(res.message);
          this.router.navigate(['/main']);
        }, err => {
          console.log('invalid token', err)
          this.router.navigate(['/login']);
        }
        )
    }

    return true;
  }
}