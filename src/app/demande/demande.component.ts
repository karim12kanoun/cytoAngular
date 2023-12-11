import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  formulaires!: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { }

  
ngOnInit(): void {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = user.uid;
      this.formulaires = this.firestore.collection('utilisateurs').doc(userId).collection('formulaires').valueChanges();
    } else {
      console.log('Aucun utilisateur n\'est connecté');
    }
  });
}
}

