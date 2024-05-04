import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface IInstructorParams {
  name: string;
}

export class Instructor extends Entity<IInstructorParams> {
  static create(params: IInstructorParams, id?: UniqueEntityID) {
    const instructor = new Instructor(params, id);

    return instructor;
  }
}
