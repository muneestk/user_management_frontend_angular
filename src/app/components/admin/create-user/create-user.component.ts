import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emmiter } from '../../emmiters/emmiter';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    constructor(
      private builder: FormBuilder,
       private toastr: ToastrService,
       private http:HttpClient,
       private router:Router,
       
       ) {}

       ngOnInit(): void {
        this.http.get('http://localhost:5000/admin/active',{
          withCredentials:true
        }).subscribe((res:any)=>{
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
        this.http.post('http://localhost:5000/register', user, {
          withCredentials: true
        }).subscribe(
          (res: any) => {
            Emmiter.authEmitter.emit(true);
            this.router.navigate(['/admin/dashboard']);
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
  

