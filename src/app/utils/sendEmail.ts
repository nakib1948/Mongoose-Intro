import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async(to:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "hossainhayat18@gmail.com",
          pass: "ultd ehhh wsdm bypr",
        },
      });
      await transporter.sendMail({
        from: 'hossainhayat18@gmail.com', // sender address
        to, // list of receivers
        subject: "Change your password", // Subject line
        text: "Reset your password within 10 mins", // plain text body
        html, // html body
      });
}