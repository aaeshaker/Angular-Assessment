import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this._http.get<any>('https://fakestoreapi.com/products').pipe(map((res: any) => {
      return res;
    }));
  }
}
