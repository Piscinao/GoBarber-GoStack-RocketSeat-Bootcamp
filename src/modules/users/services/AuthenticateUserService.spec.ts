import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    // salva na memoria pois chama o repositorio fake diretamente

    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    });

    // espera que resposta contenha o token
    expect(response).toHaveProperty('token');
    // a resposta seja igual ao usuario criado
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    // espera que resposta contenha o token
    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // a resposta seja igual ao usuario criado
  });

  it('should be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
