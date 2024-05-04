import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { IStudentsRepository } from '../repositories/students-repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { StudentAlreadyExistError } from './errors/student-already-exists-error';

interface IRegisterStudentUseCaseParams {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistError,
  {
    student: Student;
  }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: IStudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async handle({
    name,
    email,
    password,
  }: IRegisterStudentUseCaseParams): Promise<RegisterStudentUseCaseResponse> {
    const existEmail = await this.studentsRepository.findByEmail(email);

    if (existEmail) {
      return left(new StudentAlreadyExistError(email));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    const student = Student.create({
      name,
      email,
      password: passwordHash,
    });

    await this.studentsRepository.create(student);

    return right({
      student,
    });
  }
}
