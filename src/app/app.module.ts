
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ListComponent } from './list/list.component';
import { LoginComponent, passwordPopUpDialogModule } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeCreatorComponent } from './recipes/recipe-creator/recipe-creator.component';
import { UsersComponent } from './users/users.component';
import { NewAccountComponent } from './new-account/new-account.component';

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
        MatTabsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatMenuModule,
        MatRadioModule
        } from '@angular/material';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'new-account', component: NewAccountComponent},
  {path: 'appcanvas', component: CanvasComponent, canActivate: [AuthGuard], children: [
    {path: 'itemlist', component: ListComponent, canActivate: [AuthGuard], outlet: 'tab'},
    {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], outlet: 'tab'},
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard], outlet: 'tab'}
  ]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    RecipesComponent,
    RecipeCreatorComponent,
    LoginComponent,
    CanvasComponent,
    passwordPopUpDialogModule,
    UsersComponent,
    NewAccountComponent
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
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    MatRadioModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, AuthGuard, LoginComponent, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [passwordPopUpDialogModule]
})
export class AppModule { }
