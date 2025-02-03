import { Router } from "express";
import { envs } from "../../config/envs";
import { sendMailValidationLink } from "../../domain/use-cases/SendMailValidationLink";
import { AuthService } from "../../services/auth.service";
import { EmailService } from "../../services/email.service";
import { AuthController } from "./controllers";

export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );

    const sendMailValidation = new sendMailValidationLink(emailService);

    const authService = new AuthService(sendMailValidation);

    const controller = new AuthController(authService);

    // Definir las rutas
    router.post('/login', controller.loginUser );

    router.post('/register', controller.register );

    router.get('/validate-email/:token', controller.validaEmail );

    return router;
  }

}