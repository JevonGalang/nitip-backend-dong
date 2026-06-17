export function response(message, status, res, token = "none"){
    const template = {
        message:message,
        status:status,
        token:token
    }

    res.send(template)
    console.log(template)
}

