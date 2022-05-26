import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';

class ProductsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            quantity,
        });
        return res.json(product);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const listProductService = new ListProductService();

        const products = await listProductService.execute();

        return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showProductService = new ShowProductService();

        const showProduct = await showProductService.execute({ id });

        return res.json(showProduct);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;

        const { id } = req.params;

        const updateProductService = new UpdateProductService();

        const updateProduct = await updateProductService.execute({
            id,
            name,
            price,
            quantity,
        });

        return res.json(updateProduct);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteProductService = new DeleteProductService();

        await deleteProductService.execute({ id });

        return res.status(204).send();
    }
}

export default ProductsController;
