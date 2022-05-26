import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateCustomerService from '../services/CreateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';

let fakeRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {
    beforeEach(() => {
        fakeRepository = new FakeCustomersRepository();
        createCustomerService = new CreateCustomerService(fakeRepository);
    });
    it('should be able to create a new customer', async () => {
        const customer = await createCustomerService.execute({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
        });

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create two customer with  the same email', async () => {
        await createCustomerService.execute({
            name: 'Fabiano Albuquerque',
            email: 'fabiano.santos0@icloud.com.br',
        });

        expect(
            createCustomerService.execute({
                name: 'Fabiano Albuquerque',
                email: 'fabiano.santos0@icloud.com.br',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
