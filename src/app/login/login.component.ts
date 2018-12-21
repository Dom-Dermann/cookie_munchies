import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { AuthToken } from '../authToken.model';
import { MatDialog, MatDialogRef } from '@angular/material';


import { MatSnackBar } from '@angular/material';
import { DataService } from '../data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public isLoggedIn: Boolean = false;
  public logginIn: Boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snack: MatSnackBar, public dialog: MatDialog, private data: DataService) {
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
        }, (err) => {
          this.snack.open(err.error, 'OK', {duration: 3000});
          this.logginIn = false;
        }, () => {
          this.authService.whoAmI().subscribe( (u: User) => {
            this.data.currentUserList = u.ownsList;
          }, (err) => {
            console.log('couldn\'t fetch user list');
          }, () => {
            this.router.navigate(['appcanvas']);
            this.logginIn = false;
          });
        });
    }
  }

  newAccount() {
    this.router.navigate(['new-account'])
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  forgotPasswordPopup() {
    const DiaRef = this.dialog.open(passwordPopUpDialogModule, {
      width: '500px'
    })
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'passwordPopUp.html',
})
export class passwordPopUpDialogModule {

  constructor(
    public dialogRef: MatDialogRef<passwordPopUpDialogModule>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
