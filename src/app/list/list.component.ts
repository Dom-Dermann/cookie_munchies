import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Item } from '../items.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items: Item[];
  private displayedColumns = ['name', 'status', 'actions'];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.data.getItems().subscribe( (items: Item[]) => {
      this.items = items;
      console.log(items);
    });
  }

  deleteItem(id) {
    this.data.deleteItem(id).subscribe( (res) => {
      console.log(res);
      this.getItems();
    });
  }
}
