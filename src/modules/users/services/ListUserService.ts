import { inject, injectable } from 'tsyringe';
import { IUserPaginate } from '../domain/models/IUserPaginate';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute(limit: number): Promise<IUserPaginate | undefined> {
        const users = this.usersRepository.findAllPaginate(limit);

        return users;
    }
}

export default ListUserService;
