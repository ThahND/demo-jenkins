import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from 'typeorm';
import { AccountStatusEnum, UsersRoleEnum } from '../constants/constants.users';

@Entity({ name: 'users' })
@Index(['id'])
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true, type: 'enum', enum: UsersRoleEnum }) // co the loai bo
  role: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true, type: 'text' })
  avatar: string;

  @Column({
    nullable: true,
    enum: AccountStatusEnum,
    default: AccountStatusEnum.ACTIVE,
    type: 'enum',
  })
  accountStatus: string;

  @Column({ nullable: true, type: 'json', select: false })
  token: any;

  @Column({ nullable: true, type: 'timestamp' })
  lastActi: Date;

  @Column({ nullable: false, type: 'boolean', default: false })
  df: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
