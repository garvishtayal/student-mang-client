// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (state.url === '/main' && !this.authService.isLoggedIn()) {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     if (state.url === '/login' && this.authService.isLoggedIn()) {
//       this.router.navigate(['/main']);
//       return false;
//     }
//     return true;
//   }
// }