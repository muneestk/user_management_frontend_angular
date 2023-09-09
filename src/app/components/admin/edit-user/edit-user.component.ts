import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emmiter } from '../../emmiters/emmiter';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  
  username: any;
  email:any;
  form!: FormGroup;
  id:any
  mobile!: number;


  constructor(
    private formBuilder: FormBuilder, 
    private router: ActivatedRoute,
    private route: Router ,
    private toastr: ToastrService,
    private userService : UserService
  ) { }

  public param:any;

   ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [this.username],
      emailChange : [this.email],
      mobileNumber : [this.mobile]
    })

    this.router.params.subscribe(params => {
      this.param = params['id'];
    });
    
      
    this.userService.authoriseChecking().subscribe((res:any)=>{
        this.getusers(this.param);
        Emmiter.authEmitter.emit(true)
      },
      (err)=>{
        this.route.navigate(['/admin']);
        Emmiter.authEmitter.emit(false)
      }
      )

     
   }

   
  getusers(userId:any){
   this.userService.admiGetEditUser(userId).subscribe((res:any)=>{
      console.log(res);
      this.username = res.name;
      this.email = res.email;
      this.id = res._id
      this.mobile = res.mobile
      Emmiter.authEmitter.emit(true);
    },
    (err)=>{
      this.route.navigate(['/admin']);
      Emmiter.authEmitter.emit(false);
    }
    )
  }


  submit():void {
    let user = this.form.getRawValue();
    console.log(user);
     user.id = this.id
     if(user.name == null) {
      user.name = this.username
    }else if(user.name == ''){
      this.toastr.error('fields cannot be empty')

    }
     if(user.emailChange == null) {
      user.emailChange = this.email 
    }
     if(user.mobileNumber == null) {
      user.mobileNumber = this.mobile   
    }else{  
      this.userService.admiEditUser(user).subscribe(()=>this.route.navigate(['/admin/dashboard']),
      (err)=>{
        this.toastr.error(err.error.message)
      })
    }
  }

}
