import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UsersTokensRepository implements IUsersTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: {
                token,
            },
        });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.ormRepository.create({
            user_id,
        });
        await this.ormRepository.save(userToken);

        return userToken;
    }

    public async deleteById(id: string): Promise<void> {
        await this.ormRepository.delete({
            id,
        });
    }
}

export default UsersTokensRepository;
