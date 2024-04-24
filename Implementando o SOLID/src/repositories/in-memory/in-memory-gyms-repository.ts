import { IGymsRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

export class InMemoryGymsRepository implements IGymsRepository {
  items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }
}
