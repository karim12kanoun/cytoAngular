import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudService } from '../services/crud.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-form',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent {
  pathologies = '';
  symptomes = '';
  antecedents = '';
  ficheMedicale = '';
  pieceJointe = '';
  message = '';

  constructor(private firestore: AngularFirestore) { }

  submit() {
    const auth = getAuth();
    let userId = '';
    if (auth.currentUser) {
      userId = auth.currentUser.uid;
    }
    
    this.firestore.collection('utilisateurs').doc(userId).collection('formulaires').add({
      pathologies: this.pathologies,
      symptomes: this.symptomes,
      antecedents: this.antecedents,
      ficheMedicale: this.ficheMedicale,
      pieceJointe: this.pieceJointe
    }).then(() => {
      this.message = 'Vos informations ont bien été enregistrées.';
    }).catch((error) => {
      this.message = 'Une erreur est survenue lors de l\'enregistrement de vos informations.';
      console.error('Error writing document: ', error);
    });;
  }
}
