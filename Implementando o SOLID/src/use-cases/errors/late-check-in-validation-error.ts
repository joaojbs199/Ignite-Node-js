export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check in must be validated within 20 minutes of creation.');
  }
}
