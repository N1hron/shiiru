export type ExtractRequest<
  I extends Interaction,
  T extends string = string
> = Exclude<Extract<I, Request<T>>, Response<T>>;

export type ExtractResponse<
  I extends Interaction,
  T extends string = string,
  S extends ResponseStatus = ResponseStatus
> = Extract<I, Extract<Response<T>, { status: S }>>;

export type Interaction<
  T extends string = string,
  P = unknown,
  S = unknown,
  E extends Error = Error
> = Request<T, P> | Response<T, S, E>;

export type Request<
  T extends string = string,
  P = unknown
> = {
  id: string;
  type: T;
} & DynamicPayload<P>;

export type Response<
  T extends string = string,
  P = unknown,
  E extends Error = Error
> = ResponseSuccess<T, P> | ResponseError<T, E>;

export type ResponseSuccess<
  T extends string = string,
  P = unknown
> = {
  id: string;
  type: T;
  status: "success";
} & DynamicPayload<P>;

export type ResponseError<
  T extends string = string,
  E extends Error = Error
> = {
  id: string;
  type: T;
  status: "error";
} & DynamicPayload<E>;

export type ResponseStatus = "success" | "error";

type DynamicPayload<T = unknown> = (undefined extends T ? { payload?: T } : { payload: T });
