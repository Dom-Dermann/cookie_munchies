import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.model';
import { DataService } from '../data.service';
import { List } from '../list.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users = new MatTableDataSource<User>();

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getList().subscribe( (list: List) => {
      this.users.data = list.users
    })
  }

}
