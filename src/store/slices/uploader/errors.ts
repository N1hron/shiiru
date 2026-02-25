export type SerializedUploaderError = {
  name: string;
  message: string;
  type: UploaderErrorType;
  file: UploaderErrorFile;
};

export type UploaderErrorType = "file-invalid" | "file-unsupported" | "file-exists" | "limit-reached" | "unknown";
export type UploaderErrorFile = { name: string; type: string };

export class UploaderError extends Error {
  type: UploaderErrorType;
  file: UploaderErrorFile;

  constructor(type: UploaderErrorType, file: UploaderErrorFile, ...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = this.constructor.name;
    this.type = type;
    this.file = { name: file.name, type: file.type };
  }

  serialize(): SerializedUploaderError {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      file: this.file
    };
  }

  static deserialize(error: SerializedUploaderError): UploaderError {
    return new UploaderError(error.type, error.file, error.message);
  }
}
