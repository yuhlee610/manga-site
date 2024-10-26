/*******************
 * TYPE DEFINITIONS
 *******************/

import { CoverEdit, CoverList, CoverResponse, ReferenceExpansionCoverArt } from "./mangadex";
import { Order } from "./static";

/** Order object for GetCoverRequestOptions */
export type GetCoverOrder = {
  createdAt: Order;
  updatedAt: Order;
  volume: Order;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /cover` */
export type GetCoverRequestOptions = {
  /** ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   * ``` */
  limit?: number;
  /** ```console
   * Minimum: 0
   * ``` */
  offset?: number;
  /**
   * UUID formatted strings
   *
   * Limit of 100 per request
   */
  manga?: string[];
  /**
   * UUID formatted strings
   *
   * Limit of 100 per request
   */
  ids?: string[];
  /**
   * UUID formatted strings
   *
   * Limit of 100 per request
   */
  uploaders?: string[];
  /**
   * Pattern: ^[a-z]{2}(-[a-z]{2})?$
   *
   * Limit of 100 per request
   */
  locales?: string[];
  order?: GetCoverOrder;
  includes?: ReferenceExpansionCoverArt;
};

/** Response from `GET /cover` */
export type GetCoverResponse = CoverList;

/** Request parameters for `GET /cover/{mangaOrCoverId}` */
export type GetCoverIdRequestOptions = {
  includes?: ReferenceExpansionCoverArt;
};

/** Response from `GET /cover/{mangaOrCoverId}` */
export type GetCoverIdResponse = CoverResponse;

/** Request parameters for `PUT /cover/{mangaOrCoverId}` */
export type EditCoverRequestOptions = CoverEdit;

/** Response from `PUT /cover/{mangaOrCoverId}` */
export type EditCoverResponse = CoverResponse;

/** Response from `DELETE /cover/{mangaOrCoverId}` */
export type DeleteCoverResponse = Response;
