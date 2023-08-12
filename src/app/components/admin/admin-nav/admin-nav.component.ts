import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Emmiter } from '../../emmiters/emmiter';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  authenticated=false
  constructor(private http:HttpClient){}

 ngOnInit(): void {
   Emmiter.authEmitter.subscribe((auth:boolean) => {
     this.authenticated=auth
   })
 }

 logout(){
   this.http.post('http://localhost:5000/admin/logout',{},{
    withCredentials:true
   }).subscribe(() => this.authenticated = false)
 }
}
