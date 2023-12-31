import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
    id: string;
    email:string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
  };

  export interface UserModel extends Model<TUser>{
    // eslint-disable-next-line no-unused-vars
    isUserExistsByCustomId(id:string):Promise<TUser>
  }

export type TUserRole = keyof typeof USER_ROLE
