/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /at-home/server/{chapterId}` */
export interface GetAtHomeServerChapterIdRequestOptions {
  /**
   * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
   *
   * While the conventional port for HTTPS traffic is 443 and servers are encouraged to
   * use it, it is not a hard requirement as it technically isn't anything special.
   *
   * However, some misbehaving school/office network will at time block traffic to
   * non-standard ports, and setting this flag to `true` will ensure selection of a
   * server that uses these.
   *
   * Default: false
   */
  forcePort443?: boolean;
}

/** Response from `GET /at-home/server/{chapterId}` */
export interface GetAtHomeServerChapterIdResponse {
  /** Default: "ok" */
  result: string;
  /**
   * The base URL to construct final image URLs from.
   *
   * The URL returned is valid for the requested chapter only, and for a duration of
   * 15 minutes from the time of the response.
   */
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}
