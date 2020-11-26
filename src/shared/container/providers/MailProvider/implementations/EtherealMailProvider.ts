import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  // public async sendMail({
  //   to,
  //   from,
  //   subject,
  //   templateData,
  // }: ISendMailDTO): Promise<void> {
  //   const message = await this.client.sendMail({
  //     from: {
  //       name: from?.name || 'Equipe GoBarber',
  //       address: from?.email || 'equipe@gobarber.com.br',
  //     },
  //     to: {
  //       name: to.name,
  //       address: to.email,
  //     },
  //     subject,
  //     html: await this.mailTemplateProvider.parse(templateData),
  //   });

  //   console.log('Message sent: %s', message.messageId);
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  // }
  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
