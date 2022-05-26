import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
    id?: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductsRepository);

        const product = await productRepository.findOne(id);
        const productAlreadyExists = await productRepository.findByName(name);

        if (!product) {
            throw new AppError('Product not found!');
        }
        if (productAlreadyExists && name !== product.name) {
            throw new AppError('Product already exists!');
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('sales-api-PRODUCT_LIST');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
