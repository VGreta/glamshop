import { Injectable } from '@angular/core';
import { Item } from '../interfaces/items.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private fS: AngularFirestore,
    private aS: AuthenticationService
    ) { }

  addCart(prodToPurchase: Item){
    return this.fS.collection(`users/${this.aS.userId}/cart`).add(prodToPurchase)
  }

  cart() {
    return this.fS.collection(`users/${this.aS.userId}/cart`).snapshotChanges()
  }

  delete(id) {
    return this.fS.doc(`users/${this.aS.userId}/cart/${id}`).delete()
  }

  edit(id, quantity) {
    return this.fS.doc(`users/${this.aS.userId}/cart/${id}`).update({quantity})
  }
}
