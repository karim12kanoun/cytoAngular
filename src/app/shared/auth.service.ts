import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { map } from 'rxjs/operators';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private fireauth: AngularFireAuth, private router: Router) { }
  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fireauth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.email === 'kanounkarim.kkb@gmail.com');
        } else {
          resolve(false);
        }
      }, reject);
    });
  }
  
  // login method
  login(email: string, password: string): void {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        // Stocker l'ID de l'utilisateur dans le local storage
        localStorage.setItem('userId', res.user?.uid || '');
        
        // Vérifier si l'e-mail est vérifié
        if (res.user?.emailVerified) {
          this.router.navigate(['accueil']);
        } else {
          // Rediriger vers la page de vérification de l'e-mail
          this.router.navigate(['/varify-email']);
        }
      })
      .catch(err => {
        console.error(err); // Consigner l'erreur dans la console
        // Afficher un message d'erreur à l'utilisateur si nécessaire
        // Vous pouvez également consigner l'erreur dans un service de journalisation
        // ou envoyer un rapport d'erreur à un serveur
        alert('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
        // Rediriger vers la page de connexion en cas d'échec
        this.router.navigate(['/login']);
      });
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      // Supprimer l'ID de l'utilisateur du local storage
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
    }).catch(err => {
      console.error(err);
      // Gérer l'erreur de déconnexion si nécessaire
    });
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
 

  private clearCache() {
    if (window && window.location && window.location.reload) {
      window.location.reload();
    }
  }
}