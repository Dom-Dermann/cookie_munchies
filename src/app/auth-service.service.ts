import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  authAPI: string = "http://localhost:3223/api/auth";
  userAPI: string = "http://localhost:3223/api/users/me";

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const userCred = {
      email: email,
      password: password
    }
    return this.http.post(this.authAPI, userCred);
  }

  whoAmI() {
    return this.http.get(this.userAPI);
  }
}
