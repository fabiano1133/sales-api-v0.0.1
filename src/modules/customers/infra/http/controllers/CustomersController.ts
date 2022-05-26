import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CustomersController {
    public async list(req: Request, res: Response): Promise<Response> {
        const listCustomerService = container.resolve(ListCustomerService);

        const customers = await listCustomerService.execute();

        return res.json(customers);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;

        const createCustomerService = container.resolve(CreateCustomerService);

        const customer = await createCustomerService.execute({
            name,
            email,
        });

        return res.json(customer);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const { name, email } = req.body;

        const updateCustomerService = container.resolve(UpdateCustomerService);

        const customer = await updateCustomerService.execute({
            id,
            name,
            email,
        });

        return res.json(customer);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showCustomerService = container.resolve(ShowCustomerService);

        const customer = await showCustomerService.execute({ id });

        return res.json(customer);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteCustomerService = container.resolve(DeleteCustomerService);

        await deleteCustomerService.execute({ id });

        return res.status(200).json({ message: `Customer ${id} has been deleted` });
    }
}

export default CustomersController;
