import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {User} from "../schema/user";
import {Router} from "@angular/router";
import {Emitters} from "../schema/emitters";

const User = {
  username: 'user',
  password: 'user'
};

const Admin = {
  username: 'admin',
  password: 'admin'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _route: Router) {
  }

  login(loginContext: User): Observable<User> {

    const isUser =
      loginContext.username === User.username &&
      loginContext.password === User.password;

    const isAdmin =
      loginContext.username === Admin.username &&
      loginContext.password === Admin.password;

    if (isUser) {
      localStorage.setItem('currentUser', JSON.stringify({username: User.username}));
      Emitters.authEmitter.emit(true);
      return of(User);
    } else if (isAdmin) {
      localStorage.setItem('currentUser', JSON.stringify({username: Admin.username}));
      Emitters.authEmitter.emit(true);
      return of(Admin);
    }

    return throwError('Invalid username or password');
  }

  getCurrentUser() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('currentUser')).username;
  }

  logout() {
    Emitters.authEmitter.emit(false);
    this._route.navigate(['/']).then();
    // @ts-ignore
    return JSON.parse(localStorage.clear());
  }


}
