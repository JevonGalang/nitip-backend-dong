export function response(message, status, res){
    const template = {
        message:message,
        status:status
    }

    res.send(template)
    console.log(template)
}

