export type Config = {
  storage: {
    theme: string;
    language: string;
    settings: string;
  };
  uploader: {
    maxFiles: number;
    accept: string[];
    reject: string[];
  };
};
