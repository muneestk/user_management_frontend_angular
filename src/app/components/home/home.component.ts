import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Emmiter } from '../emmiters/emmiter';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message :string = "";

  constructor(private http:HttpClient,private router:Router){}


   
  ngOnInit(): void {
    this.http.get('http://localhost:5000/user',{
      withCredentials:true
    }).subscribe(
      (res:any) => {
        this.message = `Welcome ${res.name}`
        Emmiter.authEmitter.emit(true)
      },
      (err) => {
        this.message = 'you are not login';
        Emmiter.authEmitter.emit(false)
      }
    )
  }
}
