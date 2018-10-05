import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from'@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule,MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatCheckboxModule } from '@angular/material';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes : Routes = [
  {path: 'edit/:id', component: EditComponent},
  {path: 'itemlist', component: ListComponent},
  {path: '', redirectTo: '/itemlist', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
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
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
