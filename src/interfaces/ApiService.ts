import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IMeta } from "./ApiResponse";

export type RequestMethod = "get" | "post" | "patch" | "put" | "delete";

export interface Meta<Data extends Record<string, unknown>> {
  code: number;
  message: string;
  error_details: Partial<Record<keyof Data, string>>;
}

export interface Form<Data extends Record<string, unknown>> {
  // processing: boolean,
  // validating: boolean,
  // touched(name: keyof Data): boolean,
  // touch(name: string|NamedInputEvent|Array<string>): Data&Form<Data>,
  data(): Data;
  setData(data: Record<string, unknown>): Data & Form<Data>;
  errors: Partial<Record<keyof Data, string[]>> & Error;
  hasErrors: boolean;
  // valid(name: keyof Data): boolean,
  invalid(name: keyof Data): boolean;
  // validate(name?: keyof Data|NamedInputEvent): Data&Form<Data>,
  setErrors(
    errors: Partial<Record<keyof Data, string[]>> & Error
  ): Data & Form<Data>;
  // forgetError(string: keyof Data|NamedInputEvent): Data&Form<Data>
  // setValidationTimeout(duration: number): Data&Form<Data>,
  // submit(config?: Config): Promise<unknown>,
  // reset(...keys: (keyof Partial<Data>)[]): Data&Form<Data>,
  // validateFiles(): Form<Data>,
  // validator(): Validator,
  submit(
    payload?: { [key: string]: any },
    newSignal?: AbortSignal
  ): Promise<any>;
  submitHandler(payload: any, newSignal?: AbortSignal): void;
  onSubmit: (
    callback: (payload: any, newSignal?: AbortSignal) => void
  ) => Data & Form<Data>;
  errorHandler(payload: IMeta): void;
  onError: (callback: (payload: IMeta) => void) => Data & Form<Data>;
  // submit(): void;
}

export interface Error {
  _message?: string;
}
export type StatusHandler = (
  response: AxiosResponse,
  axiosError?: AxiosError
) => unknown;

export type Config = AxiosRequestConfig & {
  precognitive?: boolean;
  validate?: Iterable<string> | ArrayLike<string>;
  fingerprint?: string | null;
  onBefore?: () => boolean | undefined;
  onStart?: () => void;
  onSuccess?: (response: AxiosResponse) => unknown;
  onPrecognitionSuccess?: (response: AxiosResponse) => unknown;
  onValidationError?: StatusHandler;
  onUnauthorized?: StatusHandler;
  onForbidden?: StatusHandler;
  onNotFound?: StatusHandler;
  onConflict?: StatusHandler;
  onLocked?: StatusHandler;
  onFinish?: () => void;
};
