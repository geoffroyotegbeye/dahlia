import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

export enum ParticipationStatus {
  REGISTERED = 'REGISTERED',
  ATTENDED = 'ATTENDED',
  CANCELLED = 'CANCELLED'
}

@Entity('event_participants')
export class EventParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ParticipationStatus,
    default: ParticipationStatus.REGISTERED
  })
  status: ParticipationStatus;

  @CreateDateColumn()
  registration_date: Date;

  // Relations
  @ManyToOne(() => Event, event => event.participants)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  event_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
}
