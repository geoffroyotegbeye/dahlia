import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  // Relations
  @ManyToOne(() => Event, { nullable: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ nullable: true })
  event_id: string;

  @ManyToOne(() => User, user => user.gallery_uploads)
  @JoinColumn({ name: 'uploaded_by' })
  uploaded_by: User;

  @Column()
  uploaded_by_id: string;
}
