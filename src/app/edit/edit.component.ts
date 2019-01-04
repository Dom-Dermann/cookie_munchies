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
  items: Array<Item>;
  id: String;
  editItem: Item;

  constructor(private data: DataService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.editForm = this.fb.group( {
      name : ['', Validators.required],
      position: ['']
    });
   }

   updateItem(name, position) {
    this.editItem = {
      name: name,
      storePosition: position,
      addedBy: this.data.currentUserName
    };

    this.data.updateItem(this.id, this.editItem).subscribe( (i) => {
      console.log(i);
      this.router.navigate(['/appcanvas']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe( (id) => {
      this.id = id.id;
    });

    this.data.getItem(this.id).subscribe( (item: Item) => {
      switch (item.storePosition) {
        case '0':
          item.storePosition = 'none';
          break;
        case '1':
          item.storePosition = 'beginning';
          break;
        case '2':
          item.storePosition = 'middle';
          break;
        case '3':
          item.storePosition = 'end';
      }

      this.editForm.setValue( {
        name: item.name,
        position: item.storePosition
      });
    });
  }
}
