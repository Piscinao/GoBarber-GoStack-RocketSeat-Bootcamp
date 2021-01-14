import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

// quando usa o registersingleton ele não utiliza o constructor cda classe e tava criando de uma utra forma
container.registerInstance<IMailProvider>(
  'MailProvider',
  // container resolve ele q faz a injeção de dependcia ele q vai ver se o constructor tem os injectable
  providers[mailConfig.driver],
);
