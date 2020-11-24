export default interface IMailProvider {
  // Promise -- envio de email demora - conseguir aguardar o email ser enviado
  sendMail(to: string, body: string): Promise<void>;
}
