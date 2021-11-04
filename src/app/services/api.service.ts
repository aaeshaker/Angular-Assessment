import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

declare var $: any; //To use JQuery

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public username!: string;
  public productList = <any>[];

  constructor(private _http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this._http.get<any>('https://fakestoreapi.com/products').pipe(map((res: any) => {
      this.productList = res;
      return this.productList;
    }));
  }

  removeProductItem(product: any) {
    this.productList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.productList.splice(index, 1);
      }
    });
  }

  addNewProduct(product: any): void {
    this.productList.push(product);
  }

  loadingScreen() {
    const loading = document.getElementById('loading') as HTMLElement;
    loading.style.display = 'flex';
  }

  hideLoading() {
    $("#loading").fadeOut(500);
  }

}
