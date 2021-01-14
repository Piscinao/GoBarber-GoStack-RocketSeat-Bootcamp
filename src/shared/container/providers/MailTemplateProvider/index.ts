import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplatePovider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

// quando usa o registersingleton ele não utiliza o constructor cda classe e tava criando de uma utra forma
container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  // container resolve ele q faz a injeção de dependcia ele q vai ver se o constructor tem os injectable
  providers.handlebars,
);
