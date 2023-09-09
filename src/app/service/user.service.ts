import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private adminUrl = "http://localhost:5000/admin/"
  private userUrl = "http://localhost:5000/"

  constructor(private http:HttpClient) { }

  //admin authorise checking

  authoriseChecking(){
    return this.http.get(`${this.adminUrl}active`,{
      withCredentials:true
    })
  }

  //single user details

  getprofile(){
    return this.http.get(`${this.userUrl}user`,{
      withCredentials:true
    })
  }

  //all user details

  getUser() {
    console.log(`${this.adminUrl}users`);
    return this.http.get(`${this.adminUrl}users`,{withCredentials:true})
  }
  

  //regisetring user

  registerUser(user: any) {
    return this.http.post(`${this.userUrl}register`, user, {
      withCredentials: true
    });
  }


  //user image updating

  userProfile(formData:any){
    return this.http.post(`${this.userUrl}profile`, formData, {
      withCredentials: true
    });
  }




  //user login

  userLogin(form:any){
    return this.http.post(`${this.userUrl}login`, form, {
      withCredentials: true
    });
  }


   //admin login

   adminLogin(form:any){
    return this.http.post(`${this.adminUrl}login`, form, {
      withCredentials: true
    });
  }


   //admin Register

   adminRegister(form:any){
    return this.http.post(`${this.adminUrl}register`, form, {
      withCredentials: true
    });
  }

  //admin creating user

  admiCreateUser(form:any){
    return this.http.post(`${this.adminUrl}createuser`, form, {
      withCredentials: true
    });
  }


  //admin get user edit detail

  admiGetEditUser(userId:any){
    return this.http.get(`${this.adminUrl}edituser/${userId}`, {
      withCredentials: true
    });
  }

  //admin edit user

  admiEditUser(form:any){
    return this.http.post(`${this.adminUrl}editUser`, form, {
      withCredentials: true
    });
  }

  //delete user in admin side

  deleteUser(userId:string){
    return this.http.get(`${this.adminUrl}deleteUser/${userId}`, {
      withCredentials: true
    });
  }
    

  //search user from dashboard

  searchUser(form:string):Observable<any>{
    return this.http.post(`${this.adminUrl}search`, form, {
      withCredentials: true
    });
  }

 //login checking for intercepter

  isLogedIn(){
    return localStorage.getItem('token') != null ;
  }

  
  //retrieving token for intercepter

  getToken(){
    return localStorage.getItem('token') || '' ;
  }



}