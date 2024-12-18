import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { EventParticipant } from './event-participant.entity';

export enum EventStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  location: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column()
  max_participants: number;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.UPCOMING
  })
  status: EventStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  is_active: boolean;

  // Relations
  @ManyToOne(() => User, user => user.organized_events)
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @Column()
  organizer_id: string;

  @OneToMany(() => EventParticipant, participant => participant.event)
  participants: EventParticipant[];
}
