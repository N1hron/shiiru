export type UploadErrorType =
  "file-limit-reached" |
  "file-already-exists" |
  "file-type-empty" |
  "file-type-unsupported" |
  "video-track-empty" |
  "video-track-undecodable" |
  "video-codec-unsupported" |
  "video-invalid" |
  "image-invalid" |
  "unknown"
;

export type UploadErrorFile = {
  name: string;
  type: string;
};

export type SerializedUploadError = {
  name: string;
  message: string;
  type: UploadErrorType;
  file: UploadErrorFile;
};

export class UploadError extends Error {
  file: UploadErrorFile;
  type: UploadErrorType;

  constructor(
    file: UploadErrorFile,
    type: UploadErrorType,
    ...rest: ConstructorParameters<ErrorConstructor>
  ) {
    super(...rest);

    this.name = this.constructor.name;
    this.file = file;
    this.type = type;
  }

  serialize(): SerializedUploadError {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      file: {
        name: this.file.name,
        type: this.file.type
      }
    };
  }

  static deserialize(serialized: SerializedUploadError) {
    return new this(serialized.file, serialized.type, serialized.message);
  }
}
