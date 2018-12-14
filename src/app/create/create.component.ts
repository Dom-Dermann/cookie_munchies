import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

import { MatSnackBar } from '@angular/material';

import {FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  @Output() createClicked = new EventEmitter<Boolean>();

  constructor(private data: DataService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group( {
      name: ['', Validators.required],
      position: ['']
    });
   }

  ngOnInit() {
  }

  addItem(done: Boolean, name, position) {
    this.data.postItem(name, position).subscribe( (res) => {
      console.log(res);
      this.createClicked.emit(done);
      this.snackBar.open('Your item was succesfully added to the shopping list.', 'Cool!', {
        duration: 3000
      });
    });
  }
}
