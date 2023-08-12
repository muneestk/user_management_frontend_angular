import { Component,OnInit } from '@angular/core';
import { Emmiter } from '../emmiters/emmiter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  authenticated=false
  constructor(private http:HttpClient){}

 ngOnInit(): void {
   Emmiter.authEmitter.subscribe((auth:boolean) => {
     this.authenticated=auth
   })
 }

 logout(){
   this.http.post('http://localhost:5000/logout',{},{
    withCredentials:true
   }).subscribe(() => this.authenticated = false)
 }

}
