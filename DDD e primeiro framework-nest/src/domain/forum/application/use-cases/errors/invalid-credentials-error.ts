import { UserCaseError } from '@/core/errors/use-case-error';

export class InvalidCredentialsError extends Error implements UserCaseError {
  constructor() {
    super('Invalid credentials.');
  }
}
