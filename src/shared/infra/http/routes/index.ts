import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customerRouter from '@modules/customers/infra/http/routes/customer.routes';
import ordersRouter from '@modules/orders/infra/http/routes/order.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
