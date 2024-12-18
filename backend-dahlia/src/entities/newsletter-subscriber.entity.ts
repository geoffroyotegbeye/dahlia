import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum SubscriberStatus {
  ACTIVE = 'ACTIVE',
  UNSUBSCRIBED = 'UNSUBSCRIBED'
}

@Entity('newsletter_subscribers')
export class NewsletterSubscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: SubscriberStatus,
    default: SubscriberStatus.ACTIVE
  })
  status: SubscriberStatus;

  @CreateDateColumn()
  subscribed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  unsubscribed_at: Date;
}
