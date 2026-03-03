export type WorkerRequest<
  T extends string = string,
  P = unknown
> = WorkerMessage<T, P>;

export type WorkerResponse<
  S extends WorkerResponseStatus = WorkerResponseStatus,
  T extends string = string,
  P = unknown
> = WorkerMessage<T, P> & { status: S };

export type WorkerResponseStatus = "success" | "error";
export type WorkerResponseSuccess<T extends string = string, P = unknown> = WorkerResponse<"success", T, P>;
export type WorkerResponseError<T extends string = string, P = unknown> = WorkerResponse<"error", T, P>;

export type WorkerMessageData<M extends WorkerMessage> = Omit<M, "id">;

export type WorkerMessage<T extends string = string, P = unknown> = {
  id: string;
  type: T;
  payload: P;
};

export type WorkerResponsePayload<
  Req extends WorkerRequest,
  Res extends WorkerResponseSuccess | WorkerResponseError
> = Extract<Res, { type: Req["type"] }>["payload"];
