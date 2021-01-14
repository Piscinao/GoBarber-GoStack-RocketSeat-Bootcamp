import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

// quando usa o registersingleton ele não utiliza o constructor cda classe e tava criando de uma utra forma
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  // container resolve ele q faz a injeção de dependcia ele q vai ver se o constructor tem os injectable
  providers.disk,
);
