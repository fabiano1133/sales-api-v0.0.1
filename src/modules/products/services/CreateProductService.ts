import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const productAlreadyExists = await productsRepository.findByName(name);

        const redisCache = new RedisCache();

        if (productAlreadyExists) {
            throw new AppError('Product name already exists!');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('sales-api-PRODUCT_LIST');

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
