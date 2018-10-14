import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './items.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_Item_URL: string = 'https://cookie-munchies.herokuapp.com/api/items';
  API_Recipe_URL: string = 'https://cookie-munchies.herokuapp.com/api/recipes';

  constructor(private http : HttpClient) { }

  getItems(){
    return this.http.get(this.API_Item_URL);
  }

  postItem(name, position){
    let item: object;

    if (name && position) {
      item = {
        name : name,
        storePosition: position
      }
    } else if (name){
      item = {
        name: name
      };
    }
     
    return this.http.post(this.API_Item_URL, item);
  }

  deleteItem(id) {
    return this.http.delete(`${this.API_Item_URL}/${id}`);
  }

  updateItem(id, item) {
    return this.http.put(`${this.API_Item_URL}/${id}`, item);
  }

  postRecipe(description) {
    let recipe = {
      description: String
    };

    recipe.description = description;

    return this.http.post(this.API_Recipe_URL, recipe);
  }

  getRecipe() {
    return this.http.get(this.API_Recipe_URL);
  }

  deleteRecipe(id) {
    return this.http.delete(`${this.API_Recipe_URL}/${id}`);
  }
}
