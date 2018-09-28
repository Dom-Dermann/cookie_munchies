import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';

import { Item } from '../items.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items = new MatTableDataSource<Item>();
  public displayedColumns = ['name', 'actions', 'position'];
  public updatedItem: Item;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getItems();
    console.log('New list page initialized');
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

  buttonChecked($event, id) {
    this.updatedItem = this.items.data.find((i) => { return i._id === id});
    this.updatedItem.isDone = $event.checked;
    this.data.updateItem(id, this.updatedItem).subscribe( (res) => {
      console.log(res);
    })
  }
}
