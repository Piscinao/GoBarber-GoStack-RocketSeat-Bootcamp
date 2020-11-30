import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  // Promise -- envio de email demora - conseguir aguardar o email ser enviado
  sendMail(data: ISendMailDTO): Promise<void>;
}
