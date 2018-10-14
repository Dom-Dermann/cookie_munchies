import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public recipes = Array<String>();

  constructor(private data: DataService) {  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.data.getRecipe().subscribe( (r: Array<String>) => {
      this.recipes = r;
      console.log('list of recipes', this.recipes);
    })
  }

  deleteRecipe($event) {
    this.data.deleteRecipe($event).subscribe( (r) => {
      console.log(r);
    });
    console.log($event);
  }

}
