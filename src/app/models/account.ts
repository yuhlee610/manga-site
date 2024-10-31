/***********************
 * API REQUEST/RESPONSE
 ***********************/

import {
  AccountActivateResponse,
  CreateAccount,
  RecoverCompleteBody,
  SendAccountActivationCode,
  UserResponse,
} from './mangadex';

/** Response from `GET /account/available` */
export interface GetAccountAvailableResponse {
  available: boolean;
}

/** Request options for `POST /account/create` */
export type PostAccountCreateRequestOptions = CreateAccount;

/** Response from `POST /account/create` */
export type PostAccountCreateResponse = UserResponse;

/** Response from `POST /account/activate/{code}` */
export type GetAccountActivateCodeResponse = AccountActivateResponse;

/** Request options for `POST /account/activate/resend` */
export type PostAccountActivateResendRequestOptions = SendAccountActivationCode;

/** Response from `POST /account/activate/resend` */
export type PostAccountActivateResendResponse = AccountActivateResponse;

/** Request options for `POST /account/recover` */
export type PostAccountRecoverRequestOptions = SendAccountActivationCode;

/** Response from `POST /account/recover` */
export type PostAccountRecoverResponse = AccountActivateResponse;

/** Request options for `POST /account/recover/{code}` */
export type PostAccountRecoverCodeRequestOptions = RecoverCompleteBody;

/** Response from `POST /account/recover/{code}` */
export type PostAccountRecoverCodeResponse = AccountActivateResponse;
