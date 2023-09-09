import { createReducer, on } from "@ngrx/store";
import { profile, Users } from "./types/user.types";
import { retrievepostSuccess, retrieveprofileSuccess } from "./user.action";

export const initialStateOfUser:profile= {
    _id:"",
    name:"",
    email:"",
    password:"",
    mobile:"",
    image:"",
    __v:""
}

const _ProfileReducer = createReducer(
    initialStateOfUser,
    on(retrieveprofileSuccess,(state,{userdetails})=>{
        return userdetails
    })
)

export function profileReducer(state:any,action:any){
    return _ProfileReducer(state,action)
    
}

//----------------------------------------------------

export const initialState:Users[] = [];

const _postReducer = createReducer(
    initialState,
    on(retrievepostSuccess,(state,{allusers})=>{
        return [...allusers]
    })
)

export function postReducer(state:any,action:any){
    return _postReducer(state,action);
}