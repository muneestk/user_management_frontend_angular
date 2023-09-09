import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  passwordVisibilityToggleClicked=false ;
  hide:boolean = true;
  responseData:any;
  result:string = ''
 
  form: FormGroup = this.builder.group({
    email: "",
    password: ""
  });


   
  constructor(
    private builder: FormBuilder,
     private toastr: ToastrService,
     private router:Router,
     private userService : UserService
     
     ) {
      localStorage.clear();
     }


     onPasswordVisibilityToggleClick(event: Event): void {
      event.preventDefault(); 
      this.passwordVisibilityToggleClicked = true;
      this.hide = !this.hide;
    }

    

  ngOnInit(): void {
 
  }

  

  submit(){
     let user = this.form.getRawValue()
     if(user.email == '' && user.password == ''){
      this.toastr.error('all the fields are required');
     }else{
     this.userService.userLogin(user).subscribe((res) => {
       this.responseData = res ;
       console.log(this.responseData);
       localStorage.setItem('token',this.responseData.jwtToken);
       this.router.navigate(['/'])
     },(err) =>{
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message); 
        } else {
          this.toastr.error('An error occurred. Please try again.');
        }
      })
     } 
  }

}
