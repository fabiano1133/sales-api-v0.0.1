import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create two user with  the same email', async () => {
        await createUserService.execute({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
            password: '123456',
        });

        expect(
            createUserService.execute({
                name: 'Fabiano Albuquerque',
                email: 'fabiano.santos0@icloud.com.br',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
