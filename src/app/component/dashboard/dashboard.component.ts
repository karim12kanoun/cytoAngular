import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

export interface Utilisateur {
  id: string;
  formulaires: Formulaire[];
}

export interface Formulaire {
  id: string;
  pathologies: string;
  symptomes: string;
  antecedents: string;
  ficheMedicale: string;
  pieceJointe: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
    formulaires!: Observable<any[]>
  constructor(private firestore: AngularFirestore) {}

  
    ngOnInit(): void {
      this.formulaires = this.firestore.collection('formulaires').valueChanges();
    }
  }

