export interface ILoginResponse {
  metadata: Metadata;
  response: ILoginResponseData;
}

export interface ILoginResponseData {
  token: string;
}

interface Metadata {
  message: string;
  status: number;
}
