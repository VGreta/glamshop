import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<firebase.User>
  userId: string = '';

  constructor(private aFA: AngularFireAuth) {
    this.user = aFA.user
   }

  signUp(email, password){
    return this.aFA.createUserWithEmailAndPassword(email, password)
  }

  signIn(email, password) {
    return this.aFA.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    return this.aFA.signOut()
  }
}
