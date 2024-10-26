/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `POST /captcha/solve` */
export type PostCaptchaSolveResponse = {
  result: 'ok' | 'error';
};
