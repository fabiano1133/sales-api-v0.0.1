import User from '@modules/users/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUserPaginate } from '../../models/IUserPaginate';
import { IUsersRepository } from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUsers => findUsers.id === user.id);

        this.users[findIndex] = user;

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    public async findByName(name: string): Promise<User | undefined> {
        const user = this.users.find(user => user.name === name);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async remove(user: User): Promise<void> {}

    public async findAllPaginate(page: number): Promise<IUserPaginate | undefined> {
        return undefined;
    }
}

export default FakeUsersRepository;