import { CustomError } from "../custom-error";

export type MessengerErrorType = "inactive";

export class MessengerError extends CustomError<MessengerErrorType> {
}
