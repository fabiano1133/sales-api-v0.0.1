import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ user_id }: IShowUserProfile): Promise<IUser> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(`User ${user_id} not found`);
        }

        return user;
    }
}

export default ShowUserProfileService;
