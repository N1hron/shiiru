export class MessengerInactiveError extends Error {
  constructor(...args: ConstructorParameters<ErrorConstructor>) {
    super(...args);
    this.name = this.constructor.name;
  }
}
