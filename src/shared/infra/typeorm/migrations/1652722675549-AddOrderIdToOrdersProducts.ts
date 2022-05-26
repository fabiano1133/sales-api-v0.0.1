import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import uuid from 'uuid';

export class AddOrderIdToOrdersProducts1652722675549 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,
                default: uuid,
            })
        );

        await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
                name: 'OrdersProductsOrder',
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
        await queryRunner.dropColumn('orders_products', 'order_id');
    }
}
