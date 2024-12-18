import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum VolunteerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

@Entity('volunteers')
export class Volunteer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  skills: string[];

  @Column('json')
  availability: object;

  @Column('simple-array')
  areas_of_interest: string[];

  @Column()
  experience_level: string;

  @Column({
    type: 'enum',
    enum: VolunteerStatus,
    default: VolunteerStatus.ACTIVE
  })
  status: VolunteerStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => User, user => user.volunteer_profiles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
}
