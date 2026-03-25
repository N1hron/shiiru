export type SerializedCustomError<T extends string> = {
  type: T;
  name: string;
  message: string;
};

export class CustomError<T extends string> extends Error {
  type: T;

  constructor(type: T, ...rest: ConstructorParameters<typeof Error>) {
    super(...rest);
    this.type = type;
    this.name = this.constructor.name;
  }

  serialize(): SerializedCustomError<T> {
    return {
      type: this.type,
      name: this.name,
      message: this.message
    };
  }

  static deserialize<
    T extends string,
    C extends typeof CustomError<T>
  >(
    this: C,
    serialized: SerializedCustomError<T>
  ): InstanceType<C> {
    return new this(serialized.type, serialized.message) as InstanceType<C>;
  }
}
