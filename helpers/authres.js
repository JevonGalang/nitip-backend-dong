const authres = (token, userid, username, status , res) =>{
    const template = {
        users:{
          userId:userid,
          username:username,
        },
        token:token,
        status:status
    }

    res.send(template)
}

export default authres