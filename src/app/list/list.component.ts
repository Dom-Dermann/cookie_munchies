import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';

import { Item } from '../items.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items = new MatTableDataSource<Item>();
  public displayedColumns = ['name', 'actions'];
  public updatedItem: Item;

  constructor(private data: DataService, private route: Router) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.data.getItems().subscribe( (items: Item[]) => {
      this.items.data = items;
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
