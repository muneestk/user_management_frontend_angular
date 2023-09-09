import { Component,OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store'
import { retrieveprofile } from '../../state/user.action';
import { userProfile } from '../../state/user.selector';
import { profile } from '../../state/types/user.types';
import { Emmiter } from '../emmiters/emmiter';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';


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
    private store:Store<{userdetails:profile}>,
    private toastr:ToastrService,
    private userService : UserService,
  ){}

 


  userData$ = this.store.pipe(select(userProfile)).subscribe(userProfileData => {
    this.name = userProfileData.name;
    this.email = userProfileData.email;
    this.img = userProfileData.image;
  })

  ngOnInit(): void {
      this.store.dispatch(retrieveprofile());
  
  }

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0]
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('image',this.selectedFile,this.selectedFile.name);
      this.userService.userProfile(formData).subscribe((res:any)=>{
      Emmiter.authEmitter.emit(true);
      this.store.dispatch(retrieveprofile());
    },
    (err)=>{
     this.toastr.error(err.error.message)
    } 
    )
  }

  

}
