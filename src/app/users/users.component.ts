import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.model';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users = new MatTableDataSource<User>();
  public currentListUsers = new MatTableDataSource<User>();
  public displayedColumns = ['first_name', 'last_name', 'email', 'add'];
  public listUserDisplayedColumns = ['first_name', 'last_name'];

  constructor(private data: DataService, private sb: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
    this.getUsersInCurrentList();
  }

  addUserToList(userId) {
    this.data.addUserToList(userId).subscribe( (u) => {
    }, (error) => {
      console.log(error.error);
      this.sb.open(error.error, 'Ok');
    }, () => {
      this.getUsersInCurrentList();
    });
  }

  getUsersInCurrentList() {
    this.data.getUsersInCurrentList().subscribe( (users: Array<User>) => {
      this.currentListUsers.data = users;
    });
  }

  getUsers() {
    this.data.getUsers().subscribe( (users: Array<User>) => {
      this.users.data = users;
    }, (error) => {
      console.log(error);
    });
  }

}
