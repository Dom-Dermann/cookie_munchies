export interface User {
    _id: string, 
    first_name: string,
    last_name: string,
    gender?:string,
    email: string, 
    isAdmin: Boolean,
    ownsList: string
}