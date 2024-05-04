import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Params> {
  private _id: UniqueEntityID;
  protected params: Params;

  get id() {
    return this._id;
  }

  protected constructor(params: Params, id?: UniqueEntityID) {
    this.params = params;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
