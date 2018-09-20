import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL: string = 'https://cookie-munchies.herokuapp.com/api/items';

  constructor(private http : HttpClient) { }

  getItems(){
    return this.http.get(this.API_URL);
  }

  postItem(name){
    const item = {
      name: name
    };
     
    return this.http.post(this.API_URL, item);
  }
}
