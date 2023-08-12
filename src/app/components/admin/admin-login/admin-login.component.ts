import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emmiter } from '../../emmiters/emmiter';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  

  form: FormGroup = this.builder.group({
    email: "",
    password: ""
  });

   
  constructor(
    private builder: FormBuilder,
     private toastr: ToastrService,
     private http:HttpClient,
     private router:Router,
     
     ) {}

    

  ngOnInit(): void {
  //   this.http.get('http://localhost:5000/admin/user',{
  //     withCredentials:true
  //   }).subscribe(
  //     (res:any) => {
  //       Emmiter.authEmitter.emit(true)
  //     },
  //     (err) => {
  //       Emmiter.authEmitter.emit(false)
  //     }
  //   )
}


submit(){
  let admin = this.form.getRawValue()
  if(admin.email == '' && admin.password == ''){
   this.toastr.error('all the fields are required');
  }else{
   this.http.post("http://localhost:5000/admin/login",admin,{
     withCredentials:true
   }).subscribe((res) => this.router.navigate(['/admin/dashboard']),(err) =>{
     if (err.error && err.error.message) {
       this.toastr.error(err.error.message); 
     } else {
       this.toastr.error('An error occurred. Please try again.');
     }
   })
  } 
}

}
