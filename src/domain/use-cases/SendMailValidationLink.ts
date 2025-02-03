import { JwtAdapter } from "../../config/jwt.adapter";
import { EmailService } from "../../services/email.service";
import { CustomError } from "../errors/custom.error";

export class sendMailValidationLink {

  constructor(
    private readonly emailService: EmailService,
  ) {}

  async send(email: string ) {

    // Generar un token
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error generating token');

    const link = `http://localhost:3000/api/auth/validate-email/${token}`;

    // html
    const html = `
      <h1>Valida tu correo</h1>
      <p>Para validar tu correo da click en el siguiente enlace</p>
      <a href="${link}">Valida tu correo: ${email}</a>
    `;

    // Options
    const options = {
      to: email,
      subject: 'Valida tu correo',
      htmlBody: html
    }

    // Validar si se envió el correo
    const isSend = await this.emailService.sendMail(options);
    if (!isSend) throw CustomError.internalServer('Error sending email');

    return true;
  }
}