import { createAction,props } from '@ngrx/store';
import { Users, profile } from './types/user.types';


export const retrieveprofile = createAction('[profile API]API success');
export const retrieveprofileSuccess = createAction('[profile API]API SuccessSuccess',
props<{userdetails:profile}>()
);

export const retrievepost = createAction('[post API]API success');
export const retrievepostSuccess = createAction('[post API]API SuccessSuccess',
props<{allusers: Users[]}>()
);
