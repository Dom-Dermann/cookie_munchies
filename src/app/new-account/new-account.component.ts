import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from '../validatePassword';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private data: DataService, private sb: MatSnackBar) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      gender: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // my custom validation method
    });
   }

  ngOnInit() {
    console.log(this.registerForm);
  }

  register() {
    const values = this.registerForm.value;

    if (values.first_name && values.last_name && values.email && values.password) {
      const newUser = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password
      };

      this.data.postUser(newUser).subscribe( (res) => {
        console.log('User successfully created: ' + res);
      }, (error) => {
        console.log(error.error);
        this.sb.open(error.error, 'ok');
      }, () => {
        this.router.navigate(['appcanvas']);
      });
    }
  }

  back() {
    this.router.navigate(['login']);
  }

  onKeyDown($event) {
    return null;
  }

}
