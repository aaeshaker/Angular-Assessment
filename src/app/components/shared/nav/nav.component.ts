import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Emitters} from "../../../schema/emitters";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public authenticated = false;
  public username!: string;

  constructor(
    private _authService: AuthService,
    private _route: Router
  ) {
  }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    Emitters.usernameEmitter.subscribe((username: string) => {
      this.username = username;
    });

  }

  public logout() {
    Emitters.authEmitter.emit(false);
    this._route.navigate(['']).then();
  }

}
