import { EntityRepository, In, Repository } from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IFindProducts {
    id: string;
}

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.findOne({
            where: {
                name,
            },
        });
        return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id);

        const existsProducts = await this.find({
            where: {
                id: In(productsIds),
            },
        });

        return existsProducts;
    }
}

export default ProductsRepository;