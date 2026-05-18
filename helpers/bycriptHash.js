import bcrypt from "bcrypt";

export function hash(password,salt){
   const resaultHash = bcrypt.hash(password,salt);

   if (resaultHash){
        return resaultHash
   } else{
    return false
   }
   
}