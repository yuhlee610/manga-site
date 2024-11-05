import {
  Includes,
  Links,
  MangaContentRating,
  MangaPublicationDemographic,
  MangaPublicationStatus,
  MangaReadingStatus,
  Order,
} from './static';
import { AuthenticationToken } from './auth';

/*******************
 * TYPE DEFINITIONS
 *******************/

/** Aggregate chapter type used in AggregateVolume for GetMangaIdAggregateResponse */
export interface AggregateChapter {
  chapter: string;
  /** UUID formatted string */
  id: string;
  /** UUID formatted strings */
  others: string[];
  /** Total number of chapters across filtered languages */
  count: number;
}

/** Aggregate volume type for GetMangaIdAggregateResponse */
export interface AggregateVolume {
  volume: string;
  /** Total number of chapters in volume across filtered languages */
  count: number;
  chapters: Record<string, AggregateChapter>;
}

/** Order object for GetSearchMangaRequestOptions */
export interface GetSearchMangaOrder {
  title?: Order;
  year?: Order;
  createdAt?: Order;
  updatedAt?: Order;
  latestUploadedChapter?: Order;
  followedCount?: Order;
  relevance?: Order;
  rating?: Order;
}

/** Order object for GetMangaIdFeedRequestOptions */
export interface GetMangaIdFeedOrder {
  createdAt?: Order;
  updatedAt?: Order;
  publishAt?: Order;
  readableAt?: Order;
  volume?: Order;
  chapter?: Order;
}

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /manga` */
export interface GetSearchMangaRequestOptions {
  /** Default: 10 */
  limit?: number;
  offset?: number;
  title?: string;
  authors?: string[];
  artists?: string[];
  /** Year of release */
  year?: number;
  includedTags?: string[];
  /** Default: AND */
  includedTagsMode?: 'AND' | 'OR';
  excludedTags?: string[];
  /** Default: OR */
  excludedTagsMode?: 'AND' | 'OR';
  status?: MangaPublicationStatus[];
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  availableTranslatedLanguage?: string[];
  publicationDemographic?: MangaPublicationDemographic[];
  /** Manga IDs, limited to 100 per request */
  ids?: string[];
  /** Default: ['safe', 'suggestive', 'erotica'] */
  contentRating?: MangaContentRating[];
  /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string;
  /** DateTime string with following format: YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string;
  /** Default:
   * ```
   * { latestUploadedChapter: 'desc' }
   * ``` */
  order?: GetSearchMangaOrder;
  includes?: Includes[];
  hasAvailableChapters?: '0' | '1' | 'true' | 'false';
  /** UUID formatted string */
  group?: string;
}

/** Response from `GET /manga` */
export type GetSearchMangaResponse = MangaList;

/** Response from `GET /manga/status` */
export interface GetMangaStatusResponse {
  /** Default: "ok" */
  result: string;
  /**
   * Property names in `statuses` are UUID formatted strings
   *
   * Example:
   * ```
   * {
   *     "result": "ok",
   *     "statuses": {
   *         "b019ea5d-5fe6-44d4-abbc-f546f210884d": "reading"
   *         "2394a5c7-1d2e-461f-acde-18726b9e37d6": "dropped"
   *     }
   * }
   * ```
   */
  statuses: Record<string, MangaReadingStatus>;
}

/** Request parameters for `GET /manga/{id}/feed` */
export interface GetMangaIdFeedRequestOptions {
  /**
   * ```console
   * Default: 100
   * Minimum: 1
   * Maximum: 500
   * ```
   */
  limit?: number;
  /** Minimum: 0 */
  offset?: number;
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  originalLanguage?: string[];
  /** ISO 639-1 standard two or five letter language code */
  excludedOriginalLanguage?: string[];
  contentRating?: MangaContentRating[];
  /** UUID formatted strings */
  excludedGroups?: string[];
  /** UUID formatted strings */
  excludedUploaders?: string[];
  /** Default: 1 */
  includeFutureUpdates?: '0' | '1';
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  createdAtSince?: string;
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  updatedAtSince?: string;
  /** DateTime string with format YYYY-MM-DDTHH:mm:SS */
  publishAtSince?: string;
  order?: GetMangaIdFeedOrder;
  includes?: Includes[];
}

/** Response from `GET /manga/{id}/feed` */
export type GetMangaIdFeedResponse = ChapterList;

/** Request parameters for `GET /manga/{id}/aggregate` */
export interface GetMangaIdAggregateRequestOptions {
  /** ISO 639-1 standard two or five letter language code */
  translatedLanguage?: string[];
  /** UUID formatted strings */
  groups?: string[];
}

/** Response from `GET /manga/{id}/aggregate` */
export interface GetMangaIdAggregateResponse {
  /** Default: "ok" */
  result: string;
  /** Object containing volumes and their respective chapters */
  volumes: Record<string, AggregateVolume>;
}

/** Request parameters for `GET /manga/{id}` */
export interface GetMangaIdRequestOptions {
  includes?: Includes[];
}

/** Response from `GET /manga/{id}` */
export type GetMangaIdResponse = MangaResponse;

/** Response from `GET /manga/{id}/read` */
export interface GetMangaIdReadMarkersResponse {
  result: 'ok';
  /** UUID formatted strings */
  data: string[];
}

/** Request parameters for `GET /manga/read` */
export interface GetMangaReadMarkersRequestOptions {
  /** UUID formatted strings */
  ids: string[];
  /** Group results by manga ID */
  grouped?: boolean;
}

/** Response from `GET /manga/read` */
export interface GetMangaReadMarkersResponse {
  result: 'ok';
  /**
   * Type is dependent on value passed into request options `grouped`
   *
   * For example:
   *
   * ```console
   * grouped: true
   * data: {
   *     1234abcd-0000-0000-0000-1234abcd5678: [
   *         'abcd1234-1111-1111-1111-abcd1234efab',
   *         'abcd1234-2222-2222-2222-2468acea0246'
   *     ]
   * }
   *
   * grouped: false
   * data: [
   *     'abcd1234-1111-1111-1111-abcd1234efab',
   *     'abcd1234-2222-2222-2222-2468acea0246'
   * ]
   * ```
   */
  data: string[] | Record<string, string>[];
}

/** Request parameters for `GET /manga/random` */
export interface GetMangaRandomRequestOptions {
  includes?: Includes[];
  contentRating?: MangaContentRating[];
}

/** Response from `GET /manga/random` */
export type GetMangaRandomResponse = MangaResponse;

/** Response from `GET /manga/tag` */
export type GetMangaTagResponse = TagResponse;

/**
 * Makes named properties required in pre-existing type. All other properties are made optional.
 * E.g.:
 * type foo = {
 *   prop1?: string
 *   prop2?: string
 * };
 * type bar = RequiredPick<foo, 'prop1'>;
 *
 * Then, bar === {
 *   prop1: string
 *   prop2?: string
 * }
 */
export type RequiredPick<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

/**
 * Makes at least one property required in the absence of the others.
 * E.g.:
 * type foo = {
 *   prop1?: string
 *   prop2?: string
 * };
 * type bar = RequireAtLeastOne<foo, 'prop1' | 'prop2'>;
 *
 * bar === {
 *   prop1: string
 *   prop2?: string
 * } & {
 *   prop1?: string
 *   prop2: string
 * }
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export interface MangaRequest {
  title?: LocalizedString;
  altTitles?: LocalizedString[];
  description?: LocalizedString;
  /** UUID formatted strings */
  authors?: string[];
  /** UUID formatted strings */
  artists?: string[];
  links?: object;
  /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
  originalLanguage?: string;
  lastVolume?: string | null;
  lastChapter?: string | null;
  publicationDemographic?: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null;
  status?: 'completed' | 'ongoing' | 'cancelled' | 'hiatus';
  /**
   * ```console
   * Minimum: 1
   * Maximum: 9999
   * ```
   */
  year?: number | null;
  contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
  chapterNumbersResetOnNewVolume?: boolean;
  /** UUID formatted strings */
  tags?: string[];
  /** UUID formatted string */
  primaryCover?: string | null;
  /** ```console
   * Minimum: 1
   * ``` */
  version?: number;
}

/**
 * The property name follows the pattern `^[a-z]{2,8}$`
 *
 * Example:
 * ```json
 * {
 *   "en": "The Quintessential Quintuplets"
 * }
 * ```
 */
export type LocalizedString = Record<string, string>;

export interface MangaResponse {
  result: 'ok' | 'error';
  /** Default: "entity" */
  response: string;
  data: Manga;
}

export interface ChapterResponse {
  result: 'ok' | 'error';
  /** Default: "entity" */
  response: string;
  data: Chapter;
}

export interface Relationship {
  /** UUID formatted string */
  id: string;
  type: string;
  /** Only present if you are on a Manga entity and a Manga relationship */
  related:
    | 'monochrome'
    | 'main_story'
    | 'adapted_from'
    | 'based_on'
    | 'prequel'
    | 'side_story'
    | 'doujinshi'
    | 'same_franchise'
    | 'shared_universe'
    | 'sequel'
    | 'spin_off'
    | 'alternate_story'
    | 'alternate_version'
    | 'preserialization'
    | 'colored'
    | 'serialization';
  /** If Reference Expansion is applied, contains objects attributes */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  attributes: any | null;
}

export interface Chapter {
  /** UUID formatted string */
  id: string;
  type: 'chapter';
  attributes: ChapterAttributes;
  relationships: Relationship[];
}

export interface Manga {
  /** UUID formatted string */
  id: string;
  type: 'manga';
  attributes: MangaAttributes;
  relationships: Relationship[];
}

export interface ErrorResponse {
  /** Default: "error" */
  result: string;
  errors: Error[];
}

export interface Error {
  id: string;
  status: number;
  title: string;
  detail: string;
}

export interface ChapterAttributes {
  /** ```console
   * Maximum length: 255
   * ``` */
  title: string | null;
  volume: string | null;
  /** ```console
   * Maximum length: 8
   * ``` */
  chapter: string | null;
  pages: number;
  /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
  translatedLanguage: string;
  /** UUID formatted string */
  uploader: string;
  /** ```console
   * Maximum length: 512
   * Pattern: ^https?://
   * ``` */
  externalUrl: string | null;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
  publishAt: string;
  readableAt: string;
}

export interface MangaAttributes {
  title: LocalizedString;
  altTitles: LocalizedString[];
  description: LocalizedString;
  isLocked: boolean;
  links: Links;
  originalLanguage: string;
  lastVolume: string | null;
  lastChapter: string | null;
  publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen' | null;
  status: 'completed' | 'ongoing' | 'cancelled' | 'hiatus';
  year: number | null;
  contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
  chapterNumbersResetOnNewVolume: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  availableTranslatedLanguages: any[];
  /** UUID formatted string */
  latestUploadedChapter: string;
  tags: Tag[];
  state: 'draft' | 'submitted' | 'published' | 'rejected';
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Required properties:
 * ```console
 * - title
 * - status
 * - originalLanguage
 * - contentRating
 * ```
 */
export type MangaCreate = RequiredPick<
  MangaRequest,
  'title' | 'status' | 'originalLanguage' | 'contentRating'
>;

/**
 * Required properties:
 * ```console
 * - version
 * ```
 */
export type MangaEdit = RequiredPick<MangaRequest, 'version'>;

/**
 * Required properties:
 * ```console
 * - version
 * ```
 */
export type ChapterEdit = RequiredPick<ChapterRequest, 'version'>;

export interface Response {
  result: 'ok' | 'error';
}

export type Login = RequireAtLeastOne<
  {
    /** ```console
     * Minimum length: 1
     * Maximum length: 64
     * ``` */
    username?: string;
    email?: string;
    /** ```console
     * Minimum length: 8
     * Maximum length: 1024
     * ``` */
    password: string;
  },
  'username' | 'email'
>;

export interface LoginResponse {
  result: 'ok' | 'error';
  token: AuthenticationToken;
}

export interface CheckResponse {
  /** Default: "ok" */
  result: string;
  isAuthenticated: boolean;
  roles: string[];
  permissions: string[];
}

export interface LogoutResponse {
  result: 'ok' | 'error';
}

export interface RefreshToken {
  /** ```console
   * Minimum length: 1
   * ``` */
  token: string;
}

export interface RefreshResponse {
  result: 'ok' | 'error';
  token?: AuthenticationToken;
  message?: string;
}

export interface AccountActivateResponse {
  result: 'ok';
}

export interface CreateAccount {
  /** ```console
   * Minimum length: 1
   * Maximum length: 64
   * ``` */
  username: string;
  /** ```console
   * Minimum length: 8
   * Maximum length: 1024
   * ``` */
  password: string;
  email: string;
}

export interface ScanlationGroupResponse {
  result: 'ok';
  /** Default: "entity" */
  response: string;
  data: ScanlationGroup;
}

export interface ScanlationGroup {
  /** UUID formatted string */
  id: string;
  type: 'scanlation_group';
  attributes: ScanlationGroupAttributes;
  relationships: Relationship[];
}

export interface ScanlationGroupAttributes {
  name: string;
  altNames: LocalizedString[];
  website: string | null;
  ircServer: string | null;
  ircChannel: string | null;
  discord: string | null;
  contactEmail: string | null;
  description: string | null;
  /** Pattern: `^https?://` */
  twitter: string | null;
  /** ```console
   * Maximum length: 128
   * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
   */
  mangaUpdates: string | null;
  /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
  focusedLanguages: string[] | null;
  locked: boolean;
  official: boolean;
  inactive: boolean;
  /**
   * Should respect ISO 8601 duration specifications: https://en.wikipedia.org/wiki/ISO_8601#Durations
   *
   * Pattern: `^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$`
   */
  publishDelay: string;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  /** UUID formatted string */
  id: string;
  type: 'user';
  attributes: UserAttributes;
  relationships: Relationship[];
}

export interface UserAttributes {
  username: string;
  roles: string[];
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface CreateScanlationGroup {
  name: string;
  website?: string | null;
  ircServer?: string | null;
  ircChannel?: string | null;
  discord?: string | null;
  contactEmail?: string | null;
  description?: string | null;
  /** Pattern: `^https?://twitter\.com` */
  twitter?: string | null;
  /** ```console
   * Maximum length: 128
   * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
   * ``` */
  mangaUpdates?: string | null;
  inactive?: boolean;
  /** Pattern: `^P(([1-9]|[1-9][0-9])D)?(([1-9])W)?(T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$` */
  publishDelay?: string | null;
}

export interface ScanlationGroupEdit {
  name?: string;
  /** UUID formatted string */
  leader?: string;
  /** UUID formatted strings */
  members?: string[];
  website?: string | null;
  ircServer?: string | null;
  ircChannel?: string | null;
  discord?: string | null;
  contactEmail?: string | null;
  description?: string | null;
  /** Pattern: `^https?://` */
  twitter?: string | null;
  /** ```console
   * Maximum length: 128
   * Pattern: ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
   * ``` */
  mangaUpdates?: string | null;
  /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
  focusedLanguages?: string[] | null;
  inactive?: boolean;
  locked?: boolean;
  publishDelay?: string;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface CustomListCreate {
  name: string;
  visibility?: 'public' | 'private';
  /** UUID formatted strings */
  manga?: string[];
  /** ```console
   * Minimum: 1
   * ``` */
  version?: number;
}

export interface CustomListEdit {
  name?: string;
  visibility?: 'public' | 'private';
  /** UUID formatted strings */
  manga?: string[];
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface CustomListResponse {
  result: 'ok' | 'error';
  /** Default: "entity" */
  response: string;
  data: CustomList;
}

export interface CustomList {
  /** UUID formatted string */
  id: string;
  type: 'custom_list';
  attributes: CustomListAttributes;
  relationships: Relationship[];
}

export interface CustomListAttributes {
  name: string;
  visibility: 'public' | 'private';
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface CoverResponse {
  result: string;
  /** Default: "entity" */
  response: string;
  data: Cover;
}

export interface Cover {
  /** UUID formatted string */
  id: string;
  type: 'cover_art';
  attributes: CoverAttributes;
  relationships: Relationship[];
}

export interface CoverAttributes {
  volume: string | null;
  fileName: string;
  description: string | null;
  locale: string | null;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoverEdit {
  /** ```console
   * Minimum length: 0
   * Maximum length: 8
   * ``` */
  volume: string | null;
  /** ```console
   * Minimum length: 0
   * Maximum length: 512
   * ``` */
  description?: string | null;
  /** Pattern: `^[a-z]{2}(-[a-z]{2})?$` */
  locale?: string | null;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface AuthorResponse {
  result: string;
  /** Default: "entity" */
  response: string;
  data: Author;
}

export interface Author {
  /** UUID formatted string */
  id: string;
  type: 'author';
  attributes: AuthorAttributes;
  relationships: Relationship[];
}

export interface AuthorAttributes {
  name: string;
  imageUrl: string;
  biography: LocalizedString;
  /** Pattern: ^https?:\/\/twitter\.com(\/|$) */
  twitter: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?pixiv\.net(\/|$) */
  pixiv: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?melonbooks\.co\.jp(\/|$) */
  melonBook: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?fanbox\.cc(\/|$) */
  fanBox: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?booth\.pm(\/|$) */
  booth: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?nicovideo\.jp(\/|$) */
  nicoVideo: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?skeb\.jp(\/|$) */
  skeb: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?fantia\.jp(\/|$) */
  fantia: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?tumblr\.com(\/|$) */
  tumblr: string | null;
  /** Pattern: ^https?:\/\/www\.youtube\.com(\/|$) */
  youtube: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?weibo\.(cn|com)(\/|$) */
  weibo: string | null;
  /** Pattern: ^https?:\/\/([\w-]+\.)?naver\.com(\/|$) */
  naver: string | null;
  /** Pattern: ^https?:\/\/ */
  website: string | null;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Required properties:
 * ```console
 * - version
 * ```
 */
export type AuthorEdit = RequiredPick<
  Partial<Omit<AuthorAttributes, 'imageUrl' | 'createdAt' | 'updatedAt'>>,
  'version'
>;

/**
 * Required properties:
 * ```console
 * - name
 * ```
 */
export type AuthorCreate = RequiredPick<
  Partial<Omit<AuthorAttributes, 'imageUrl' | 'createdAt' | 'updatedAt'>>,
  'name'
>;

export interface MappingIdBody {
  type: 'group' | 'manga' | 'chapter' | 'tag';
  ids: number[];
}

export interface MappingIdResponse {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: MappingId[];
  limit: number;
  offset: number;
  total: number;
}

export interface MappingId {
  /** UUID formatted string */
  id: string;
  type: 'mapping_id';
  attributes: MappingIdAttributes;
  relationships: Relationship[];
}

export interface MappingIdAttributes {
  type: 'manga' | 'chapter' | 'group' | 'tag';
  legacyId: number;
  /** UUID formatted string */
  newId: string;
}

export interface TagResponse {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: Tag[];
  limit: number;
  offset: number;
  total: number;
}

export interface Tag {
  /** UUID formatted string */
  id: string;
  type: 'tag';
  attributes: TagAttributes;
  relationships: Relationship[];
}

export interface TagAttributes {
  name: LocalizedString;
  description: LocalizedString;
  group: 'content' | 'format' | 'genre' | 'theme';
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface UserResponse {
  result: 'ok';
  /** Default: "entity" */
  response: string;
  data: User;
}

export interface SendAccountActivationCode {
  email: string;
}

export interface RecoverCompleteBody {
  /**
   * ```console
   * Minimum length: 8
   * Maximum length: 1024
   * ```
   */
  newPassword: string;
}

export interface UpdateMangaStatus {
  status:
    | 'reading'
    | 'on_hold'
    | 'plan_to_read'
    | 'dropped'
    | 're_reading'
    | 'completed'
    | null;
}

export interface ChapterRequest {
  /**
   * ```console
   * Maximum length: 255
   * ```
   */
  title?: string | null;
  volume?: string | null;
  /**
   * ```console
   * Maximum length: 8
   * ```
   */
  chapter?: string | null;
  /** Pattern: ^[a-z]{2}(-[a-z]{2})?$ */
  translatedLanguage?: string;
  /**
   * UUID formatted strings
   *
   * ```console
   * Maximum array length: 10
   * Individual string lengths must be 36 characters
   * ```
   */
  groups?: string[];
  /** ```console
   * Minimum: 1
   * ``` */
  version?: number;
}

export interface CoverList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: Cover[];
  limit: number;
  offset: number;
  total: number;
}

export interface AuthorList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: Author[];
  limit: number;
  offset: number;
  total: number;
}

export interface ChapterList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: Chapter[];
  limit: number;
  offset: number;
  total: number;
}

export interface ScanlationGroupList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: ScanlationGroup[];
  limit: number;
  offset: number;
  total: number;
}

export type MangaRelationCreate = RequiredPick<
  MangaRelationRequest,
  'targetManga' | 'relation'
>;

export interface MangaRelationRequest {
  /** UUID formatted string */
  targetManga?: string;
  relation?:
    | 'monochrome'
    | 'main_story'
    | 'adapted_from'
    | 'based_on'
    | 'prequel'
    | 'side_story'
    | 'doujinshi'
    | 'same_franchise'
    | 'shared_universe'
    | 'sequel'
    | 'spin_off'
    | 'alternate_story'
    | 'alternate_version'
    | 'preserialization'
    | 'colored'
    | 'serialization';
}

export interface MangaRelationList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: MangaRelation[];
  limit: number;
  offset: number;
  total: number;
}

export interface MangaRelationResponse {
  result: 'ok' | 'error';
  /** Default: "entity" */
  response: string;
  data: MangaRelation;
}

export interface MangaRelation {
  /** UUID formatted string */
  id: string;
  type: 'manga_relation';
  attributes: MangaRelationAttributes;
  relationships: Relationship[];
}

export interface MangaRelationAttributes {
  relation:
    | 'monochrome'
    | 'main_story'
    | 'adapted_from'
    | 'based_on'
    | 'prequel'
    | 'side_story'
    | 'doujinshi'
    | 'same_franchise'
    | 'shared_universe'
    | 'sequel'
    | 'spin_off'
    | 'alternate_story'
    | 'alternate_version'
    | 'preserialization'
    | 'colored'
    | 'serialization';
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface MangaList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}

export interface CustomListList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: CustomList[];
  limit: number;
  offset: number;
  total: number;
}

export interface UserList {
  /** Default: "ok" */
  result: string;
  /** Default: "collection" */
  response: string;
  data: User[];
  limit: number;
  offset: number;
  total: number;
}

export interface UploadSession {
  /** UUID formatted string */
  id: string;
  type: 'upload_session';
  attributes: UploadSessionAttributes;
}

export interface UploadSessionAttributes {
  isCommitted: boolean;
  isProcessed: boolean;
  isDeleted: boolean;
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadSessionFile {
  /** UUID formatted string */
  id: string;
  type: 'upload_session_file';
  attributes: UploadSessionFileAttributes;
}

export interface UploadSessionFileAttributes {
  originalFileName: string;
  fileHash: string;
  fileSize: number;
  mimeType: string;
  source: 'local' | 'remote';
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

/** NOTE: At least one property is required to be present */
export type ChapterReadMarkerBatch = RequireAtLeastOne<
  {
    /** Length of 36 UUID formatted strings */
    chapterIdsRead?: string[];
    /** Length of 36 UUID formatted strings */
    chapterIdsUnread?: string[];
  },
  'chapterIdsRead' | 'chapterIdsUnread'
>;

export interface BeginUploadSession {
  /**
   * UUID formatted strings
   *
   * ```console
   * Maximum array length: 10
   * Individual string lengths must be 36 characters
   * ```
   */
  groups: string[];
  /**
   * UUID formatted string
   *
   * Must be 36 characters
   */
  manga: string[];
}

export interface BeginEditSession {
  /** ```console
   * Minimum: 1
   * ``` */
  version: number;
}

export interface CommitUploadSession {
  chapterDraft: ChapterDraft;
  /**
   * UUID formatted strings
   *
   * ```console
   * Minimum array length: 1
   * Maximum array length: 500
   * Individual string lengths must be 36 characters
   * ```
   */
  pageOrder: string[];
}

export interface ChapterDraft {
  /**
   * Pattern: ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
   *
   * ```console
   * Maximum length: 8
   * ```
   */
  volume: string | null;
  /**
   * Pattern: ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
   *
   * ```console
   * Maximum length: 8
   * ```
   */
  chapter: string | null;
  /** ```console
   * Maximum length: 255
   * ``` */
  title: string | null;
  /** Pattern: ^[a-z]{2}(-[a-z]{2})?$ */
  translatedLanguage: string;
  /**
   * Pattern: ^https?://
   *
   * ```console
   * Maximum length: 512
   * ```
   */
  externalUrl?: string | null;
  /** Pattern: ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */
  publishAt?: string;
}

export interface ReportListResponse {
  result: 'ok' | 'error';
  /** Default: "collection" */
  response: string;
  data: Report[];
  limit: number;
  offset: number;
  total: number;
}

export interface Report {
  /** UUID formatted string */
  id: string;
  type: 'report';
  attributes: ReportAttributes;
  relationships: Relationship[];
}

export interface ReportAttributes {
  details: string;
  objectId: string;
  status: 'waiting' | 'accepted' | 'refused' | 'autoresolved';
  createdAt: string;
}

export interface ForumsThreadResponse {
  /** Default: "ok" */
  result: string;
  /** Default: "entity" */
  response: string;
  data: {
    /** Default: "thread" */
    type: string;
    /** The id for the thread on the forums, accessible at https://forums.mangadex.org/threads/:id */
    id: number;
    attributes: {
      /** The number of replies so far in the forums thread returned */
      repliesCount: number;
    };
  };
}

/** Reference expansion options for author/artist entities or lists */
export type ReferenceExpansionAuthor = 'manga'[];

/** Reference expansion options for chapter entities or lists */
export type ReferenceExpansionChapter = (
  | 'manga'
  | 'scanlation_group'
  | 'user'
)[];

/** Reference expansion options for cover art entities or lists */
export type ReferenceExpansionCoverArt = ('manga' | 'user')[];

/** Reference expansion options for manga entities or lists */
export type ReferenceExpansionManga = (
  | 'manga'
  | 'cover_art'
  | 'author'
  | 'artist'
  | 'tag'
)[];

/** Reference expansion options for manga relation entities or lists */
export type ReferenceExpansionMangaRelation = 'manga'[];

/** Reference expansion options for user report entities or lists */
export type ReferenceExpansionReport = ('user' | 'reason')[];

/** Reference expansion options for scanlation group entities or lists */
export type ReferenceExpansionScanlationGroup = ('leader' | 'member')[];

/** Comments-related statistics of an entity. If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet. */
export type StatisticsDetailsComments = {
  /**
   * The id of the thread backing the comments for that entity on the MangaDex Forums.
   *
   * ```console
   * Minimum: 1
   * ```
   */
  threadId: number;
  /**
   * The number of replies on the MangaDex Forums thread backing this entity's comments.
   * This excludes the initial comment that opens the thread, which is created by our systems.
   *
   * ```console
   * Minimum: 0
   * ```
   */
  repliesCount: number;
} | null;

export interface MangaStatistic {
  comments: StatisticsDetailsComments;
  rating: {
    average: number;
    bayesian: number;
  };
  follows: number;
}

export interface GetMangasStatisticResponse {
  result: string;
  statistics: Record<string, MangaStatistic>;
}

export type ExtendChapter = Chapter & {
  manga?: Partial<Manga> & Pick<Manga, 'id' | 'type'>;
  scanlation_group?: Partial<ScanlationGroup> &
    Pick<ScanlationGroup, 'id' | 'type'>;
};

export type ExtendManga = Manga & {
  cover_art?: Partial<Cover> & Pick<Cover, 'id' | 'type'>;
  author?: Partial<Author> & Pick<Author, 'id' | 'type'>;
  artist?: Partial<Author> & Pick<Author, 'id' | 'type'>;
};

export interface ChapterItem {
  volume: string;
  chapter: string;
  id: string;
  others?: string[];
}

export const StatusOptions = [
  {
    value: MangaPublicationStatus.COMPLETED,
    label: 'Đã hoàn thành',
  },
  {
    value: MangaPublicationStatus.ONGOING,
    label: 'Đang ra',
  },
  {
    value: MangaPublicationStatus.CANCELLED,
    label: 'Bị hủy',
  },
  {
    value: MangaPublicationStatus.HIATUS,
    label: 'Tạm dừng',
  },
];

export const MangaOrderOptions = [
  {
    value: 'title.asc',
    label: 'Bảng chữ cái',
  },
  {
    value: 'updatedAt.desc',
    label: 'Mới cập nhật',
  },
  {
    value: 'year.desc',
    label: 'Truyện mới',
  },
  {
    value: 'followedCount.desc',
    label: 'Theo dõi nhiều nhất',
  },
  {
    value: 'relevance.desc',
    label: 'Liên quan nhất',
  },
  {
    value: 'rating.desc',
    label: 'Đánh giá cao nhất',
  },
];

export const MangaPublicationDemographicOptions = [
  {
    value: MangaPublicationDemographic.SHOUNEN,
    label: 'Shounen',
  },
  {
    value: MangaPublicationDemographic.NONE,
    label: 'None',
  },
  {
    value: MangaPublicationDemographic.SHOUJO,
    label: 'Shoujo',
  },
  {
    value: MangaPublicationDemographic.JOSEI,
    label: 'Josei',
  },
  {
    value: MangaPublicationDemographic.SEINEN,
    label: 'Seinen',
  },
];