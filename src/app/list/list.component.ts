import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public items: Array<object> = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.data.getItems().subscribe( (items: Array<object>) => {
      this.items = items;
      console.log(items);
    })
  }

}
