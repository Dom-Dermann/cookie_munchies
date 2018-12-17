import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './items.model';
import { AuthService } from './auth-service.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_List_URL: string = 'http://localhost:3223/api/lists/';
  API_Item_URL: string = 'http://localhost:3223/api/items/';
  API_Recipe_URL: string = 'http://localhost:3223/api/recipes/';
  currentUserList: string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getList() {
    return this.http.get(this.API_List_URL + this.currentUserList);
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
    return this.http.post(this.API_Item_URL + this.currentUserList, item);
  }

  deleteItem(id) {
    return this.http.delete(this.API_Item_URL + this.currentUserList + '/' + id);
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
