import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { Event } from './event.entity';
import { Donation } from './donation.entity';
import { Volunteer } from './volunteer.entity';
import { Gallery } from './gallery.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VOLUNTEER = 'VOLUNTEER'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  is_active: boolean;

  // Relations
  @OneToMany(() => Article, article => article.author)
  articles: Article[];

  @OneToMany(() => Event, event => event.organizer)
  organized_events: Event[];

  @OneToMany(() => Donation, donation => donation.donor)
  donations: Donation[];

  @OneToMany(() => Gallery, gallery => gallery.uploaded_by)
  gallery_uploads: Gallery[];

  @OneToMany(() => Volunteer, volunteer => volunteer.user)
  volunteer_profiles: Volunteer[];
}
