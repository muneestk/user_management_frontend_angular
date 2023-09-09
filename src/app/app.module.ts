import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component'; 
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { AdminRegisterComponent } from './components/admin/admin-register/admin-register.component'; 
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { postReducer, profileReducer } from './state/user.reducer';
import { appEffects } from './state/user.effects';
import {MatIconModule} from '@angular/material/icon';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorService } from './token-intercepter.service';
import { upperCase } from './custom.pipes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    CreateUserComponent,
    DashboardComponent,
    AdminNavComponent,
    EditUserComponent,
    AdminRegisterComponent,
    AdminLoginComponent,
    NotFoundComponent,
    upperCase
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    AdminRoutingModule,
    StoreModule.forRoot({userdetails:profileReducer,allusers:postReducer}),
    EffectsModule.forRoot([appEffects]),
    MatIconModule
  
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
