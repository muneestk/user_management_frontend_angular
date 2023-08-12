import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emmiter } from '../../emmiters/emmiter';
import { ToastrService } from 'ngx-toastr';


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
    private http: HttpClient, 
    private router: ActivatedRoute,
    private route: Router ,
    private toastr: ToastrService
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
     console.log(this.param);

    
      
      this.http.get('http://localhost:5000/admin/active',{
        withCredentials:true
      }).subscribe((res:any)=>{
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
    console.log(userId,'---------------');
    this.http.get(`http://localhost:5000/admin/edituser/${userId}`,{
      withCredentials: true
    }).subscribe((res:any)=>{
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
    }else if(user.emailChange == ''){
      this.toastr.error('fields cannot be empty')

    }
    if(user.mobileNumber == null) {
      user.mobileNumber = this.mobile
    }else if(user.mobileNumber == ''){
      this.toastr.error('fields cannot be empty')

    }else{
      this.http.post('http://localhost:5000/admin/editUser',user,{
        withCredentials: true
      }).subscribe(()=>this.route.navigate(['/admin/dashboard']),
      (err)=>{
        this.toastr.error(err.error.message)

      })
    }
  }

}
