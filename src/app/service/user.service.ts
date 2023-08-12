import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private adminUrl = "http://localhost:5000/admin/"
  private userUrl = "http://localhost:5000/"

  constructor(private http:HttpClient) { }

  getprofile(){
    return this.http.get(`${this.userUrl}user`,{
      withCredentials:true
    })
  }

  getUser() {
    console.log(`${this.adminUrl}users`);
    return this.http.get("http://localhost:5000/admin/users",{withCredentials:true})
  }


}
