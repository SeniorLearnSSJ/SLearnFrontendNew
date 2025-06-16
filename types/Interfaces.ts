
import {
    UserRole,
    MemberBulletinCategory,
} from './Enums';
import {ReactNode } from "react";
/*  Use Interfaces for defining object shape (model, props, data objects)
    Use Types for complex types like unions types, tuples, working with primitives
    Union type = a value that can be one of several types
*/

export interface IUserDetails {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    memberSince: Date;
    role: UserRole;
}

export interface IUserSettings {
    id: string;
    fontSize: string;
    darkMode: boolean;
    enableNotifications: boolean;
}

export interface IMemberBulletin {
    id: string;
    title: string;
    content: string;
    category: MemberBulletinCategory;
    createdById: string;
    createdByUsername: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOfficialBulletin {
    id: string;
    title: string;
    content: string;
    createdById: string;
    createdByUsername: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthContextType{
    token: string |null;
    setToken: (token:string | null) => void;
    login:(username:string, password:string)=>Promise<boolean>;
    logout:()=>void;
    role:"Administrator" | "Member" | null;
    setRole: (role:"Administrator" | "Member" | null) =>void;
    username: string | null;
    setUsername: (setusername: string | null) => void;
    userId: string | null;
    setUserId:(userId: string | null) => void;
}

export interface FontContextType {
    fontSize: number;
    setFontSize: (fontSize: number) => void;
}

export interface FontSizeProviderProps {
    children:ReactNode;
}

export interface RegisterData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

//export interface GlobalContextType 
