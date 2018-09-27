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
  public displayedColumns = ['name', 'status', 'actions'];
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
    console.log(this.items.data);
    console.log("ID input", id);
    this.updatedItem = this.items.data.find((i) => { return i._id === id});
    console.log("Found this: ", this.updatedItem);
    this.updatedItem.isDone = $event.checked;
    console.log($event.checked);
    console.log(this.updatedItem);
    this.data.updateItem(id, this.updatedItem).subscribe( (res) => {
      console.log(res);
    })
  }
}
