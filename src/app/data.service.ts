import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './items.model';


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
    let item = {
      name: name,
    };
     
    return this.http.post(this.API_URL, item);
  }

  deleteItem(id) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateItem(id, item) {
    // TODO: write update function
    return this.http.put(`${this.API_URL}/${id}`, item);
  }
}
