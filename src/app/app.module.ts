import { CanvasComponent } from './canvas/canvas.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCreatorComponent } from './recipes/recipe-creator/recipe-creator.component';

import { DataService } from './data.service';
import { AuthService } from './auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './AuthInterceptor';
import { AuthGuard } from './auth.guard';

import { MatToolbarModule,
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
          MatCheckboxModule,
          MatTabsModule } from '@angular/material';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'appcanvas', component: CanvasComponent, canActivate: [AuthGuard], children: [
    {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard], outlet: 'tab'},
    {path: 'itemlist', component: ListComponent, canActivate: [AuthGuard], outlet: 'tab'},
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], outlet: 'tab'},
  ]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    RecipesComponent, RecipeCreatorComponent, LoginComponent, CanvasComponent
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
  providers: [DataService, AuthGuard, LoginComponent, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
