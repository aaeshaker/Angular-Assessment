import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any = [];
  public searchKey: string = '';
  public filterCategory: any = [];
  public allProdFlag: boolean = true;
  public elecFlag: boolean = false;
  public fashionFlag: boolean = false;
  public jewFlag: boolean = false;
  public username: string = '';
  public staticAddedProduct: any;

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {

    // Due to time I've used this static product instead of form
    this.staticAddedProduct = {
      category: "fashion",
      description: "Organic Cotton T-Shirt",
      id: 1,
      image: "https://m.media-amazon.com/images/I/51v80n-ixzS._AC_UX342_.jpg",
      price: 18,
      quantity: 1,
      rating: {rate: 4.9, count: 100},
      title: "Organic Cotton T-Shirt for Men.",
      total: 18
    };

    this._apiService.loadingScreen();

    this.username = this._authService.getCurrentUser();

    this._apiService.getProducts().subscribe(res => {

      if (res) {
        this._apiService.hideLoading();
        this.productList = res;
        this.filterCategory = res;
        console.log(this.filterCategory);

        this.productList.forEach((element: any) => {
          if (element.category === "women's clothing" || element.category === "men's clothing") {
            element.category = 'fashion';
          }
          Object.assign(element, {quantity: 1, total: element.price});
        });
      }

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

  public removeItem(productItem: any) {
    this._apiService.removeProductItem(productItem);
  }

  public addNewProduct() {
    this._apiService.addNewProduct(this.staticAddedProduct);
  }

  // public deleteAllProducts() {
  //   this._apiService.removeAllProducts();
  //   console.log(this.productList);
  // }

}
