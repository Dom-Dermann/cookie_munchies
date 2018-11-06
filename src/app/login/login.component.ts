import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { AuthToken } from '../authToken.model';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public isLoggedIn: Boolean = false;
  public logginIn: Boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snack: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  login() {
    const val = this.loginForm.value;
    this.logginIn = true;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe((res: AuthToken) => {
          console.log(res);
          const token = res.jwt;
          localStorage.setItem('jwt', token);
          this.isLoggedIn = true;
          this.router.navigate(['appcanvas']);
          this.logginIn = false;
        }, (err) => {
          this.snack.open(err.error, 'OK', {duration: 3000});
          this.logginIn = false;
        });
    }
  }
}
