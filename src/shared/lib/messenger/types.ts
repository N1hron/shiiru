export type Message<P = unknown> = {
  id: string;
} & (unknown extends P ? { payload?: P } : undefined extends P ? { payload?: P } : { payload: P });

export type Request<T extends string = string, P = unknown> = {
  type: T;
} & Message<P>;

export type Response<
  T extends string = string,
  P = unknown,
  E extends Error = Error
> = ResponseSuccess<T, P> | ResponseError<T, E>;

export type ResponseSuccess<T extends string = string, P = unknown> = {
  type: T;
  status: "success";
} & Message<P>;

export type ResponseError<T extends string = string, E extends Error = Error> = {
  type: T;
  status: "error";
} & Message<E>;

export type ResponseStatus = "success" | "error";
