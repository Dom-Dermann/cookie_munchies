import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';

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
  public displayedColumns = ['name', 'actions'];
  public updatedItem: Item;

  constructor(private data: DataService, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.whoAmI().subscribe( ( u: User) => {
      this.data.currentUserList = u.ownsList;
    });
    // TODO: every time the side is loaded get the users list and then get the items just like in the log-in screen
    this.getItems();
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
      console.log(res);
      this.getItems();
    });
  }

  editClick(id) {
    console.log(id);
    this.route.navigate(['/edit', id]);
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
