
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emmiter } from '../../emmiters/emmiter';




@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  constructor(
    private builder: FormBuilder,
     private toastr: ToastrService,
     private http:HttpClient,
     private router:Router,
     
     ) {}

  registration = this.builder.group({
    name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z]).{8,}$')]],
  });

  getErrorMessage(controlName: any) {
    const control = this.registration.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required';
    }

    if (control?.hasError('minlength')) {
      return 'Minimum length should be 5';
    }

    if (controlName === 'email' && control?.hasError('email')) {
      return 'Invalid email format';
    }

    if (controlName === 'mobileNumber' && control?.hasError('pattern')) {
      return 'Only numbers are allowed must be need 10 numbers';
    }

    if (controlName === 'password' && control?.hasError('pattern')) {
      return 'Password must have at least one uppercase letter, two numeric digits, and be 8 characters long';
    }

    return '';
}



  submit() {
    let admin: any = this.registration.getRawValue();

    if (this.registration.valid) {
      this.http.post('http://localhost:5000/admin/register', admin, {
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
    else {
          for (const controlName in this.registration.controls) {
            const control = this.registration.get(controlName);
            if (control?.invalid) {
              const errorMessage = this.getErrorMessage(controlName);
              if (errorMessage) {
                this.toastr.warning(errorMessage);
              }
            }
          }
        }
      }
  
}
