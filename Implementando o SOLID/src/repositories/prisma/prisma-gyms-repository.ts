import { prisma } from '@/lib/prisma';
import { IFindManyNearbyParams, IGymsRepository } from '@/repositories/gyms-repository';
import { Gym, Prisma } from '@prisma/client';

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`SELECT * 
      FROM gyms
      WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) <= 10
    `;

    return gyms;
  }
}
