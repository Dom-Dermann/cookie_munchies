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
  public displayedColumns = ['name', 'email', 'add'];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe( (users: Array<User>) => {
      console.log(users);
      this.users.data = users;
    });
  }

}
