import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/interfaces/items.interface';
import { ItemsService } from 'src/app/_services/items.service';
import { CartService } from 'src/app/_services/cart.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[];
  add: number = -1;

  constructor(
    private iS: ItemsService,
    private cS: CartService,
    private aS: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.iS.getItemsHome().subscribe(data => {
      this.items = data.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data() as Item
        }
      })
    })
  }

  public addCart(i: number) {
    if(this.aS.userId) {
      this.add = +i;
    }
    else {
      //ha nincs bejelentkezve, ne tudjon a kosárba rakni semmit
      this.router.navigate(['/signin']);
    }
  }

  public buy(quantity: number) {
    let selectedItem = this.items[this.add]
    let prodToPurchase = {
      productName: selectedItem.productName,
      quantity: +quantity,
      price: selectedItem.price
    }
    this.cS.addCart(prodToPurchase).then(() => this.add = -1) 
  }

  public back(){
    this.add = -1;
  }
  
}
