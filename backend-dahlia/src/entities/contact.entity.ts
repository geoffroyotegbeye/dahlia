import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ContactStatus {
  NEW = 'NEW',
  READ = 'READ',
  REPLIED = 'REPLIED'
}

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  subject: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: ContactStatus,
    default: ContactStatus.NEW
  })
  status: ContactStatus;

  @CreateDateColumn()
  created_at: Date;
}
