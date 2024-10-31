/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `POST /captcha/solve` */
export interface PostCaptchaSolveResponse {
  result: 'ok' | 'error';
}
