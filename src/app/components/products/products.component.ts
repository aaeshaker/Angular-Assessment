import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public searchKey: string = '';
  public filterCategory: any;
  public allProdFlag: boolean = true;
  public elecFlag: boolean = false;
  public fashionFlag: boolean = false;
  public jewFlag: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService) {
  }

  ngOnInit(): void {

    this._apiService.getProducts().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      console.log(this.productList);

      this.productList.forEach((element: any) => {
        if (element.category === "women's clothing" || element.category === "men's clothing") {
          element.category = 'fashion';
        }
        Object.assign(element, {quantity: 1, total: element.price});
      });
    });

    this._cartService.search.subscribe(value => {
      this.searchKey = value;
    });

  }

  public addToCart(item: any) {
    this._cartService.addToCart(item);
  }

  public filter(category: string) {
    this.filterCategory = this.productList.filter((element: any) => {
      if (element.category === category || category === '') {

        if (category === '') {
          this.allProdFlag = true;
          this.elecFlag = false;
          this.fashionFlag = false;
          this.jewFlag = false;
        } else if (category === 'electronics') {
          this.elecFlag = true;
          this.allProdFlag = false;
          this.fashionFlag = false;
          this.jewFlag = false;
        } else if (category === 'fashion') {
          this.fashionFlag = true;
          this.allProdFlag = false;
          this.elecFlag = false;
          this.jewFlag = false;
        } else {
          this.jewFlag = true;
          this.fashionFlag = false;
          this.allProdFlag = false;
          this.elecFlag = false;
        }

        return element;
      }
    });
  }

}
