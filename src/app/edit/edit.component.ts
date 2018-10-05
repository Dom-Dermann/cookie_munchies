import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ActivatedRoute } from '@angular/router';
import { Item } from '../items.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  items: Array<object>;
  id: String;
  editItem: Item;

  constructor(private data: DataService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.editForm = this.fb.group( {
      name : ['', Validators.required],
      position: ['']
    })
   }

  ngOnInit() {
    this.route.params.subscribe( (id) => {
      this.id = id.id;
    })
    this.data.getItems().subscribe( (items: Array<object>) => {
      this.items = items;
      this.editItem = this.items.find((i: Item) => { return i._id == this.id }) as Item;
      this.editForm.controls['name'].setValue(this.editItem.name);
      // convert store position back from number to string
      this.editForm.controls['position'].setValue(this.editItem.storePosition);
      console.log(this.editItem);
    });
  }

  updateItem(name, position) {
    this.editItem.name = name;
    this.editItem.storePosition = position;
    this.data.updateItem(this.id, this.editItem).subscribe( (i) => {
      console.log(i);
      this.router.navigate(['/itemlist']);
    });
  }
}
