import nodemailer, { Transporter } from 'nodemailer';


interface IAttachment {
  filename: string;
  path: string;
}

export interface ISendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: IAttachment[];
}

export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerSecretKey: string
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey
      }
    });
  }

  async sendMail(options: ISendMailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const emailOptions = {
        // from: `Thouma. ${this.mailerEmail}`,
        to,
        subject,
        html: htmlBody,
        attachments: attachments
      }

      const sendInformation = await this.transporter.sendMail(emailOptions);

      console.log(sendInformation);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}