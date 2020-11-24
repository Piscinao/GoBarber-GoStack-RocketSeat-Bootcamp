import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider/models/IMailProvider';
// toda a vez q aplicação precisar de um storageprovider vou falar para usar o disk provider
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
