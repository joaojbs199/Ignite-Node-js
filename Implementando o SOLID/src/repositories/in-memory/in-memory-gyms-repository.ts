import { IGymsRepository } from '@/repositories/gyms-repository';
import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

export class InMemoryGymsRepository implements IGymsRepository {
  items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }
}
