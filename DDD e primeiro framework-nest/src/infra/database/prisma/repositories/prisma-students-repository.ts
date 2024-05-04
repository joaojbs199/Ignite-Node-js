import { IStudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';

@Injectable()
export class PrismaStudentsRepository implements IStudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPersistence(student);

    await this.prisma.user.create({
      data,
    });
  }
}