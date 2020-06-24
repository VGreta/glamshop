import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_services/cart.service';
import { CartProducts } from 'src/app/interfaces/cartprod.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartProducts[];

  constructor(
    private cS: CartService
  ) { }

  ngOnInit(): void {
    this.cS.cart().subscribe(cart => {
      this.cart = cart.map(shopping => {
        return {
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data() as CartProducts
        }
      })
    })
  }

  public deleteFromCart(i) {
    this.cS.delete(this.cart[i].id);
  }

  public editQuantity(i) {
    this.cS.edit(this.cart[i].id, this.cart[i].quantity);
  }

}
