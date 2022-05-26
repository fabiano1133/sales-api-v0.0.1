import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';

@Entity('users')
class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarURL(): string | null {
        if (!this.avatar) {
            return null;
        }
        return `${process.env.APP_WEB_URL}/files/${this.avatar}`;
    }

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default User;
