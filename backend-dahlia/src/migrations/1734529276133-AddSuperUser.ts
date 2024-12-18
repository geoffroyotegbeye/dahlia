import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migration1734529276133 implements MigrationInterface {
    name = 'Migration1734529276133';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = await bcrypt.hash('admin123', 10);
        
        await queryRunner.query(`
            INSERT INTO "users" (
                "email",
                "password_hash",
                "first_name",
                "last_name",
                "role",
                "phone_number",
                "is_active"
            ) VALUES (
                'admin@dahlia.com',
                '${passwordHash}',
                'Super',
                'Admin',
                'ADMIN',
                '+1234567890',
                true
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" WHERE "email" = 'admin@dahlia.com';
        `);
    }
}
