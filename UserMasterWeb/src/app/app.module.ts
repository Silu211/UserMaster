import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppToolBarComponent } from './shared/app-toolbar/app-toolbar.component';
import { MatTableModule } from '@angular/material/table';
import { UserListComponent } from './user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from './user-list/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UpsertUserComponent } from './user-list/upsert-user/upsert-user.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    AppToolBarComponent,
    UserListComponent,
    UpsertUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatSortModule,
    MatButtonToggleModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideAnimationsAsync(),
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
