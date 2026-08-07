const authres = (token, userid, username, role, status , res) =>{
    const template = {
        users:{
          userId:userid,
          username:username,
          role:role,
        },
        token:token,
        status:status
    }

    res.send(template)
}

export default authres
