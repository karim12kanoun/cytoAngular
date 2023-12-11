import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
loremIpsumText: any;
constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
