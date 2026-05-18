import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


async function sayalawan(recipient,){
    const mail = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GMAIL,
            pass:process.env.PASSGMAIL
        }
        
    })

    await mail.sendMail({
        from: `PT MENCARI CINTA SEJATI <${process.env.GMAIL}> `,
        to: recipient,
        subject:"MOSI MOSI NIH MAS KODENYA",
        html:`<h1>WOY MABAR AYO</h1>`
    })
    console.log(process.env.PASSGMAIL);

}

export default sayalawan;