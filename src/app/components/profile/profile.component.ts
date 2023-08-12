import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store'
import { retrieveprofile } from '../../state/user.action';
import { Router } from '@angular/router';
import { userProfile } from '../../state/user.selector';
import { profile } from '../../state/types/user.types';
import { Emmiter } from '../emmiters/emmiter';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form:FormGroup | undefined

  public name: any = ""
  public email: any = ""
  img:any = "";
  selectedFile:any|File = null;

  constructor(
    private http:HttpClient,
    private store:Store<{userdetails:profile}>,
    private toastr:ToastrService,
    private router:Router
  ){}

  userData$ = this.store.pipe(select(userProfile)).subscribe(userProfileData => {
    this.name = userProfileData.name;
    this.email = userProfileData.email;
    this.img = userProfileData.image;
  })

  ngOnInit(): void {
    this.http.get('http://localhost:5000/user',{
      withCredentials:true
    })
    .subscribe((res:any)=>{
      this.store.dispatch(retrieveprofile());
      Emmiter.authEmitter.emit(true);
    },
    (err)=>{
      this.router.navigate(['/']);
      Emmiter.authEmitter.emit(false);
    })
  }

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0]
    console.log(event);
    console.log(this.selectedFile);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image',this.selectedFile,this.selectedFile.name);
    console.log(formData);
    this.http.post('http://localhost:5000/profile',formData,{
      withCredentials:true
    }).subscribe((res:any)=>{
      Emmiter.authEmitter.emit(true);
      this.store.dispatch(retrieveprofile());
      
    },
    (err)=>{
     this.toastr.error(err.error.message)
    }
    )
  }

}
