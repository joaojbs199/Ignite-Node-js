import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IStudentParams {
  name: string
}

export class Student extends Entity<IStudentParams> {
  static create(params: IStudentParams, id?: UniqueEntityID) {
    const student = new Student(params, id)

    return student
  }
}
