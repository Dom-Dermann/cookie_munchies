import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './items.model';
import { AuthService } from './auth-service.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_List_URL: string = 'https://cookie-munchies.herokuapp.com/api/lists/';
  API_Item_URL: string = 'https://cookie-munchies.herokuapp.com/api/items/';
  API_Recipe_URL: string = 'https://cookie-munchies.herokuapp.com/api/recipes/';
  API_User_URL: string = 'https://cookie-munchies.herokuapp.com/api/users';
  currentUserList: string;
  currentUserName: string;
  currentUserId: string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // List
  // API Calls
  getList() {
    return this.http.get(this.API_List_URL + this.currentUserList);
  }

  getUserLists() {
    return this.http.get(this.API_List_URL + '/all');
  }

  // Item
  // API calls
  getItem(id) {
    return this.http.get(this.API_Item_URL + '/' + id);
  }

  postItem(name, position) {
    const item: Item = {};

    if (name) {
      item.name = name;
    }

    if (position) {
      item.storePosition = position;
    }

    if (this.currentUserName) {
      item.addedBy = this.currentUserName;
    }

    return this.http.post(this.API_Item_URL + this.currentUserList, item);
  }

  deleteItem(id) {
    return this.http.delete(this.API_Item_URL + this.currentUserList + '/' + id);
  }

  updateItem(id, item) {
    return this.http.put(this.API_Item_URL + this.currentUserList + '/' + id, item);
  }

  // Recipe
  // API calls

  postRecipe(description) {
    const recipe = {
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

  // user
  // API calls
  postUser(user) {
    return this.http.post(this.API_User_URL, user);
  }

  addUserToList(user) {
    return this.http.post(this.API_User_URL + '/' + user, 'do this!');
  }

  getUsers() {
    return this.http.get(this.API_User_URL);
  }

  getUsersInCurrentList() {
    return this.http.get(this.API_User_URL + '/' + this.currentUserId);
  }
}
