import User from '@modules/users/infra/typeorm/entities/User';

export interface IUserPaginate {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: User[];
}
