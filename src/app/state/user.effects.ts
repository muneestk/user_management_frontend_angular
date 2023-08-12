import { Injectable } from "@angular/core";
import { UserService } from "../service/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { retrievepost, retrievepostSuccess, retrieveprofile, retrieveprofileSuccess } from "./user.action";
import { map, switchMap } from "rxjs";
import { profile , Users } from "./types/user.types";

@Injectable()
export class appEffects{
    constructor(
        private actions$:Actions,
        private appService:UserService
    ){}

    loadProfile$ = createEffect(()=>
    this.actions$.pipe(
        ofType(retrieveprofile),
        switchMap(()=>{
            return this.appService.getprofile()
            .pipe(map((data)=>retrieveprofileSuccess({userdetails:data as profile})))
        })
    )
    )

    loadAllUsers$ = createEffect(()=>
    this.actions$.pipe(
        ofType(retrievepost),
        switchMap(()=>{
            return this.appService.getUser()
            .pipe(map((data)=>retrievepostSuccess({allusers:data as Users[]})))
        })
    )
    )
}