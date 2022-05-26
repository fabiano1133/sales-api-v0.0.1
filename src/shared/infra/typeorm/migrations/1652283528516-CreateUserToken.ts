import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import uuid from 'uuid';

export class CreateUserToken1652283528516 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: uuid,
                    },
                    {
                        name: 'token',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        default: uuid,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'update_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'TokenUser',
                        referencedTableName: 'users', //Tabela a ser referenciada.
                        referencedColumnNames: ['id'], //Coluna a ser referenciada.
                        columnNames: ['user_id'], //Coluna desta tabela na qual será referenciada com a coluna id da tabela referenciada.
                        onDelete: 'CASCADE', //Deleção com efeito cascata.
                        onUpdate: 'CASCADE', //Atualização com efeito cascata.
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_tokens');
    }
}
