import { IUserToken } from '../models/IUserToken';

export interface IUsersTokensRepository {
    findByToken(token: string): Promise<IUserToken | undefined>;
    generate(user_id: string): Promise<IUserToken>;
    deleteById(id: string): Promise<void>;
}
