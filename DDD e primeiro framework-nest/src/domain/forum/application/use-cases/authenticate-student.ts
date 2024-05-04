import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { IStudentsRepository } from '../repositories/students-repository';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface IAuthenticateStudentUseCaseParams {
  email: string;
  password: string;
}

type AuthenticateStudentUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    token: string;
  }
>;

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: IStudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async handle({
    email,
    password,
  }: IAuthenticateStudentUseCaseParams): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      return left(new InvalidCredentialsError());
    }

    const doesPasswordMatches = await this.hashComparer.compare(password, student.password);

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError());
    }

    const token = await this.encrypter.encrypt({ sub: student.id.toString() });

    return right({
      token,
    });
  }
}
