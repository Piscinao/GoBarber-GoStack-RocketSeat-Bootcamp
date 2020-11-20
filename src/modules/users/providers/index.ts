import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// toda a vez que estiver um injeção com o nme hashprovider eu vou retornar uma instacia da classe bcrypthashprovider
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
