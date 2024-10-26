/*******************
 * TYPE DEFINITIONS
 *******************/

import { ChapterList, MangaList, UserList, UserResponse } from "./mangadex";
import { Includes, MangaContentRating, Order } from "./static";

/** Order object for GetUsersRequestOptions */
export type GetUsersOrder = {
  username?: Order;
};

/** Order object for GetUserFollowedMangaFeedRequestOptions */
export type GetUserFollowedMangaFeedOrder = {
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

/** Request parameters for `GET /user` */
export type GetUsersRequestOptions = {
  /**
   * ```console
   * Default: 10
   * Minimum: 0
   * Maximum: 100
   * ```
   */
  limit?: number;
  offset?: number;
  /** UUID formatted strings (limited to 100 per request) */
  ids?: string[];
  username?: string;
  order?: GetUsersOrder;
};

/** Response from `GET /user` */
export type GetUsersResponse = UserList;

/** Response from `GET /user/{id}` */
export type GetUserIdResponse = UserResponse;

/** Request parameters for `GET /user/follows/manga/feed` */
export type GetUserFollowedMangaFeedRequestOptions = {
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
  order?: GetUserFollowedMangaFeedOrder;
  includes?: Includes[];
};

/** Response from `GET /user/follows/manga/feed` */
export type GetUserFollowedMangaFeedResponse = ChapterList;

/** Request parameters for `GET /user/follows/manga` */
export type GetUserFollowedMangaRequestOptions = {
  /** ```console
   * Default: 10
   * Minimum: 1
   * Maximum: 100
   * ``` */
  limit?: number;
  /** Minimum: 0 */
  offset?: number;
  includes?: Includes[];
};

/** Response from `GET /user/follows/manga` */
export type GetUserFollowedMangaResponse = MangaList;

/** Response from `GET /user/me` */
export type GetUserMeResponse = UserResponse;
