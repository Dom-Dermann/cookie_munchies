import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from'@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule,MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCreatorComponent } from './recipes/recipe-creator/recipe-creator.component';

const routes : Routes = [
  {path: 'edit/:id', component: EditComponent},
  {path: 'itemlist', component: ListComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: '', redirectTo: '/itemlist', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent, 
    RecipesComponent, RecipeCreatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule,
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
