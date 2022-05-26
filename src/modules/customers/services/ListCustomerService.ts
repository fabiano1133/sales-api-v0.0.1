import { inject, injectable } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) {}

    public async execute(): Promise<ICustomerPaginate | undefined> {
        const page = 5;

        const customers = await this.customersRepository.findAllPaginate(page);

        return customers;
    }
}

export default ListCustomerService;
