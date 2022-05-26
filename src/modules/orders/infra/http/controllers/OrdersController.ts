import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';

class OrdersController {
    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showOrderService = new ShowOrderService();

        const order = await showOrderService.execute({ id });

        return res.json(order);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { customer_id, products } = req.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            customer_id,
            products,
        });

        return res.json(order);
    }
}

export default OrdersController;
