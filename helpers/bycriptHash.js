import bcrypt from "bcrypt";
 
export function hash(password,salt = 10){
   const resaultHash = bcrypt.hash(password,salt);

   if (resaultHash){
        return resaultHash
   } else{
    return false
   }
   
}

export function compare(password, hashed){
   const resaultCompare = bcrypt.compare(password, hashed);
   return resaultCompare
}