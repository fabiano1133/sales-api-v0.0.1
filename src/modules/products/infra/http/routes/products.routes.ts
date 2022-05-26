import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { bodyFieldValidation } from '@modules/products/infra/http/middlewares/bodyFieldValidation';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { paramsIdValidation } from '../middlewares/paramsIdValidation';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/', isAuthenticated, productsController.list);

productsRouter.get('/:id', isAuthenticated, paramsIdValidation, productsController.show);

productsRouter.post('/', bodyFieldValidation, isAuthenticated, productsController.create);

productsRouter.put(
    '/:id',
    bodyFieldValidation,
    isAuthenticated,
    productsController.update
);

productsRouter.delete(
    '/:id',
    paramsIdValidation,
    isAuthenticated,
    productsController.delete
);

export default productsRouter;
