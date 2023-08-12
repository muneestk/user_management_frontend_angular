import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { retrievepost } from '../../../state/user.action';
import { Router } from '@angular/router';
import { Users } from '../../../state/types/user.types';
import { UserService } from '../../../service/user.service';
import { uniqueEmail } from '../../../state/user.selector';
import { Emmiter } from '../../emmiters/emmiter';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private http:HttpClient,
    private store:Store<{allusers:Users[]}>,
    private router:Router,
    private appService:UserService,
    private toastr : ToastrService,
    private builder : FormBuilder
  ){}


  userdata$ = this.store.pipe(select(uniqueEmail))
  name!:string  


  form: FormGroup = this.builder.group({
    name:""
  });

  ngOnInit(): void {
    this.http.get('http://localhost:5000/admin/active',{
      withCredentials:true
    }).subscribe((res:any)=>{
      this.store.dispatch(retrievepost())
      Emmiter.authEmitter.emit(true)
    },
    (err)=>{
      this.router.navigate(['/admin']);
      Emmiter.authEmitter.emit(false)
    }
    )
    this.store.dispatch(retrievepost())
  }


  editUser(id:any){
    this.router.navigate(['/admin/edituser',id])
  }
 
  deleteUser(userId: string) {
    this.http.get(`http://localhost:5000/admin/deleteUser/${userId}`,{withCredentials:true}).subscribe(
      () => {
        this.store.dispatch(retrievepost());
        this.toastr.success('User successfully deleted');
        Emmiter.authEmitter.emit(true);
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.router.navigate(['/admin/dashboard']);
        Emmiter.authEmitter.emit(false);
      }
    );
  }

  search() {
    let user = this.form.getRawValue()
    this.http.post('http://localhost:5000/admin/search', user, {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.userdata$ = of(res)
        console.log(res.users)
      },
      (err) => {
        alert(err)
      }
    );
  }
  



}


