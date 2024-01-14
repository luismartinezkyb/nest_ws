import { Inject, Injectable } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { sleep } from './utils/sleep';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

const KEY_USERS_CACHE = 'users-find-all'

@Injectable()
export class RedisService {
  private users = [
    {
      id: '1',
      name: 'Luis',
    },
    {
      id: '2',
      name: 'New_name',
    },
    {
      id: '3',
      name: 'Ramón',
    },
    {
      id: '4',
      name: 'Martinez',
    },
  ];

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  create(createRediDto: CreateRediDto) {
    return 'This action adds a new redi';
  }

  async findAll() {
    const usersCached = await this.cacheManager.get(KEY_USERS_CACHE);
    if (usersCached) return usersCached;
    await sleep(2000);
    await this.cacheManager.set(KEY_USERS_CACHE, this.users, 1000 * 30);
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} redi`;
  }

  update(id: number, updateRediDto: UpdateRediDto) {
    return `This action updates a #${id} redi`;
  }

  remove(id: number) {
    return `This action removes a #${id} redi`;
  }
}
