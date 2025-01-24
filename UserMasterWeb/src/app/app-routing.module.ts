import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UpsertUserComponent } from './user-list/upsert-user/upsert-user.component';
import { LoginComponent } from './login/login.component';
import { CanViewAuthGuard } from './shared/guards/CanViewAuthGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canMatch: [CanViewAuthGuard]
  },
  {
    path: '',
    redirectTo: 'users', pathMatch: 'full'
  },
  {
    path: 'upsert-user',
    component: UpsertUserComponent,
  },
  {
    path: 'upsert-user/:userid',
    component: UpsertUserComponent,
    canMatch: [CanViewAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanViewAuthGuard]
})
export class AppRoutingModule { }
