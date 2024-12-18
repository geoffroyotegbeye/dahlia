import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';
import { Event } from '../entities/event.entity';
import { Donation } from '../entities/donation.entity';
import { Campaign } from '../entities/campaign.entity';
import { Volunteer } from '../entities/volunteer.entity';
import { Gallery } from '../entities/gallery.entity';
import { NewsletterSubscriber } from '../entities/newsletter-subscriber.entity';
import { Contact } from '../entities/contact.entity';
import { EventParticipant } from '../entities/event-participant.entity';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Article,
    Event,
    Donation,
    Campaign,
    Volunteer,
    Gallery,
    NewsletterSubscriber,
    Contact,
    EventParticipant,
  ],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
