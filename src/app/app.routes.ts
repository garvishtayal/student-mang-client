import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    { path: 'main', component: MainComponent, canActivate:[AuthGuard]},
  ];