import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {

  recipeForm: FormGroup;

  constructor(private data: DataService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group( {
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

}
