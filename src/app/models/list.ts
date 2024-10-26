/*******************
 * TYPE DEFINITIONS
 *******************/

import { ChapterList, CustomListList, CustomListResponse } from "./mangadex";
import { Includes, MangaContentRating, Order } from "./static";

// Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedOrder.
// These should be consolidated into a base type.
/** Order object for GetListIdFeedRequestOptions */
export type GetListIdFeedOrder = {
  createdAt: Order;
  updatedAt: Order;
  publishAt: Order;
  readableAt: Order;
  volume: Order;
  chapter: Order;
};

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `GET /list/{id}` */
export type GetListIdResponse = CustomListResponse;

/** Request parameters for `GET /user/list` */
export type GetUserListRequestOptions = {
  /**
   * ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   * ```
   */
  limit?: number;
  offset?: number;
};

/** Response from `GET /user/list` */
export type GetUserListResponse = CustomListList;

/** Request parameters for `GET /user/{id}/list` */
export type GetUserIdListRequestOptions = GetUserListRequestOptions;

/** Response from `GET /user/{id}/list` */
export type GetUserIdListResponse = GetUserListResponse;

/** Request parameters for `GET /list/{id}/feed` */
// Kenjugs (06/24/2022) TODO: This type is identical to GetUserFollowedMangaFeedRequestOptions.
// These should be consolidated into a base type.
export type GetListIdFeedRequestOptions = {
  /**
   * ```console
   * Default: 100
   * Minimum: 1
   * Maximum: 500
   */
  limit?: number;
  offset?: number;
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[];
  /** Default: ["safe", "suggestive", "erotica"] */
  contentRating?: MangaContentRating[];
  /** UUID formatted strings */
  excludedGroups?: string[];
  /** UUID formatted strings */
  excludedUploaders?: string[];
  includeFutureUpdates?: '0' | '1';
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string;
  /** DateTime formatted as YYYY-MM-DDTHH:mm:SS */
  publishAtSince?: string;
  order?: GetListIdFeedOrder;
  includes?: Includes[];
};

/** Response from `GET /list/{id}/feed` */
export type GetListIdFeedResponse = ChapterList;
