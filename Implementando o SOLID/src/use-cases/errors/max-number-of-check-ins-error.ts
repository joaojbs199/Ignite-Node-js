export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('MAx number of check-ins reached.');
  }
}
