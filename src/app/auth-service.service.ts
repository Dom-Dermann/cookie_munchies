import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const userCred = {
      email: email,
      password: password
    }
    return this.http.post('https://cookie-munchies.herokuapp.com/api/auth', userCred)
  }
}
