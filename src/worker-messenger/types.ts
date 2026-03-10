import type { DistributiveOmit } from "@/types";

export type WorkerMessage<P = unknown> = {
  id: string;
} & (unknown extends P ? { payload?: P } : undefined extends P ? { payload?: P } : { payload: P });

export type WorkerRequest<T extends string = string, P = unknown> = {
  type: T;
} & WorkerMessage<P>;

export type WorkerResponse<
  T extends string = string,
  P = unknown,
  E extends Error = Error
> = WorkerResponseSuccess<T, P> | WorkerResponseError<T, E>;

export type WorkerResponseSuccess<T extends string = string, P = unknown> = {
  type: T;
  status: "success";
} & WorkerMessage<P>;

export type WorkerResponseError<T extends string = string, E extends Error = Error> = {
  type: T;
  status: "error";
} & WorkerMessage<E>;

export type WorkerResponseStatus = "success" | "error";

export type WorkerRequestData<R extends WorkerRequest> = DistributiveOmit<R, "id">;
export type WorkerResponseData<R extends WorkerRequest> = DistributiveOmit<R, "id" | "type">;
