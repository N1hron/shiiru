export type SerializedCustomError = {
  name: string;
  message: string;
};

export type SerializedCustomErrorWithType<T extends string> = SerializedCustomError & { type: T };
