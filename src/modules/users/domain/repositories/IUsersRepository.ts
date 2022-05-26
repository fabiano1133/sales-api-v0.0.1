import { ICreateUser } from '../models/ICreateUser';
import { IDeleteUser } from '../models/IDeleteUser';
import { IUser } from '../models/IUser';
import { IUserPaginate } from '../models/IUserPaginate';

export interface IUsersRepository {
    findByName(name: string): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    create(data: ICreateUser): Promise<IUser>;
    save(user: ICreateUser): Promise<IUser>;
    remove(user: IDeleteUser): Promise<void>;
    findAllPaginate(limit: number): Promise<IUserPaginate | undefined>;
}
