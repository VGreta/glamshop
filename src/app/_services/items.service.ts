import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Item } from '../interfaces/items.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage
    ) { }

  getItems() {
    return this.fireStore.collection('items', ref => ref.orderBy('productName')).snapshotChanges();
  }

  getItemsHome() {
    return this.fireStore.collection('items', ref => ref.limit(4)).snapshotChanges();
  }

  addNewItem(productName: string, price: number, photoURL: File) {
    return new Promise((resolve, reject) => {
      let ref = this.storage.ref('items/' + photoURL.name)
      return ref.put(photoURL).then(() => {
        ref.getDownloadURL().subscribe(photoURL => {
          this.fireStore.collection('items').add({
            productName,
            price,
            photoURL
           }).then(() => resolve('hello'))
         })
       })
    })
  }

  // let ref = this.storage.ref('items/' + photoURL.name)
  //   return ref.put(photoURL).then(() => {
  //     ref.getDownloadURL().subscribe(photoURL => {
  //       this.fireStore.collection('items').add({
  //         productName,
  //         price,
  //         photoURL
  //       })
  //     })
  //   })
}
