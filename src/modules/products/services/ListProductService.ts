import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductsRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(
            'sales-api-PRODUCT_LIST'
        );

        if (!products) {
            let products = await productRepository.find();

            await redisCache.save('sales-api-PRODUCT_LIST', products);
        }

        return products!;
    }
}

export default ListProductService;
