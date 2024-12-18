import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Campaign } from './campaign.entity';

export enum DonationStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.PENDING
  })
  status: DonationStatus;

  @Column()
  payment_method: string;

  @Column({ nullable: true })
  transaction_id: string;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => User, user => user.donations, { nullable: true })
  @JoinColumn({ name: 'donor_id' })
  donor: User;

  @Column({ nullable: true })
  donor_id: string;

  @ManyToOne(() => Campaign, campaign => campaign.donations)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @Column()
  campaign_id: string;
}
