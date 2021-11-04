import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;

  constructor(private _cartService: CartService) {
  }

  ngOnInit(): void {

    this._cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this._cartService.getTotalPrice();
      console.log(this.products);
      console.log(this.grandTotal);
    });

  }

  removeItem(productItem: any) {
    this._cartService.removeCartItem(productItem);
  }

  emptyCart(){
    this._cartService.removeAllCart();
  }

}
