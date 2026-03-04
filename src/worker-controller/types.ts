export type WorkerMessage<P = unknown> = {
  id: string;
} & (unknown extends P ? { payload?: P } : { payload: P });

export type WorkerRequest<T extends string = string, P = unknown> = {
  type: T;
} & WorkerMessage<P>;

export type WorkerResponse<S extends WorkerResponseStatus = WorkerResponseStatus, P = unknown> = {
  status: S;
} & WorkerMessage<P>;

export type WorkerResponseStatus = "success" | "error";

export type WorkerMessageData<M extends WorkerMessage> = Omit<M, "id">;
