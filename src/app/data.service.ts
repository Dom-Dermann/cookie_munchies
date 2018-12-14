import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './items.model';
import { AuthService } from './auth-service.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_Item_URL: string = 'http://localhost:3223/api/lists';
  API_Recipe_URL: string = 'http://localhost:3223/api/recipes';
  currentUserList: string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getList() {
    console.log(`http://localhost:3223/api/lists/${this.currentUserList}`);
    return this.http.get(`http://localhost:3223/api/lists/${this.currentUserList}`);
  }

  postItem(name, position) {
    let item: object;

    if (name && position) {
      item = {
        name : name,
        storePosition: position
      };
    } else if (name) {
      item = {
        name: name
      };
    }
    return this.http.post('http://localhost:3223/api/items/5c0798bf9ad3f424704e6307', item);
  }

  deleteItem(id) {
    return this.http.delete(`http://localhost:3223/api/items/5c0798bf9ad3f424704e6307/${id}`);
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
