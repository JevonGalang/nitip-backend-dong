export function response(message, status, res){
    const template = {
        message:message[0],
        status:status
    }

    res.send(template)
    console.log(template)
}

