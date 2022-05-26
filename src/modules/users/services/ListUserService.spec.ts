import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUserService: ListUserService;

describe('ListUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listUserService = new ListUserService(fakeUsersRepository);
    });
    it('should be able to list all users', async () => {
        const user = await listUserService.execute(5);

        const response = await fakeUsersRepository.findAllPaginate(5);

        expect(response!).toEqual(user);
    });
});
