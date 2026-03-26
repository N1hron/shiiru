import type { SerializedCustomError, SerializedCustomErrorWithType } from "./types";

export class CustomError extends Error {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = this.constructor.name;
  }

  serialize(): SerializedCustomError {
    return {
      name: this.name,
      message: this.message
    };
  }

  static deserialize<C extends typeof CustomError>(
    this: C,
    serialized: SerializedCustomError
  ): InstanceType<C> {
    return new this(serialized.message) as InstanceType<C>;
  }
}

export class CustomErrorWithType<T extends string> extends Error {
  type: T;

  constructor(type: T, ...rest: ConstructorParameters<typeof Error>) {
    super(...rest);
    this.type = type;
    this.name = this.constructor.name;
  }

  serialize(): SerializedCustomErrorWithType<T> {
    return {
      type: this.type,
      name: this.name,
      message: this.message
    };
  }

  static deserialize<T extends string, C extends typeof CustomErrorWithType<T>>(
    this: C,
    serialized: SerializedCustomErrorWithType<T>
  ): InstanceType<C> {
    return new this(serialized.type, serialized.message) as InstanceType<C>;
  }
}
