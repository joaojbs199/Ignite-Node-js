export abstract class ValueObject<Params> {
  protected params: Params;

  protected constructor(params: Params) {
    this.params = params;
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.params === undefined) {
      return false;
    }

    return JSON.stringify(vo.params) === JSON.stringify(this.params);
  }
}
