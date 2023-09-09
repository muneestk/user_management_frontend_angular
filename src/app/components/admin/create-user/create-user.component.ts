import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emmiter } from '../../emmiters/emmiter';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    constructor(
       private builder: FormBuilder,
       private toastr: ToastrService,
       private router:Router,
       private userService : UserService
       
       ) {}

       ngOnInit(): void {
       this.userService.authoriseChecking().subscribe((res:any)=>{
          Emmiter.authEmitter.emit(true)
        },
        (err)=>{
          this.router.navigate(['/admin']);
          Emmiter.authEmitter.emit(false)
        }
        )
       }
  
    registration = this.builder.group({
      name: this.builder.control('', Validators.compose([Validators.required])),
      email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      mobileNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  
  
    submit() {
      let user: any = this.registration.getRawValue();
  
      if (this.registration.valid) {
         this.userService.admiCreateUser(user).subscribe(
          (res: any) => {
            Emmiter.authEmitter.emit(true);
            this.router.navigate(['/admin/dashboard']);
            this.toastr.success(res.message);
          },
          (err) => {
            if (err.error && err.error.message) {
              this.toastr.error(err.error.message); 
            } else {
              this.toastr.error('An error occurred. Please try again.');
            }
          }
        );
      }
    
   }
          
        
    
  }
  

