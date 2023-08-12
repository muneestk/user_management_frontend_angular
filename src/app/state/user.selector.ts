import { createSelector } from '@ngrx/store';
import { appProfile , appUsers } from './user.state';
import { profile, Users } from './types/user.types';

export const profileRootSelector = (state:appProfile)=>state.userdetails;
export const userProfile = createSelector(
    profileRootSelector,
    (userdetails:profile)=>{
        return userdetails
    }
)

export const userRootSelector = (state:appUsers)=>state.allusers;
export const uniqueEmail = createSelector(
    userRootSelector,
    (allusers:Users[])=>{
        return [...allusers]
    }
)