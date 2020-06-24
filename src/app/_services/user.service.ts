import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fS: AngularFirestore,
    private aS: AuthenticationService
    ) { }

  addUser(id, name, mobile, address) {
    return this.fS.doc('users/' + id).set({
      name: name,
      mobile: mobile,
      address: address
    })
  }

  isAdminData() {
		return this.fS.doc('users/' + this.aS.userId).valueChanges();
  }
  
  getUsers() {
    return this.fS.collection('users').snapshotChanges();
  }
}
