import { CheckResponse, Login, LoginResponse, LogoutResponse } from "./mangadex";

/** Authentication token issued when logging into a user account */
export type AuthenticationToken = {
  session: string;
  refresh: string;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/**
 * Request body for `POST /auth/login`
 *
 * Login object for logging in and obtaining an auth token object.
 * At least one of username or email is required.
 */
export type PostAuthLoginRequestOptions = Login;

/** Response from `POST /auth/login` */
export type PostAuthLoginResponse = LoginResponse;

/** Response from `GET /auth/check` */
export type GetAuthCheckResponse = CheckResponse;

/** Response from `POST /auth/logout` */
export type PostAuthLogoutResponse = LogoutResponse;

/** Response from `POST /auth/refresh` */