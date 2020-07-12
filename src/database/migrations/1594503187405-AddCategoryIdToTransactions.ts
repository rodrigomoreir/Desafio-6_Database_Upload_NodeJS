import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCategoryIdToTransactions1594503187405
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['category_id'], // o nome que será dado na coluna de transactions
        referencedColumnNames: ['id'], // o nome da coluna referencia da tabela de categorias
        referencedTableName: 'categories',
        name: 'TransactionCategory',
        onUpdate: 'CASCADE', // atualizar em uma ja atualiza em outra
        onDelete: 'SET NULL', // seta como nulo em caso de deletar algum item.
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');
    await queryRunner.dropColumn('transactions', 'category_id');
  }
}
