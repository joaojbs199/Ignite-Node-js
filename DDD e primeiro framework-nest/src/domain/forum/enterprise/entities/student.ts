import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface IStudentParams {
  name: string;
  email: string;
  password: string;
}

export class Student extends Entity<IStudentParams> {
  get name() {
    return this.params.name;
  }

  get email() {
    return this.params.email;
  }

  get password() {
    return this.params.password;
  }

  static create(params: IStudentParams, id?: UniqueEntityID) {
    const student = new Student(params, id);

    return student;
  }
}
