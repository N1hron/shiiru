export type Config = {
  storage: {
    theme: string;
    language: string;
  };
  uploader: {
    maxFiles: number;
    accept: string[];
    reject: string[];
  };
};
