import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthToken } from './authToken.model';
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
    return this.http.post('https://cookie-munchies.herokuapp.com/api/auth', userCred).subscribe( (res: AuthToken) => {
      console.log(res);
      const token = res.jwt;
      this.setSession(token);
      this.router.navigate(['/itemlist']);
    });
  }
  
  private setSession(token) {
    localStorage.setItem('jwt', token);
    console.log(localStorage.getItem('jwt'));
  }
}
