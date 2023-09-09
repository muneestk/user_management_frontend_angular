import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AdminRegisterComponent } from "./admin-register/admin-register.component";
import { NotFoundComponent } from "../not-found/not-found.component";

const routes: Routes = [
    {
      path: 'admin',
      children: [
        { path: '', component: AdminLoginComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'createuser', component: CreateUserComponent },
        { path: 'edituser/:id', component: EditUserComponent },
        { path: 'register', component: AdminRegisterComponent },
        {path:'**',component:NotFoundComponent},
      ]
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
