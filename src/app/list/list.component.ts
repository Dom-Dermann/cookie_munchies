import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';

import { Item } from '../items.model';
import { List } from '../list.model';
import { AuthService } from '../auth-service.service';
import { User } from '../user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items = new MatTableDataSource<Item>();
  public displayedColumns = ['name', 'actions', 'added_by'];
  public updatedItem: Item;
  public listOfLists: Array<Object>;

  constructor(private data: DataService, private route: Router, private authService: AuthService, private snack: MatSnackBar) {}

  changeList(newList) {
    if (newList == 0) {
      this.authService.whoAmI().subscribe( (u: User) => {
        this.data.currentUserList = u.ownsList;
      }, (error) => {
        console.log(error);
      }, () => {
        this.getItems();
      });
    } else {
      this.data.currentUserList = newList;
      this.getItems();
    }
  }

  ngOnInit() {
    this.authService.whoAmI().subscribe( ( u: User) => {
      this.data.currentUserList = u.ownsList;
      this.data.currentUserName = u.first_name;
      this.data.currentUserId = u._id;
    }, (err) => {
      this.snack.open(err.error, 'OK', {duration: 3000});
    }, () => {
      this.getItems();
      this.getLists();
    });
  }

  getLists() {
    this.data.getUserLists().subscribe( (lists: Array<Object>) => {
      this.listOfLists = lists;
    });
  }

  getItems() {
    this.data.getList().subscribe( (list: List) => {
      let itemlist = list.items;
      function compare(a, b) {
        const item1 = a.storePosition;
        const item2 = b.storePosition;

        if ( item1 > item2 ) {
          return 1;
        } else {
          return -1;
        }
      }

      itemlist = itemlist.sort(compare);
      this.items.data = itemlist;
    });
  }

  deleteItem(id) {
    this.data.deleteItem(id).subscribe( (res) => {
      this.getItems();
    });
  }

  editClick(id) {
    this.route.navigate(['edit', id]);
  }

  /* commented out because this button is currently not in use
  buttonChecked($event, id) {
    this.updatedItem = this.items.data.find((i) => { return i._id === id});
    delete this.updatedItem.storePosition;
    this.updatedItem.dateModified = Date.now();
    this.updatedItem.isDone = $event.checked;
    this.data.updateItem(id, this.updatedItem).subscribe( (res) => {
      console.log(res);
    })
  }
  */
}
