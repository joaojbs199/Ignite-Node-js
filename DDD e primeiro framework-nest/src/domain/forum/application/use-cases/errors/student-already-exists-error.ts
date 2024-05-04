import { UserCaseError } from '@/core/errors/use-case-error';

export class StudentAlreadyExistError extends Error implements UserCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already registered.`);
  }
}
