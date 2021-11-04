import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Emitters} from "../../../schema/emitters";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public authenticated = false;
  public username!: string;
  public totalItems: number = 0;
  public searchTerm: string = '';

  constructor(
    private _authService: AuthService,
    private _route: Router,
    private _cartService: CartService
  ) {
  }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    Emitters.usernameEmitter.subscribe((username: string) => {
      this.username = username;
    });

    this._cartService.getProducts().subscribe(res => {
      this.totalItems = res.length;
    })

  }

  public logout() {
    Emitters.authEmitter.emit(false);
    this._route.navigate(['']).then();
  }

  public search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);
    this._cartService.search.next(this.searchTerm);
  }

}
