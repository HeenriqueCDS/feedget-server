import nodemailer from 'nodemailer'
import { MailService, SendMailDTO } from "../mail-service";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3a8a8cf2531694",
      pass: "d1a5287e033ef2"
    }
  });

export class NodemailerMailService implements MailService {
    async sendMail({body, subject}: SendMailDTO) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Henrique <heenriquecds@gmail.com>',
            subject,
            html: body,
        })
    };
    
}