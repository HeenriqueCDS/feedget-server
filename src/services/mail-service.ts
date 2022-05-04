export interface SendMailDTO {
    subject: string;
    body: string;
}

export interface MailService {
    sendMail: (data: SendMailDTO) => Promise<void>;    
}