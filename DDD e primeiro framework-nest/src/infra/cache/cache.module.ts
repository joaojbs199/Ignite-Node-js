import { Module } from '@nestjs/common';
import { EnvModule } from '@/infra/env/env.module';
import { RedisCacheRepository } from './redis/redis-cache-repository';
import { ICacheRepository } from './cache-repository';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: ICacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [ICacheRepository],
})
export class CacheModule {}
