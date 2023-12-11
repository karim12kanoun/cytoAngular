import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.authService.isAdmin()) {
      return true;
    } else {
      console.log('User is not an admin. Redirecting to home page.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
