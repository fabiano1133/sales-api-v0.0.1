import { bodyFieldValidation } from '@modules/customers/infra/http/middlewares/bodyFieldValidation';
import { paramsIdValidation } from '@modules/customers/infra/http/middlewares/paramsIdValidation';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';

const customerRouter = Router();

const customersController = new CustomersController();

customerRouter.use(isAuthenticated);

customerRouter.get('/', customersController.list);
customerRouter.post('/', bodyFieldValidation, customersController.create);
customerRouter.get('/:id', paramsIdValidation, customersController.show);
customerRouter.put('/:id', bodyFieldValidation, customersController.update);
customerRouter.delete('/:id', paramsIdValidation, customersController.delete);

export default customerRouter;
