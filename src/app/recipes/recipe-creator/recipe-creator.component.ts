import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { SimpleSnackBar, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {

  recipeForm: FormGroup;

  constructor(private data: DataService, private fb: FormBuilder, private snacks: MatSnackBar) {
    this.recipeForm = this.fb.group( {
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  addRecipe(description) {
    this.data.postRecipe(description).subscribe( (res) => {
      console.log(res);
      this.snacks.open('Your recipe was saved. Enjoy!', 'Yummy!', { duration: 3000});
    });
  }
}
