export type WorkerMessage<P = unknown> = {
  id: string;
} & (unknown extends P ? { payload?: P } : { payload: P });

export type WorkerRequest<T extends string = string, P = unknown> = {
  type: T;
} & WorkerMessage<P>;

export type WorkerResponse<
  P = unknown,
  E extends Error = Error
> = WorkerResponseSuccess<P> | WorkerResponseError<E>;

export type WorkerResponseSuccess<P = unknown> = {
  status: "success";
} & WorkerMessage<P>;

export type WorkerResponseError<E extends Error = Error> = {
  status: "error";
} & WorkerMessage<E>;

export type WorkerResponseStatus = "success" | "error";
export type WorkerMessageData<M extends WorkerMessage> = Omit<M, "id">;
