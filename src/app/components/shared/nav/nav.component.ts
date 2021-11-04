import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Emitters} from "../../../schema/emitters";
import {CartService} from "../../../services/cart.service";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public authenticated: boolean = false;
  public username!: string;
  public totalItems: number = 0;
  public searchTerm: string = '';

  constructor(
    private _authService: AuthService,
    private _route: Router,
    private _cartService: CartService,
    private _apiService: ApiService
  ) {
    if(this._authService.getCurrentUser()){
      this.authenticated = true;
    }
  }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
      console.log('auth', auth);
      if (auth) {
        this.username = this._authService.getCurrentUser();
      }
    });


    this._cartService.getProducts().subscribe(res => {
      this.totalItems = res.length;
    })

  }

  public logout() {
    this._authService.logout();
    this._route.navigate(['']).then();
  }

  public search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);
    this._cartService.search.next(this.searchTerm);
  }

}
