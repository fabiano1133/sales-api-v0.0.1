import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);
        const ordersRepository = getCustomRepository(OrdersRepository);

        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError(`Customer not found!`);
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError(`Product not found`);
        }

        const existProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existProductsIds.includes(product.id)
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Product ${checkInexistentProducts[0].id} not found`
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updateProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0]
                    .quantity - product.quantity,
        }));

        await productsRepository.save(updateProductQuantity);

        return order;
    }
}

export default CreateOrderService;
