import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let createSessionService: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createSessionService = new CreateSessionService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });
    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
            password: '123456',
        });

        const response = await createSessionService.execute({
            email: 'fabiano.santos0@icloud.com.br',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with a email does not exists', async () => {
        expect(
            createSessionService.execute({
                email: 'alex.santos0@icloud.com.br',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
            password: '123456',
        });

        expect(
            createSessionService.execute({
                email: 'fabiano.santos0@icloud.com.br',
                password: '270891',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
