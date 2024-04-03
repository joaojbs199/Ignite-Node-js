import {
  ResourceNotFoundError,
  TestError,
} from './errors/errors/resource-not-found-error'

// Error result class
export class Left<L, R> {
  value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  isRight(): this is Right<L, R> {
    return false
  }
}

// Success result class
export class Right<L, R> {
  value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

// Type define Error result OR Success result
export type Either<L, R> = Left<L, R> | Right<L, R>

// Functions to return result class
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
