import { nanoid } from "@reduxjs/toolkit";

import type { WorkerMessage, WorkerMessageData } from "./types";

export function createWorkerMessage<M extends WorkerMessage>(data: WorkerMessageData<M>) {
  return { id: nanoid(), ...data } as M;
}
