import { Users } from "./types/user.types";
import { profile } from "./types/user.types";

export interface appProfile{
    userdetails:profile
}

export interface appUsers{
    allusers:Users[]
}