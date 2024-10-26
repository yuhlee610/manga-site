/*******************
 * TYPE DEFINITIONS
 *******************/

import { ScanlationGroupList, ScanlationGroupResponse } from "./mangadex";
import { Includes, Order } from "./static";

/** Order object for GetSearchGroupRequestOptions */
export type GetSearchGroupOrder = {
  name?: Order;
  createdAt?: Order;
  updatedAt?: Order;
  followedCount?: Order;
  relevance?: Order;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /group` */
export type GetSearchGroupRequestOptions = {
  /**
   * ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   */
  limit?: number;
  offset?: number;
  /**
   * UUID formatted strings for individual scanlation groups
   */
  ids?: string[];
  name?: string;
  focusedLanguages?: string;
  includes?: Includes[];
  /**
   * Default: { latestUploadedChapter: 'desc' }
   *
   * Seems to be a typo? Comes directly from their documentation.
   */
  order?: GetSearchGroupOrder;
};

/** Response from `GET /group` */
export type GetSearchGroupResponse = ScanlationGroupList;

/** Request parameters for `GET /group/{id}` */
export type GetGroupIdRequestOptions = {
  includes?: Includes[];
};

/** Response from `GET /group/{id}` */
export type GetGroupIdResponse = ScanlationGroupResponse;
