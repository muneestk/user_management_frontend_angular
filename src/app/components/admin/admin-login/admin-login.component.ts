import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emmiter } from '../../emmiters/emmiter';
import { UserService } from 'src/app/service/user.service';

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
     private userService:UserService
     
     ) {}

    

  ngOnInit(): void {

}


submit(){
  let admin = this.form.getRawValue()
  if(admin.email == '' && admin.password == ''){
   this.toastr.error('all the fields are required');
  }else{
  this.userService.adminLogin(admin).subscribe((res) => this.router.navigate(['/admin/dashboard']),(err) =>{
     if (err.error && err.error.message) {
       this.toastr.error(err.error.message); 
     } else {
       this.toastr.error('An error occurred. Please try again.');
     }
   })
  } 
}

}
