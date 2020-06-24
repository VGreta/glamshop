import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Item } from 'src/app/interfaces/items.interface';
import { ItemsService } from 'src/app/_services/items.service';

@Component({
  selector: 'app-a-product',
  templateUrl: './a-product.component.html',
  styleUrls: ['./a-product.component.css']
})
export class AProductComponent implements OnInit {

  @ViewChild('photo') photo: ElementRef

  constructor(private iS: ItemsService) { }

  ngOnInit(): void {
  }

  public addNewItem(form) {
    let productName = (<Item>form.value).productName,
      price = (<Item>form.value).price,
      photoURL = (<HTMLInputElement>this.photo.nativeElement).files[0];
    this.iS.addNewItem(productName, price, photoURL)
  }

}
