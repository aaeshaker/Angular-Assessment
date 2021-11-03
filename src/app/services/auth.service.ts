import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {User} from "../schema/user";
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

  constructor() {
  }

  login(loginContext: User): Observable<User> {

    const isUser =
      loginContext.username === User.username &&
      loginContext.password === User.password;

    const isAdmin =
      loginContext.username === Admin.username &&
      loginContext.password === Admin.password;

    if (isUser) {
      Emitters.authEmitter.emit(true);
      Emitters.usernameEmitter.emit(User.username);
      return of(User);
    } else if (isAdmin) {
      Emitters.authEmitter.emit(true);
      Emitters.usernameEmitter.emit(Admin.username);
      return of(Admin);
    }

    Emitters.authEmitter.emit(false);
    return throwError('Invalid username or password');
  }


}
