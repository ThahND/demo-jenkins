import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  findUserByID = async (id: string) => {
    return await this.findOne({ where: { id } });
  };

  createUser = async (data: any) => {
    return await this.save(data);
  };

  updateUserByID = async (id: string, data: any) => {
    return await this.save({ ...data, id });
  };

  deleteUserByID = async (id: string) => {
    return await this.delete({ id, df: false });
  };
}
