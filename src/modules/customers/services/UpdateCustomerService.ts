import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) {}

    public async execute({
        id,
        email,
        name,
    }: IUpdateCustomer): Promise<ICustomer> {
        const customer = await this.customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const emailAlreadyExists = await this.customersRepository.findByEmail(
            email
        );

        if (emailAlreadyExists && email !== customer.email) {
            throw new AppError('Email already exists with other custumer');
        }

        customer.email = email;
        customer.name = name;

        await this.customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
