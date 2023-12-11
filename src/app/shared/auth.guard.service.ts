// AuthGuard

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('Checking authentication status');
    console.log('Current URL:', this.router.url);

    if (this.authService.isLoggedIn()) {
      console.log('User is logged in. Allow access.');
      return true;
    } else {
      console.log('User is not logged in. Redirecting to login page.');

      // Vérifier si l'utilisateur est déjà sur la page de connexion
      if (this.router.url !== '/login') {
        console.log('Redirecting...');
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}
