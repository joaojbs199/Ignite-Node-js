import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IStudentParams, Student } from '@/domain/forum/enterprise/entities/student';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaStudentMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper';

export const makeStudent = (override: Partial<IStudentParams> = {}, id?: UniqueEntityID) => {
  const question = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return question;
};

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<IStudentParams> = {}): Promise<Student> {
    const student = makeStudent(data);

    await this.prisma.user.create({
      data: PrismaStudentMapper.toPersistence(student),
    });

    return student;
  }
}
