/*******************
 * TYPE DEFINITIONS
 *******************/

import {
  AuthorCreate,
  AuthorEdit,
  AuthorList,
  AuthorResponse,
  ReferenceExpansionAuthor,
} from './mangadex';
import { Order } from './static';

/** Order object for GetAuthorRequestOptions */
export interface GetAuthorOrder {
  name?: Order;
}

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /author` */
export interface GetAuthorRequestOptions {
  /** ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   * ```*/
  limit?: number;
  /** ```console
   * Minimum: 0
   * ``` */
  offset?: number;
  /**
   * UUID formatted strings
   *
   * Author IDs (limited to 100 per request)
   */
  ids?: string[];
  name?: string;
  order?: GetAuthorOrder;
  includes?: ReferenceExpansionAuthor;
}

/** Response from `GET /author` */
export type GetAuthorResponse = AuthorList;

/** Request parameters for `GET /author/{id}` */
export interface GetAuthorIdRequestOptions {
  includes?: ReferenceExpansionAuthor;
}

/** Request parameters for `POST /author` */
export type PostAuthorRequestOptions = AuthorCreate;

/** Response from `POST /author` */
export type PostAuthorResponse = AuthorResponse;

/** Response from `GET /author/{id}` */
export type GetAuthorIdResponse = AuthorResponse;

/** Request parameters for `PUT /author/{id}` */
export type PutAuthorIdRequestOptions = AuthorEdit;

/** Response from `PUT /author/{id}` */
export type PutAuthorIdResponse = AuthorResponse;

/** Response from `DELETE /author/{id}` */
export type DeleteAuthorIdResponse = Response;
