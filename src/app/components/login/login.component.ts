import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {of, Subscription} from "rxjs";
import {catchError, delay, finalize, tap} from "rxjs/operators";
import {Emitters} from "../../schema/emitters";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  error!: string;
  form!: FormGroup;

  private _sub = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {

    this.form = this._formBuilder.group({
      username: "",
      password: ""
    });

  }

  public submit(): void {

    this._sub = this._authService
      .login(this.form.value)
      .pipe(
        // delay(1500),
        tap(() => this._router.navigate(['/home'])),
        // finalize(() => (this.isLoading = false)),
        catchError(error => of((this.error = error)))
      )
      .subscribe(res => {
        console.log(res);
      });

  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
    // Emitters.authEmitter.emit(false);
  }
}
