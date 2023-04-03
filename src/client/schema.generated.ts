/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { SchemaUnionsKey } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
export enum AvatarRatingEnum {
  /** Indicates a G level avatar rating level. */
  G = "G",
  /** Indicates a PG level avatar rating level. */
  PG = "PG",
  /** Indicates an R level avatar rating level. */
  R = "R",
  /** Indicates an X level avatar rating level. */
  X = "X",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CXAlertIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** Arguments for filtering the CXAlertToRevisionConnection connection */
export interface CXAlertToRevisionConnectionWhereArgs {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CategoryIdType {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The hashed Global ID */
  ID = "ID",
  /** The name of the node */
  NAME = "NAME",
  /** Url friendly name of the node */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
}

/** Arguments for filtering the CategoryToCategoryConnection connection */
export interface CategoryToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export interface CategoryToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfCategoryEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the CategoryToPostConnection connection */
export interface CategoryToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single comment node. Default is "ID". To be used along with the "id" field. */
export enum CommentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
}

/** Arguments for filtering the CommentToCommentConnection connection */
export interface CommentToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the CommentToParentCommentConnection connection */
export interface CommentToParentCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
  /** Order by browser user agent of the commenter. */
  COMMENT_AGENT = "COMMENT_AGENT",
  /** Order by true/false approval of the comment. */
  COMMENT_APPROVED = "COMMENT_APPROVED",
  /** Order by name of the comment author. */
  COMMENT_AUTHOR = "COMMENT_AUTHOR",
  /** Order by e-mail of the comment author. */
  COMMENT_AUTHOR_EMAIL = "COMMENT_AUTHOR_EMAIL",
  /** Order by IP address of the comment author. */
  COMMENT_AUTHOR_IP = "COMMENT_AUTHOR_IP",
  /** Order by URL address of the comment author. */
  COMMENT_AUTHOR_URL = "COMMENT_AUTHOR_URL",
  /** Order by the comment contents. */
  COMMENT_CONTENT = "COMMENT_CONTENT",
  /** Order by date/time timestamp of the comment. */
  COMMENT_DATE = "COMMENT_DATE",
  /** Order by GMT timezone date/time timestamp of the comment. */
  COMMENT_DATE_GMT = "COMMENT_DATE_GMT",
  /** Order by the globally unique identifier for the comment object */
  COMMENT_ID = "COMMENT_ID",
  /** Order by the array list of comment IDs listed in the where clause. */
  COMMENT_IN = "COMMENT_IN",
  /** Order by the comment karma score. */
  COMMENT_KARMA = "COMMENT_KARMA",
  /** Order by the comment parent ID. */
  COMMENT_PARENT = "COMMENT_PARENT",
  /** Order by the post object ID. */
  COMMENT_POST_ID = "COMMENT_POST_ID",
  /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
  COMMENT_TYPE = "COMMENT_TYPE",
  /** Order by the user ID. */
  USER_ID = "USER_ID",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContactIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** Allowed Content Types */
export enum ContentTypeEnum {
  /** The Type of Content object */
  ATTACHMENT = "ATTACHMENT",
  /** The Type of Content object */
  CONTACT = "CONTACT",
  /** The Type of Content object */
  CX_ALERT = "CX_ALERT",
  /** The Type of Content object */
  PAGE = "PAGE",
  /** The Type of Content object */
  POST = "POST",
  /** The Type of Content object */
  PRODUCT = "PRODUCT",
  /** The Type of Content object */
  RATE = "RATE",
  /** The Type of Content object */
  SERVICE = "SERVICE",
  /** The Type of Content object */
  UFAQ = "UFAQ",
}

/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
export enum ContentTypeIdTypeEnum {
  /** The globally unique ID */
  ID = "ID",
  /** The name of the content type. */
  NAME = "NAME",
}

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export interface ContentTypeToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Allowed Content Types of the Category taxonomy. */
export enum ContentTypesOfCategoryEnum {
  /** The Type of Content object */
  POST = "POST",
}

/** Allowed Content Types of the PostFormat taxonomy. */
export enum ContentTypesOfPostFormatEnum {
  /** The Type of Content object */
  POST = "POST",
}

/** Allowed Content Types of the ProductName taxonomy. */
export enum ContentTypesOfProductNameEnum {
  /** The Type of Content object */
  RATE = "RATE",
}

/** Allowed Content Types of the Tag taxonomy. */
export enum ContentTypesOfTagEnum {
  /** The Type of Content object */
  POST = "POST",
}

/** Input for the createCXAlert mutation */
export interface CreateCXAlertInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createCategory mutation */
export interface CreateCategoryInput {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the category object */
  description?: InputMaybe<Scalars["String"]>;
  /** The name of the category object to mutate */
  name: Scalars["String"];
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the createComment mutation */
export interface CreateCommentInput {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars["String"]>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars["String"]>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars["Int"]>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Type of comment. */
  type?: InputMaybe<Scalars["String"]>;
}

/** Input for the createContact mutation */
export interface CreateContactInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  value?: InputMaybe<Scalars["String"]>;
}

/** Input for the createFaq mutation */
export interface CreateFaqInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createMediaItem mutation */
export interface CreateMediaItemInput {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars["String"]>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars["String"]>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars["String"]>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars["String"]>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars["String"]>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createPage mutation */
export interface CreatePageInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createPostFormat mutation */
export interface CreatePostFormatInput {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars["String"]>;
  /** The name of the post_format object to mutate */
  name: Scalars["String"];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the createPost mutation */
export interface CreatePostInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars["String"]>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
}

/** Input for the createProduct mutation */
export interface CreateProductInput {
  accurateDate?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  bookNowURL?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName: Scalars["String"];
  loanBasedAmount?: InputMaybe<Scalars["String"]>;
  memberApplyNowURL?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  minorMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  minorNonMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  nonMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  productApplyURL?: InputMaybe<Scalars["String"]>;
  productPageURL?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createProductName mutation */
export interface CreateProductNameInput {
  /** The slug that the productname will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the productname object */
  description?: InputMaybe<Scalars["String"]>;
  /** The name of the productname object to mutate */
  name: Scalars["String"];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the createRate mutation */
export interface CreateRateInput {
  aprapy?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName: Scalars["String"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  minimumBalance?: InputMaybe<Scalars["Float"]>;
  name: Scalars["String"];
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  payment?: InputMaybe<Scalars["Float"]>;
  /** Set connections between the rate and productNames */
  productNames?: InputMaybe<RateProductNamesInput>;
  rate?: InputMaybe<Scalars["Float"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  term?: InputMaybe<Scalars["String"]>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createService mutation */
export interface CreateServiceInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName: Scalars["String"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the createTag mutation */
export interface CreateTagInput {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars["String"]>;
  /** The name of the post_tag object to mutate */
  name: Scalars["String"];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the createUser mutation */
export interface CreateUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars["String"]>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars["String"]>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars["String"]>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars["String"]>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars["String"]>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars["String"]>;
  /** User's locale. */
  locale?: InputMaybe<Scalars["String"]>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars["String"]>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars["String"]>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars["String"]>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars["String"]>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars["String"]>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** A string that contains the user's username for logging in. */
  username: Scalars["String"];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars["String"]>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars["String"]>;
}

/** Date values */
export interface DateInput {
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars["Int"]>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars["Int"]>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars["Int"]>;
}

/** Filter the connection based on input */
export interface DateQueryInput {
  /** Nodes should be returned after this date */
  after?: InputMaybe<DateInput>;
  /** Nodes should be returned before this date */
  before?: InputMaybe<DateInput>;
  /** Column to query against */
  column?: InputMaybe<PostObjectsConnectionDateColumnEnum>;
  /** For after/before, whether exact value should be matched or not */
  compare?: InputMaybe<Scalars["String"]>;
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars["Int"]>;
  /** Hour (from 0 to 23) */
  hour?: InputMaybe<Scalars["Int"]>;
  /** For after/before, whether exact value should be matched or not */
  inclusive?: InputMaybe<Scalars["Boolean"]>;
  /** Minute (from 0 to 59) */
  minute?: InputMaybe<Scalars["Int"]>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars["Int"]>;
  /** OR or AND, how the sub-arrays should be compared */
  relation?: InputMaybe<RelationEnum>;
  /** Second (0 to 59) */
  second?: InputMaybe<Scalars["Int"]>;
  /** Week of the year (from 0 to 53) */
  week?: InputMaybe<Scalars["Int"]>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars["Int"]>;
}

/** Input for the deleteCXAlert mutation */
export interface DeleteCXAlertInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the CXAlert to delete */
  id: Scalars["ID"];
}

/** Input for the deleteCategory mutation */
export interface DeleteCategoryInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the category to delete */
  id: Scalars["ID"];
}

/** Input for the deleteComment mutation */
export interface DeleteCommentInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The deleted comment ID */
  id: Scalars["ID"];
}

/** Input for the deleteContact mutation */
export interface DeleteContactInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the contact to delete */
  id: Scalars["ID"];
}

/** Input for the deleteFaq mutation */
export interface DeleteFaqInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the faq to delete */
  id: Scalars["ID"];
}

/** Input for the deleteMediaItem mutation */
export interface DeleteMediaItemInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the mediaItem to delete */
  id: Scalars["ID"];
}

/** Input for the deletePage mutation */
export interface DeletePageInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the page to delete */
  id: Scalars["ID"];
}

/** Input for the deletePostFormat mutation */
export interface DeletePostFormatInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the postFormat to delete */
  id: Scalars["ID"];
}

/** Input for the deletePost mutation */
export interface DeletePostInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the post to delete */
  id: Scalars["ID"];
}

/** Input for the deleteProduct mutation */
export interface DeleteProductInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the product to delete */
  id: Scalars["ID"];
}

/** Input for the deleteProductName mutation */
export interface DeleteProductNameInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the productName to delete */
  id: Scalars["ID"];
}

/** Input for the deleteRate mutation */
export interface DeleteRateInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the rate to delete */
  id: Scalars["ID"];
}

/** Input for the deleteService mutation */
export interface DeleteServiceInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars["Boolean"]>;
  /** The ID of the service to delete */
  id: Scalars["ID"];
}

/** Input for the deleteTag mutation */
export interface DeleteTagInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the tag to delete */
  id: Scalars["ID"];
}

/** Input for the deleteUser mutation */
export interface DeleteUserInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the user you want to delete */
  id: Scalars["ID"];
  /** Reassign posts and links to new User ID. */
  reassignId?: InputMaybe<Scalars["ID"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum FaqIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** Arguments for filtering the FaqToCommentConnection connection */
export interface FaqToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Input for the generateAuthorizationCode mutation */
export interface GenerateAuthorizationCodeInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Email for WordPress user */
  email?: InputMaybe<Scalars["String"]>;
  /** Password for WordPress user */
  password?: InputMaybe<Scalars["String"]>;
  /** Username for WordPress user */
  username?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export interface HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export interface HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum MediaItemIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a media item by its source url */
  SOURCE_URL = "SOURCE_URL",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** The size of the media item object. */
export enum MediaItemSizeEnum {
  /** MediaItem with the gb-block-post-grid-landscape size */
  GB_BLOCK_POST_GRID_LANDSCAPE = "GB_BLOCK_POST_GRID_LANDSCAPE",
  /** MediaItem with the gb-block-post-grid-square size */
  GB_BLOCK_POST_GRID_SQUARE = "GB_BLOCK_POST_GRID_SQUARE",
  /** MediaItem with the genesis-block-theme-featured-image size */
  GENESIS_BLOCK_THEME_FEATURED_IMAGE = "GENESIS_BLOCK_THEME_FEATURED_IMAGE",
  /** MediaItem with the genesis-block-theme-featured-image-wide size */
  GENESIS_BLOCK_THEME_FEATURED_IMAGE_WIDE = "GENESIS_BLOCK_THEME_FEATURED_IMAGE_WIDE",
  /** MediaItem with the genesis-block-theme-logo size */
  GENESIS_BLOCK_THEME_LOGO = "GENESIS_BLOCK_THEME_LOGO",
  /** MediaItem with the large size */
  LARGE = "LARGE",
  /** MediaItem with the medium size */
  MEDIUM = "MEDIUM",
  /** MediaItem with the medium_large size */
  MEDIUM_LARGE = "MEDIUM_LARGE",
  /** MediaItem with the thumbnail size */
  THUMBNAIL = "THUMBNAIL",
  /** MediaItem with the 1536x1536 size */
  _1536X1536 = "_1536X1536",
  /** MediaItem with the 2048x2048 size */
  _2048X2048 = "_2048X2048",
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
  /** Objects with the auto-draft status */
  AUTO_DRAFT = "AUTO_DRAFT",
  /** Objects with the inherit status */
  INHERIT = "INHERIT",
  /** Objects with the private status */
  PRIVATE = "PRIVATE",
  /** Objects with the trash status */
  TRASH = "TRASH",
}

/** Arguments for filtering the MediaItemToCommentConnection connection */
export interface MediaItemToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuItemNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
}

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export interface MenuItemToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars["Int"]>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars["ID"]>;
}

/** Registered menu locations */
export enum MenuLocationEnum {
  /** Put the menu in the footer location */
  FOOTER = "FOOTER",
  /** Put the menu in the primary location */
  PRIMARY = "PRIMARY",
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuNodeIdTypeEnum {
  /** Identify a menu node by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a menu node by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a menu node by the slug of menu location to which it is assigned */
  LOCATION = "LOCATION",
  /** Identify a menu node by its name */
  NAME = "NAME",
  /** Identify a menu node by its slug */
  SLUG = "SLUG",
}

/** Arguments for filtering the MenuToMenuItemConnection connection */
export interface MenuToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars["Int"]>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars["ID"]>;
}

/** The MimeType of the object */
export enum MimeTypeEnum {
  /** MimeType application/java */
  APPLICATION_JAVA = "APPLICATION_JAVA",
  /** MimeType application/msword */
  APPLICATION_MSWORD = "APPLICATION_MSWORD",
  /** MimeType application/octet-stream */
  APPLICATION_OCTET_STREAM = "APPLICATION_OCTET_STREAM",
  /** MimeType application/onenote */
  APPLICATION_ONENOTE = "APPLICATION_ONENOTE",
  /** MimeType application/oxps */
  APPLICATION_OXPS = "APPLICATION_OXPS",
  /** MimeType application/pdf */
  APPLICATION_PDF = "APPLICATION_PDF",
  /** MimeType application/rar */
  APPLICATION_RAR = "APPLICATION_RAR",
  /** MimeType application/rtf */
  APPLICATION_RTF = "APPLICATION_RTF",
  /** MimeType application/ttaf+xml */
  APPLICATION_TTAF_XML = "APPLICATION_TTAF_XML",
  /** MimeType application/vnd.apple.keynote */
  APPLICATION_VND_APPLE_KEYNOTE = "APPLICATION_VND_APPLE_KEYNOTE",
  /** MimeType application/vnd.apple.numbers */
  APPLICATION_VND_APPLE_NUMBERS = "APPLICATION_VND_APPLE_NUMBERS",
  /** MimeType application/vnd.apple.pages */
  APPLICATION_VND_APPLE_PAGES = "APPLICATION_VND_APPLE_PAGES",
  /** MimeType application/vnd.ms-access */
  APPLICATION_VND_MS_ACCESS = "APPLICATION_VND_MS_ACCESS",
  /** MimeType application/vnd.ms-excel */
  APPLICATION_VND_MS_EXCEL = "APPLICATION_VND_MS_EXCEL",
  /** MimeType application/vnd.ms-excel.addin.macroEnabled.12 */
  APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12 = "APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12",
  /** MimeType application/vnd.ms-excel.sheet.binary.macroEnabled.12 */
  APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12 = "APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12",
  /** MimeType application/vnd.ms-excel.sheet.macroEnabled.12 */
  APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12 = "APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12",
  /** MimeType application/vnd.ms-excel.template.macroEnabled.12 */
  APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12 = "APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12",
  /** MimeType application/vnd.ms-powerpoint */
  APPLICATION_VND_MS_POWERPOINT = "APPLICATION_VND_MS_POWERPOINT",
  /** MimeType application/vnd.ms-powerpoint.addin.macroEnabled.12 */
  APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12 = "APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12",
  /** MimeType application/vnd.ms-powerpoint.presentation.macroEnabled.12 */
  APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12 = "APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12",
  /** MimeType application/vnd.ms-powerpoint.slideshow.macroEnabled.12 */
  APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12 = "APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12",
  /** MimeType application/vnd.ms-powerpoint.slide.macroEnabled.12 */
  APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12 = "APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12",
  /** MimeType application/vnd.ms-powerpoint.template.macroEnabled.12 */
  APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12 = "APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12",
  /** MimeType application/vnd.ms-project */
  APPLICATION_VND_MS_PROJECT = "APPLICATION_VND_MS_PROJECT",
  /** MimeType application/vnd.ms-word.document.macroEnabled.12 */
  APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12 = "APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12",
  /** MimeType application/vnd.ms-word.template.macroEnabled.12 */
  APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12 = "APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12",
  /** MimeType application/vnd.ms-write */
  APPLICATION_VND_MS_WRITE = "APPLICATION_VND_MS_WRITE",
  /** MimeType application/vnd.ms-xpsdocument */
  APPLICATION_VND_MS_XPSDOCUMENT = "APPLICATION_VND_MS_XPSDOCUMENT",
  /** MimeType application/vnd.oasis.opendocument.chart */
  APPLICATION_VND_OASIS_OPENDOCUMENT_CHART = "APPLICATION_VND_OASIS_OPENDOCUMENT_CHART",
  /** MimeType application/vnd.oasis.opendocument.database */
  APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE = "APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE",
  /** MimeType application/vnd.oasis.opendocument.formula */
  APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA = "APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA",
  /** MimeType application/vnd.oasis.opendocument.graphics */
  APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS = "APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS",
  /** MimeType application/vnd.oasis.opendocument.presentation */
  APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION = "APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION",
  /** MimeType application/vnd.oasis.opendocument.spreadsheet */
  APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET = "APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET",
  /** MimeType application/vnd.oasis.opendocument.text */
  APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT = "APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT",
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.presentation */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION",
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slide */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE",
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slideshow */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW",
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.template */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE",
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET",
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.template */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE",
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.document */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT",
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.template */
  APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE",
  /** MimeType application/wordperfect */
  APPLICATION_WORDPERFECT = "APPLICATION_WORDPERFECT",
  /** MimeType application/x-7z-compressed */
  APPLICATION_X_7Z_COMPRESSED = "APPLICATION_X_7Z_COMPRESSED",
  /** MimeType application/x-gzip */
  APPLICATION_X_GZIP = "APPLICATION_X_GZIP",
  /** MimeType application/x-tar */
  APPLICATION_X_TAR = "APPLICATION_X_TAR",
  /** MimeType application/zip */
  APPLICATION_ZIP = "APPLICATION_ZIP",
  /** MimeType audio/aac */
  AUDIO_AAC = "AUDIO_AAC",
  /** MimeType audio/flac */
  AUDIO_FLAC = "AUDIO_FLAC",
  /** MimeType audio/midi */
  AUDIO_MIDI = "AUDIO_MIDI",
  /** MimeType audio/mpeg */
  AUDIO_MPEG = "AUDIO_MPEG",
  /** MimeType audio/ogg */
  AUDIO_OGG = "AUDIO_OGG",
  /** MimeType audio/wav */
  AUDIO_WAV = "AUDIO_WAV",
  /** MimeType audio/x-matroska */
  AUDIO_X_MATROSKA = "AUDIO_X_MATROSKA",
  /** MimeType audio/x-ms-wax */
  AUDIO_X_MS_WAX = "AUDIO_X_MS_WAX",
  /** MimeType audio/x-ms-wma */
  AUDIO_X_MS_WMA = "AUDIO_X_MS_WMA",
  /** MimeType audio/x-realaudio */
  AUDIO_X_REALAUDIO = "AUDIO_X_REALAUDIO",
  /** MimeType image/bmp */
  IMAGE_BMP = "IMAGE_BMP",
  /** MimeType image/gif */
  IMAGE_GIF = "IMAGE_GIF",
  /** MimeType image/heic */
  IMAGE_HEIC = "IMAGE_HEIC",
  /** MimeType image/jpeg */
  IMAGE_JPEG = "IMAGE_JPEG",
  /** MimeType image/png */
  IMAGE_PNG = "IMAGE_PNG",
  /** MimeType image/svg+xml */
  IMAGE_SVG_XML = "IMAGE_SVG_XML",
  /** MimeType image/tiff */
  IMAGE_TIFF = "IMAGE_TIFF",
  /** MimeType image/webp */
  IMAGE_WEBP = "IMAGE_WEBP",
  /** MimeType image/x-icon */
  IMAGE_X_ICON = "IMAGE_X_ICON",
  /** MimeType text/calendar */
  TEXT_CALENDAR = "TEXT_CALENDAR",
  /** MimeType text/css */
  TEXT_CSS = "TEXT_CSS",
  /** MimeType text/csv */
  TEXT_CSV = "TEXT_CSV",
  /** MimeType text/plain */
  TEXT_PLAIN = "TEXT_PLAIN",
  /** MimeType text/richtext */
  TEXT_RICHTEXT = "TEXT_RICHTEXT",
  /** MimeType text/tab-separated-values */
  TEXT_TAB_SEPARATED_VALUES = "TEXT_TAB_SEPARATED_VALUES",
  /** MimeType text/vtt */
  TEXT_VTT = "TEXT_VTT",
  /** MimeType video/3gpp */
  VIDEO_3GPP = "VIDEO_3GPP",
  /** MimeType video/3gpp2 */
  VIDEO_3GPP2 = "VIDEO_3GPP2",
  /** MimeType video/avi */
  VIDEO_AVI = "VIDEO_AVI",
  /** MimeType video/divx */
  VIDEO_DIVX = "VIDEO_DIVX",
  /** MimeType video/mp4 */
  VIDEO_MP4 = "VIDEO_MP4",
  /** MimeType video/mpeg */
  VIDEO_MPEG = "VIDEO_MPEG",
  /** MimeType video/ogg */
  VIDEO_OGG = "VIDEO_OGG",
  /** MimeType video/quicktime */
  VIDEO_QUICKTIME = "VIDEO_QUICKTIME",
  /** MimeType video/webm */
  VIDEO_WEBM = "VIDEO_WEBM",
  /** MimeType video/x-flv */
  VIDEO_X_FLV = "VIDEO_X_FLV",
  /** MimeType video/x-matroska */
  VIDEO_X_MATROSKA = "VIDEO_X_MATROSKA",
  /** MimeType video/x-ms-asf */
  VIDEO_X_MS_ASF = "VIDEO_X_MS_ASF",
  /** MimeType video/x-ms-wm */
  VIDEO_X_MS_WM = "VIDEO_X_MS_WM",
  /** MimeType video/x-ms-wmv */
  VIDEO_X_MS_WMV = "VIDEO_X_MS_WMV",
  /** MimeType video/x-ms-wmx */
  VIDEO_X_MS_WMX = "VIDEO_X_MS_WMX",
}

/** The cardinality of the connection order */
export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  ASC = "ASC",
  /** Sort the query result set in a descending order */
  DESC = "DESC",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PageIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** Arguments for filtering the PageToCommentConnection connection */
export interface PageToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the PageToRevisionConnection connection */
export interface PageToRevisionConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The status of the WordPress plugin. */
export enum PluginStatusEnum {
  /** The plugin is currently active. */
  ACTIVE = "ACTIVE",
  /** The plugin is a drop-in plugin. */
  DROP_IN = "DROP_IN",
  /** The plugin is currently inactive. */
  INACTIVE = "INACTIVE",
  /** The plugin is a must-use plugin. */
  MUST_USE = "MUST_USE",
  /** The plugin is technically active but was paused while loading. */
  PAUSED = "PAUSED",
  /** The plugin was active recently. */
  RECENTLY_ACTIVE = "RECENTLY_ACTIVE",
  /** The plugin has an upgrade available. */
  UPGRADE = "UPGRADE",
}

/** Set relationships between the post to categories */
export interface PostCategoriesInput {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars["Boolean"]>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostCategoriesNodeInput>>>;
}

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostCategoriesNodeInput {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars["ID"]>;
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars["String"]>;
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostFormatIdType {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The hashed Global ID */
  ID = "ID",
  /** The name of the node */
  NAME = "NAME",
  /** Url friendly name of the node */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
}

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export interface PostFormatToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfPostFormatEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the PostFormatToPostConnection connection */
export interface PostFormatToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
  /** Provide the field value directly from database. Null on unauthenticated requests. */
  RAW = "RAW",
  /** Provide the field value as rendered by WordPress. Default. */
  RENDERED = "RENDERED",
}

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
  /** The date the comment was created in local time. */
  DATE = "DATE",
  /** The most recent modification date of the comment. */
  MODIFIED = "MODIFIED",
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
  /** Order by author */
  AUTHOR = "AUTHOR",
  /** Order by the number of comments it has acquired */
  COMMENT_COUNT = "COMMENT_COUNT",
  /** Order by publish date */
  DATE = "DATE",
  /** Preserve the ID order given in the IN array */
  IN = "IN",
  /** Order by the menu order value */
  MENU_ORDER = "MENU_ORDER",
  /** Order by last modified date */
  MODIFIED = "MODIFIED",
  /** Preserve slug order given in the NAME_IN array */
  NAME_IN = "NAME_IN",
  /** Order by parent ID */
  PARENT = "PARENT",
  /** Order by slug */
  SLUG = "SLUG",
  /** Order by title */
  TITLE = "TITLE",
}

/** Options for ordering the connection */
export interface PostObjectsConnectionOrderbyInput {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum;
  /** Possible directions in which to order a list of items */
  order: OrderEnum;
}

/** Set relationships between the post to postFormats */
export interface PostPostFormatsInput {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars["Boolean"]>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostPostFormatsNodeInput>>>;
}

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostPostFormatsNodeInput {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars["ID"]>;
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars["String"]>;
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** The status of the object. */
export enum PostStatusEnum {
  /** Objects with the acf-disabled status */
  ACF_DISABLED = "ACF_DISABLED",
  /** Objects with the auto-draft status */
  AUTO_DRAFT = "AUTO_DRAFT",
  /** Objects with the dp-rewrite-republish status */
  DP_REWRITE_REPUBLISH = "DP_REWRITE_REPUBLISH",
  /** Objects with the draft status */
  DRAFT = "DRAFT",
  /** Objects with the draft-revision status */
  DRAFT_REVISION = "DRAFT_REVISION",
  /** Objects with the future status */
  FUTURE = "FUTURE",
  /** Objects with the future-revision status */
  FUTURE_REVISION = "FUTURE_REVISION",
  /** Objects with the inherit status */
  INHERIT = "INHERIT",
  /** Objects with the pending status */
  PENDING = "PENDING",
  /** Objects with the pending-revision status */
  PENDING_REVISION = "PENDING_REVISION",
  /** Objects with the private status */
  PRIVATE = "PRIVATE",
  /** Objects with the publish status */
  PUBLISH = "PUBLISH",
  /** Objects with the request-completed status */
  REQUEST_COMPLETED = "REQUEST_COMPLETED",
  /** Objects with the request-confirmed status */
  REQUEST_CONFIRMED = "REQUEST_CONFIRMED",
  /** Objects with the request-failed status */
  REQUEST_FAILED = "REQUEST_FAILED",
  /** Objects with the request-pending status */
  REQUEST_PENDING = "REQUEST_PENDING",
  /** Objects with the trash status */
  TRASH = "TRASH",
  /** Objects with the wp_stream_disabled status */
  WP_STREAM_DISABLED = "WP_STREAM_DISABLED",
  /** Objects with the wp_stream_enabled status */
  WP_STREAM_ENABLED = "WP_STREAM_ENABLED",
}

/** Set relationships between the post to tags */
export interface PostTagsInput {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars["Boolean"]>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostTagsNodeInput>>>;
}

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface PostTagsNodeInput {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars["ID"]>;
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars["String"]>;
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the PostToCategoryConnection connection */
export interface PostToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the PostToCommentConnection connection */
export interface PostToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the PostToPostFormatConnection connection */
export interface PostToPostFormatConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the PostToRevisionConnection connection */
export interface PostToRevisionConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the PostToTagConnection connection */
export interface PostToTagConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the PostToTermNodeConnection connection */
export interface PostToTermNodeConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ProductIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ProductNameIdType {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The hashed Global ID */
  ID = "ID",
  /** The name of the node */
  NAME = "NAME",
  /** Url friendly name of the node */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
}

/** Arguments for filtering the ProductNameToContentNodeConnection connection */
export interface ProductNameToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfProductNameEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the ProductNameToRateConnection connection */
export interface ProductNameToRateConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum RateIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** Set relationships between the rate to productNames */
export interface RateProductNamesInput {
  /** If true, this will append the productName to existing related productNames. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars["Boolean"]>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<RateProductNamesNodeInput>>>;
}

/** List of productNames to connect the rate to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export interface RateProductNamesNodeInput {
  /** The description of the productName. This field is used to set a description of the productName if a new one is created during the mutation. */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the productName. If present, this will be used to connect to the rate. If no existing productName exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars["ID"]>;
  /** The name of the productName. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars["String"]>;
  /** The slug of the productName. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RateToProductNameConnection connection */
export interface RateToProductNameConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RateToTermNodeConnection connection */
export interface RateToTermNodeConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Input for the registerUser mutation */
export interface RegisterUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars["String"]>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars["String"]>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars["String"]>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars["String"]>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars["String"]>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars["String"]>;
  /** User's locale. */
  locale?: InputMaybe<Scalars["String"]>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars["String"]>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars["String"]>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars["String"]>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars["String"]>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars["String"]>;
  /** A string that contains the user's username. */
  username: Scalars["String"];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars["String"]>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars["String"]>;
}

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
  /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
  AND = "AND",
  /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
  OR = "OR",
}

/** Input for the resetUserPassword mutation */
export interface ResetUserPasswordInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Password reset key */
  key?: InputMaybe<Scalars["String"]>;
  /** The user's login (username). */
  login?: InputMaybe<Scalars["String"]>;
  /** The new password. */
  password?: InputMaybe<Scalars["String"]>;
}

/** Input for the restoreComment mutation */
export interface RestoreCommentInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The ID of the comment to be restored */
  id: Scalars["ID"];
}

/** Arguments for filtering the RootQueryToCXAlertConnection connection */
export interface RootQueryToCXAlertConnectionWhereArgs {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export interface RootQueryToCategoryConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RootQueryToCommentConnection connection */
export interface RootQueryToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the RootQueryToContactConnection connection */
export interface RootQueryToContactConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export interface RootQueryToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToContentRevisionUnionConnection connection */
export interface RootQueryToContentRevisionUnionConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToFaqConnection connection */
export interface RootQueryToFaqConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export interface RootQueryToMediaItemConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToMenuConnection connection */
export interface RootQueryToMenuConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The slug of the menu to query items for */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export interface RootQueryToMenuItemConnectionWhereArgs {
  /** The database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars["Int"]>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the RootQueryToPageConnection connection */
export interface RootQueryToPageConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToPluginConnection connection */
export interface RootQueryToPluginConnectionWhereArgs {
  /** Show plugin based on a keyword search. */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve plugins where plugin status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PluginStatusEnum>>>;
  /** Show plugins with a specific status. */
  status?: InputMaybe<PluginStatusEnum>;
}

/** Arguments for filtering the RootQueryToPostConnection connection */
export interface RootQueryToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export interface RootQueryToPostFormatConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RootQueryToProductConnection connection */
export interface RootQueryToProductConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToProductNameConnection connection */
export interface RootQueryToProductNameConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RootQueryToRateConnection connection */
export interface RootQueryToRateConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToServiceConnection connection */
export interface RootQueryToServiceConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the RootQueryToTagConnection connection */
export interface RootQueryToTagConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export interface RootQueryToTermNodeConnectionWhereArgs {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars["String"]>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars["Int"]>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars["Boolean"]>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars["String"]>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars["Boolean"]>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars["Boolean"]>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars["String"]>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars["Boolean"]>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars["Boolean"]>;
}

/** Arguments for filtering the RootQueryToUserConnection connection */
export interface RootQueryToUserConnectionWhereArgs {
  /** Array of userIds to exclude. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of userIds to include. */
  include?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  /** The user login. */
  login?: InputMaybe<Scalars["String"]>;
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** The user nicename. */
  nicename?: InputMaybe<Scalars["String"]>;
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<UsersConnectionOrderbyInput>>>;
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: InputMaybe<UserRoleEnum>;
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: InputMaybe<Scalars["String"]>;
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: InputMaybe<
    Array<InputMaybe<UsersConnectionSearchColumnEnum>>
  >;
}

/** Input for the sendPasswordResetEmail mutation */
export interface SendPasswordResetEmailInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** A string that contains the user's username or email address. */
  username: Scalars["String"];
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ServiceIdType {
  /** Identify a resource by the Database ID. */
  DATABASE_ID = "DATABASE_ID",
  /** Identify a resource by the (hashed) Global ID. */
  ID = "ID",
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  SLUG = "SLUG",
  /** Identify a resource by the URI. */
  URI = "URI",
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TagIdType {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The hashed Global ID */
  ID = "ID",
  /** The name of the node */
  NAME = "NAME",
  /** Url friendly name of the node */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
}

/** Arguments for filtering the TagToContentNodeConnection connection */
export interface TagToContentNodeConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfTagEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the TagToPostConnection connection */
export interface TagToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Allowed taxonomies */
export enum TaxonomyEnum {
  /** Taxonomy enum category */
  CATEGORY = "CATEGORY",
  /** Taxonomy enum post_format */
  POSTFORMAT = "POSTFORMAT",
  /** Taxonomy enum productname */
  PRODUCTNAME = "PRODUCTNAME",
  /** Taxonomy enum post_tag */
  TAG = "TAG",
}

/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
export enum TaxonomyIdTypeEnum {
  /** The globally unique ID */
  ID = "ID",
  /** The name of the taxonomy */
  NAME = "NAME",
}

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export enum TermNodeIdTypeEnum {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The hashed Global ID */
  ID = "ID",
  /** The name of the node */
  NAME = "NAME",
  /** Url friendly name of the node */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
}

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
  /** Order the connection by item count. */
  COUNT = "COUNT",
  /** Order the connection by description. */
  DESCRIPTION = "DESCRIPTION",
  /** Order the connection by name. */
  NAME = "NAME",
  /** Order the connection by slug. */
  SLUG = "SLUG",
  /** Order the connection by term group. */
  TERM_GROUP = "TERM_GROUP",
  /** Order the connection by term id. */
  TERM_ID = "TERM_ID",
  /** Order the connection by term order. */
  TERM_ORDER = "TERM_ORDER",
}

/** Input for the updateCXAlert mutation */
export interface UpdateCXAlertInput {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The ID of the CXAlert object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the UpdateCategory mutation */
export interface UpdateCategoryInput {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the category object */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the category object to update */
  id: Scalars["ID"];
  /** The name of the category object to mutate */
  name?: InputMaybe<Scalars["String"]>;
  /** The ID of the category that should be set as the parent */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateComment mutation */
export interface UpdateCommentInput {
  /** The approval status of the comment. */
  approved?: InputMaybe<Scalars["String"]>;
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars["String"]>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars["Int"]>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The ID of the comment being updated. */
  id: Scalars["ID"];
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Type of comment. */
  type?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateContact mutation */
export interface UpdateContactInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  /** The ID of the contact object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  value?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateFaq mutation */
export interface UpdateFaqInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** The ID of the faq object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateMediaItem mutation */
export interface UpdateMediaItemInput {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars["String"]>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars["String"]>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars["String"]>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars["String"]>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the mediaItem object */
  id: Scalars["ID"];
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars["String"]>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the updatePage mutation */
export interface UpdatePageInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** The ID of the page object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars["ID"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the UpdatePostFormat mutation */
export interface UpdatePostFormatInput {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the postFormat object to update */
  id: Scalars["ID"];
  /** The name of the post_format object to mutate */
  name?: InputMaybe<Scalars["String"]>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the updatePost mutation */
export interface UpdatePostInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars["String"]>;
  /** The content of the object */
  content?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars["String"]>;
  /** The ID of the post object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars["String"]>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
}

/** Input for the updateProduct mutation */
export interface UpdateProductInput {
  accurateDate?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  bookNowURL?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  /** The ID of the product object */
  id: Scalars["ID"];
  loanBasedAmount?: InputMaybe<Scalars["String"]>;
  memberApplyNowURL?: InputMaybe<Scalars["String"]>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  minorMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  minorNonMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  nonMemberApplyNowURL?: InputMaybe<Scalars["String"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  productApplyURL?: InputMaybe<Scalars["String"]>;
  productPageURL?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the UpdateProductName mutation */
export interface UpdateProductNameInput {
  /** The slug that the productname will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the productname object */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the productName object to update */
  id: Scalars["ID"];
  /** The name of the productname object to mutate */
  name?: InputMaybe<Scalars["String"]>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateRate mutation */
export interface UpdateRateInput {
  aprapy?: InputMaybe<Scalars["String"]>;
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  /** The ID of the rate object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  minimumBalance?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  payment?: InputMaybe<Scalars["Float"]>;
  /** Set connections between the rate and productNames */
  productNames?: InputMaybe<RateProductNamesInput>;
  rate?: InputMaybe<Scalars["Float"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  term?: InputMaybe<Scalars["String"]>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateService mutation */
export interface UpdateServiceInput {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars["ID"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  /** The ID of the service object */
  id: Scalars["ID"];
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars["String"]>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars["String"]>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateSettings mutation */
export interface UpdateSettingsInput {
  /** Opt into anonymous usage tracking to help us make Atlas Content Modeler better. */
  atlasContentModelerSettingsSettingsAtlasContentModelerUsageTracking?: InputMaybe<
    Scalars["String"]
  >;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** Allow people to submit comments on new posts. */
  discussionSettingsDefaultCommentStatus?: InputMaybe<Scalars["String"]>;
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  discussionSettingsDefaultPingStatus?: InputMaybe<Scalars["String"]>;
  /** A date format for all date strings. */
  generalSettingsDateFormat?: InputMaybe<Scalars["String"]>;
  /** Site tagline. */
  generalSettingsDescription?: InputMaybe<Scalars["String"]>;
  /** This address is used for admin purposes, like new user notification. */
  generalSettingsEmail?: InputMaybe<Scalars["String"]>;
  /** WordPress locale code. */
  generalSettingsLanguage?: InputMaybe<Scalars["String"]>;
  /** A day number of the week that the week should start on. */
  generalSettingsStartOfWeek?: InputMaybe<Scalars["Int"]>;
  /** A time format for all time strings. */
  generalSettingsTimeFormat?: InputMaybe<Scalars["String"]>;
  /** A city in the same timezone as you. */
  generalSettingsTimezone?: InputMaybe<Scalars["String"]>;
  /** Site title. */
  generalSettingsTitle?: InputMaybe<Scalars["String"]>;
  /** Site URL. */
  generalSettingsUrl?: InputMaybe<Scalars["String"]>;
  genesisBlocksGlobalSettingsSettingsGenesisBlocksMailchimpApiKey?: InputMaybe<
    Scalars["String"]
  >;
  genesisBlocksGlobalSettingsSettingsGenesisProSubscriptionKey?: InputMaybe<
    Scalars["String"]
  >;
  /** The ID of the page that should display the latest posts */
  readingSettingsPageForPosts?: InputMaybe<Scalars["Int"]>;
  /** The ID of the page that should be displayed on the front page */
  readingSettingsPageOnFront?: InputMaybe<Scalars["Int"]>;
  /** Blog pages show at most. */
  readingSettingsPostsPerPage?: InputMaybe<Scalars["Int"]>;
  /** What to show on the front page */
  readingSettingsShowOnFront?: InputMaybe<Scalars["String"]>;
  /** Default post category. */
  writingSettingsDefaultCategory?: InputMaybe<Scalars["Int"]>;
  /** Default post format. */
  writingSettingsDefaultPostFormat?: InputMaybe<Scalars["String"]>;
  /** Convert emoticons like :-) and :-P to graphics on display. */
  writingSettingsUseSmilies?: InputMaybe<Scalars["Boolean"]>;
}

/** Input for the UpdateTag mutation */
export interface UpdateTagInput {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars["String"]>;
  /** The ID of the tag object to update */
  id: Scalars["ID"];
  /** The name of the post_tag object to mutate */
  name?: InputMaybe<Scalars["String"]>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars["String"]>;
}

/** Input for the updateUser mutation */
export interface UpdateUserInput {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars["String"]>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars["String"]>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars["String"]>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars["String"]>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars["String"]>;
  /** 	The user's first name. */
  firstName?: InputMaybe<Scalars["String"]>;
  /** The ID of the user */
  id: Scalars["ID"];
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars["String"]>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars["String"]>;
  /** User's locale. */
  locale?: InputMaybe<Scalars["String"]>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars["String"]>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars["String"]>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars["String"]>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars["String"]>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars["String"]>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars["String"]>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars["String"]>;
}

/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
export enum UserNodeIdTypeEnum {
  /** The Database ID for the node */
  DATABASE_ID = "DATABASE_ID",
  /** The Email of the User */
  EMAIL = "EMAIL",
  /** The hashed Global ID */
  ID = "ID",
  /** The slug of the User */
  SLUG = "SLUG",
  /** The URI for the node */
  URI = "URI",
  /** The username the User uses to login with */
  USERNAME = "USERNAME",
}

/** Names of available user roles */
export enum UserRoleEnum {
  /** User role with specific capabilities */
  ADMINISTRATOR = "ADMINISTRATOR",
  /** User role with specific capabilities */
  AUTHOR = "AUTHOR",
  /** User role with specific capabilities */
  CONTRIBUTOR = "CONTRIBUTOR",
  /** User role with specific capabilities */
  EDITOR = "EDITOR",
  /** User role with specific capabilities */
  GRAPHIC_DESIGNER = "GRAPHIC_DESIGNER",
  /** User role with specific capabilities */
  PRODUCTS = "PRODUCTS",
  /** User role with specific capabilities */
  REVISOR = "REVISOR",
  /** User role with specific capabilities */
  SEO_EDITOR = "SEO_EDITOR",
  /** User role with specific capabilities */
  SEO_MANAGER = "SEO_MANAGER",
  /** User role with specific capabilities */
  STORE_LOCATOR_MANAGER = "STORE_LOCATOR_MANAGER",
  /** User role with specific capabilities */
  SUBSCRIBER = "SUBSCRIBER",
}

/** Arguments for filtering the UserToCommentConnection connection */
export interface UserToCommentConnectionWhereArgs {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars["String"]>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars["String"]>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars["String"]>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars["String"]>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars["ID"]>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars["String"]>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars["Int"]>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars["Int"]>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars["Int"]>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars["String"]>;
  /** Comment status to limit results by. */
  status?: InputMaybe<Scalars["String"]>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars["ID"]>;
}

/** Arguments for filtering the UserToContactConnection connection */
export interface UserToContactConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToContentRevisionUnionConnection connection */
export interface UserToContentRevisionUnionConnectionWhereArgs {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToFaqConnection connection */
export interface UserToFaqConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToMediaItemConnection connection */
export interface UserToMediaItemConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToPageConnection connection */
export interface UserToPageConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToPostConnection connection */
export interface UserToPostConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars["Int"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars["String"]>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars["String"]>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars["String"]>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToProductConnection connection */
export interface UserToProductConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToRateConnection connection */
export interface UserToRateConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Arguments for filtering the UserToServiceConnection connection */
export interface UserToServiceConnectionWhereArgs {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars["Int"]>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars["String"]>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars["Boolean"]>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars["Int"]>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars["String"]>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars["ID"]>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars["String"]>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars["String"]>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars["String"]>;
}

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
  /** Order by display name */
  DISPLAY_NAME = "DISPLAY_NAME",
  /** Order by email address */
  EMAIL = "EMAIL",
  /** Order by login */
  LOGIN = "LOGIN",
  /** Preserve the login order given in the LOGIN_IN array */
  LOGIN_IN = "LOGIN_IN",
  /** Order by nice name */
  NICE_NAME = "NICE_NAME",
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  NICE_NAME_IN = "NICE_NAME_IN",
  /** Order by registration date */
  REGISTERED = "REGISTERED",
  /** Order by URL */
  URL = "URL",
}

/** Options for ordering the connection */
export interface UsersConnectionOrderbyInput {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
}

/** Column used for searching for users. */
export enum UsersConnectionSearchColumnEnum {
  /** The user's email address. */
  EMAIL = "EMAIL",
  /** The globally unique ID. */
  ID = "ID",
  /** The username the User uses to login with. */
  LOGIN = "LOGIN",
  /** A URL-friendly name for the user. The default is the user's username. */
  NICENAME = "NICENAME",
  /** The URL of the user\s website. */
  URL = "URL",
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  AvatarRatingEnum: true,
  Boolean: true,
  CXAlertIdType: true,
  CategoryIdType: true,
  CommentNodeIdTypeEnum: true,
  CommentsConnectionOrderbyEnum: true,
  ContactIdType: true,
  ContentNodeIdTypeEnum: true,
  ContentTypeEnum: true,
  ContentTypeIdTypeEnum: true,
  ContentTypesOfCategoryEnum: true,
  ContentTypesOfPostFormatEnum: true,
  ContentTypesOfProductNameEnum: true,
  ContentTypesOfTagEnum: true,
  FaqIdType: true,
  Float: true,
  ID: true,
  Int: true,
  MediaItemIdType: true,
  MediaItemSizeEnum: true,
  MediaItemStatusEnum: true,
  MenuItemNodeIdTypeEnum: true,
  MenuLocationEnum: true,
  MenuNodeIdTypeEnum: true,
  MimeTypeEnum: true,
  OrderEnum: true,
  PageIdType: true,
  PluginStatusEnum: true,
  PostFormatIdType: true,
  PostIdType: true,
  PostObjectFieldFormatEnum: true,
  PostObjectsConnectionDateColumnEnum: true,
  PostObjectsConnectionOrderbyEnum: true,
  PostStatusEnum: true,
  ProductIdType: true,
  ProductNameIdType: true,
  RateIdType: true,
  RelationEnum: true,
  ServiceIdType: true,
  String: true,
  TagIdType: true,
  TaxonomyEnum: true,
  TaxonomyIdTypeEnum: true,
  TermNodeIdTypeEnum: true,
  TermObjectsConnectionOrderbyEnum: true,
  UserNodeIdTypeEnum: true,
  UserRoleEnum: true,
  UsersConnectionOrderbyEnum: true,
  UsersConnectionSearchColumnEnum: true,
};
export const generatedSchema = {
  AtlasContentModelerSettingsSettings: {
    __typename: { __type: "String!" },
    atlasContentModelerUsageTracking: { __type: "String" },
  },
  Avatar: {
    __typename: { __type: "String!" },
    default: { __type: "String" },
    extraAttr: { __type: "String" },
    forceDefault: { __type: "Boolean" },
    foundAvatar: { __type: "Boolean" },
    height: { __type: "Int" },
    isRestricted: { __type: "Boolean" },
    rating: { __type: "String" },
    scheme: { __type: "String" },
    size: { __type: "Int" },
    url: { __type: "String" },
    width: { __type: "Int" },
  },
  CXAlert: {
    __typename: { __type: "String!" },
    cXAlertId: { __type: "Int!" },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isRevision: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    menuOrder: { __type: "Int" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    preview: { __type: "CXAlertToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    revisionOf: { __type: "NodeWithRevisionsToContentNodeConnectionEdge" },
    revisions: {
      __type: "CXAlertToRevisionConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "CXAlertToRevisionConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  CXAlertToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "CXAlert" },
  },
  CXAlertToRevisionConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CXAlertToRevisionConnectionEdge]" },
    nodes: { __type: "[CXAlert]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CXAlertToRevisionConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "CXAlert" },
  },
  CXAlertToRevisionConnectionWhereArgs: {
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  Category: {
    __typename: { __type: "String!" },
    ancestors: {
      __type: "CategoryToAncestorsCategoryConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    categoryId: { __type: "Int" },
    children: {
      __type: "CategoryToCategoryConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "CategoryToCategoryConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    contentNodes: {
      __type: "CategoryToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "CategoryToContentNodeConnectionWhereArgs",
      },
    },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    enqueuedScripts: {
      __type: "TermNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "TermNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    link: { __type: "String" },
    name: { __type: "String" },
    parent: { __type: "CategoryToParentCategoryConnectionEdge" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    posts: {
      __type: "CategoryToPostConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "CategoryToPostConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    taxonomy: { __type: "CategoryToTaxonomyConnectionEdge" },
    taxonomyName: { __type: "String" },
    templates: { __type: "[String]" },
    termGroupId: { __type: "Int" },
    termTaxonomyId: { __type: "Int" },
    uri: { __type: "String" },
  },
  CategoryToAncestorsCategoryConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CategoryToAncestorsCategoryConnectionEdge]" },
    nodes: { __type: "[Category]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CategoryToAncestorsCategoryConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Category" },
  },
  CategoryToCategoryConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CategoryToCategoryConnectionEdge]" },
    nodes: { __type: "[Category]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CategoryToCategoryConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Category" },
  },
  CategoryToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  CategoryToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CategoryToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CategoryToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  CategoryToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypesOfCategoryEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CategoryToParentCategoryConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Category" },
  },
  CategoryToPostConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CategoryToPostConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CategoryToPostConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  CategoryToPostConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  CategoryToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Taxonomy" },
  },
  Comment: {
    __typename: { __type: "String!" },
    agent: { __type: "String" },
    approved: { __type: "Boolean" },
    author: { __type: "CommentToCommenterConnectionEdge" },
    authorIp: { __type: "String" },
    commentId: { __type: "Int" },
    commentedOn: { __type: "CommentToContentNodeConnectionEdge" },
    content: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    karma: { __type: "Int" },
    parent: {
      __type: "CommentToParentCommentConnectionEdge",
      __args: { where: "CommentToParentCommentConnectionWhereArgs" },
    },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    replies: {
      __type: "CommentToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "CommentToCommentConnectionWhereArgs",
      },
    },
    type: { __type: "String" },
  },
  CommentAuthor: {
    __typename: { __type: "String!" },
    avatar: {
      __type: "Avatar",
      __args: {
        forceDefault: "Boolean",
        rating: "AvatarRatingEnum",
        size: "Int",
      },
    },
    databaseId: { __type: "Int!" },
    email: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    name: { __type: "String" },
    url: { __type: "String" },
  },
  CommentToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[CommentToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  CommentToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  CommentToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  CommentToCommenterConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Commenter" },
  },
  CommentToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "ContentNode" },
  },
  CommentToParentCommentConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Comment" },
  },
  CommentToParentCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  Commenter: {
    __typename: { __type: "String!" },
    avatar: { __type: "Avatar" },
    databaseId: { __type: "Int!" },
    email: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    name: { __type: "String" },
    url: { __type: "String" },
    $on: { __type: "$Commenter!" },
  },
  ConditionalTags: {
    __typename: { __type: "String!" },
    isArchive: { __type: "Boolean" },
    isAttachment: { __type: "Boolean" },
    isAuthor: { __type: "Boolean" },
    isCategory: { __type: "Boolean" },
    isDate: { __type: "Boolean" },
    isDay: { __type: "Boolean" },
    isFrontPage: { __type: "Boolean" },
    isHome: { __type: "Boolean" },
    isMonth: { __type: "Boolean" },
    isMultiAuthor: { __type: "Boolean" },
    isPage: { __type: "Boolean" },
    isPageTemplate: { __type: "Boolean" },
    isPostTypeArchive: { __type: "Boolean" },
    isPreview: { __type: "Boolean" },
    isPrivacyPolicy: { __type: "Boolean" },
    isSearch: { __type: "Boolean" },
    isSingle: { __type: "Boolean" },
    isSingular: { __type: "Boolean" },
    isSticky: { __type: "Boolean" },
    isTag: { __type: "Boolean" },
    isTax: { __type: "Boolean" },
    isYear: { __type: "Boolean" },
  },
  Contact: {
    __typename: { __type: "String!" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    conditionalTags: { __type: "ConditionalTags" },
    contactId: { __type: "Int!" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    displayName: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    name: { __type: "String" },
    preview: { __type: "ContactToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    type: { __type: "[String]" },
    uri: { __type: "String" },
    value: { __type: "String" },
  },
  ContactToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Contact" },
  },
  ContentNode: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    uri: { __type: "String" },
    $on: { __type: "$ContentNode!" },
  },
  ContentNodeToContentTypeConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "ContentType" },
  },
  ContentNodeToEditLastConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "User" },
  },
  ContentNodeToEditLockConnectionEdge: {
    __typename: { __type: "String!" },
    lockTimestamp: { __type: "String" },
    node: { __type: "User" },
  },
  ContentNodeToEnqueuedScriptConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ContentNodeToEnqueuedScriptConnectionEdge]" },
    nodes: { __type: "[EnqueuedScript]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ContentNodeToEnqueuedScriptConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedScript" },
  },
  ContentNodeToEnqueuedStylesheetConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ContentNodeToEnqueuedStylesheetConnectionEdge]" },
    nodes: { __type: "[EnqueuedStylesheet]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ContentNodeToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedStylesheet" },
  },
  ContentRevisionUnion: {
    __typename: { __type: "String!" },
    $on: { __type: "$ContentRevisionUnion!" },
  },
  ContentTemplate: {
    __typename: { __type: "String!" },
    templateName: { __type: "String" },
    $on: { __type: "$ContentTemplate!" },
  },
  ContentType: {
    __typename: { __type: "String!" },
    canExport: { __type: "Boolean" },
    conditionalTags: { __type: "ConditionalTags" },
    connectedTaxonomies: {
      __type: "ContentTypeToTaxonomyConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    contentNodes: {
      __type: "ContentTypeToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "ContentTypeToContentNodeConnectionWhereArgs",
      },
    },
    deleteWithUser: { __type: "Boolean" },
    description: { __type: "String" },
    excludeFromSearch: { __type: "Boolean" },
    graphqlPluralName: { __type: "String" },
    graphqlSingleName: { __type: "String" },
    hasArchive: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isFrontPage: { __type: "Boolean!" },
    isPostsPage: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    label: { __type: "String" },
    labels: { __type: "PostTypeLabelDetails" },
    menuIcon: { __type: "String" },
    menuPosition: { __type: "Int" },
    name: { __type: "String" },
    public: { __type: "Boolean" },
    publiclyQueryable: { __type: "Boolean" },
    restBase: { __type: "String" },
    restControllerClass: { __type: "String" },
    showInAdminBar: { __type: "Boolean" },
    showInGraphql: { __type: "Boolean" },
    showInMenu: { __type: "Boolean" },
    showInNavMenus: { __type: "Boolean" },
    showInRest: { __type: "Boolean" },
    showUi: { __type: "Boolean" },
    templates: { __type: "[String]" },
    uri: { __type: "String" },
  },
  ContentTypeToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ContentTypeToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ContentTypeToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  ContentTypeToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  ContentTypeToTaxonomyConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ContentTypeToTaxonomyConnectionEdge]" },
    nodes: { __type: "[Taxonomy]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ContentTypeToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Taxonomy" },
  },
  CreateCXAlertInput: {
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CreateCXAlertPayload: {
    __typename: { __type: "String!" },
    cXAlert: { __type: "CXAlert" },
    clientMutationId: { __type: "String" },
  },
  CreateCategoryInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    name: { __type: "String!" },
    parentId: { __type: "ID" },
    slug: { __type: "String" },
  },
  CreateCategoryPayload: {
    __typename: { __type: "String!" },
    category: { __type: "Category" },
    clientMutationId: { __type: "String" },
  },
  CreateCommentInput: {
    approved: { __type: "String" },
    author: { __type: "String" },
    authorEmail: { __type: "String" },
    authorUrl: { __type: "String" },
    clientMutationId: { __type: "String" },
    commentOn: { __type: "Int" },
    content: { __type: "String" },
    date: { __type: "String" },
    parent: { __type: "ID" },
    type: { __type: "String" },
  },
  CreateCommentPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    comment: { __type: "Comment" },
    success: { __type: "Boolean" },
  },
  CreateContactInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String" },
    menuOrder: { __type: "Int" },
    name: { __type: "String!" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
    type: { __type: "[String]" },
    value: { __type: "String" },
  },
  CreateContactPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    contact: { __type: "Contact" },
  },
  CreateFaqInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CreateFaqPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    faq: { __type: "Faq" },
  },
  CreateMediaItemInput: {
    altText: { __type: "String" },
    authorId: { __type: "ID" },
    caption: { __type: "String" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    description: { __type: "String" },
    filePath: { __type: "String" },
    fileType: { __type: "MimeTypeEnum" },
    parentId: { __type: "ID" },
    pingStatus: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "MediaItemStatusEnum" },
    title: { __type: "String" },
  },
  CreateMediaItemPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    mediaItem: { __type: "MediaItem" },
  },
  CreatePageInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    menuOrder: { __type: "Int" },
    parentId: { __type: "ID" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CreatePagePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    page: { __type: "Page" },
  },
  CreatePostFormatInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    name: { __type: "String!" },
    slug: { __type: "String" },
  },
  CreatePostFormatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    postFormat: { __type: "PostFormat" },
  },
  CreatePostInput: {
    authorId: { __type: "ID" },
    categories: { __type: "PostCategoriesInput" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    pingStatus: { __type: "String" },
    pinged: { __type: "[String]" },
    postFormats: { __type: "PostPostFormatsInput" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    tags: { __type: "PostTagsInput" },
    title: { __type: "String" },
    toPing: { __type: "[String]" },
  },
  CreatePostPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    post: { __type: "Post" },
  },
  CreateProductInput: {
    accurateDate: { __type: "String" },
    authorId: { __type: "ID" },
    bookNowURL: { __type: "String" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String!" },
    loanBasedAmount: { __type: "String" },
    memberApplyNowURL: { __type: "String" },
    menuOrder: { __type: "Int" },
    minorMemberApplyNowURL: { __type: "String" },
    minorNonMemberApplyNowURL: { __type: "String" },
    name: { __type: "String!" },
    nonMemberApplyNowURL: { __type: "String" },
    password: { __type: "String" },
    productApplyURL: { __type: "String" },
    productPageURL: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CreateProductNameInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    name: { __type: "String!" },
    slug: { __type: "String" },
  },
  CreateProductNamePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    productName: { __type: "ProductName" },
  },
  CreateProductPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    product: { __type: "Product" },
  },
  CreateRateInput: {
    aprapy: { __type: "String" },
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String!" },
    menuOrder: { __type: "Int" },
    minimumBalance: { __type: "Float" },
    name: { __type: "String!" },
    password: { __type: "String" },
    payment: { __type: "Float" },
    productNames: { __type: "RateProductNamesInput" },
    rate: { __type: "Float" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    term: { __type: "String" },
    title: { __type: "String" },
  },
  CreateRatePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    rate: { __type: "Rate" },
  },
  CreateServiceInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    description: { __type: "String" },
    displayName: { __type: "String!" },
    menuOrder: { __type: "Int" },
    name: { __type: "String!" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  CreateServicePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    service: { __type: "Service" },
  },
  CreateTagInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    name: { __type: "String!" },
    slug: { __type: "String" },
  },
  CreateTagPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    tag: { __type: "Tag" },
  },
  CreateUserInput: {
    aim: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    displayName: { __type: "String" },
    email: { __type: "String" },
    firstName: { __type: "String" },
    jabber: { __type: "String" },
    lastName: { __type: "String" },
    locale: { __type: "String" },
    nicename: { __type: "String" },
    nickname: { __type: "String" },
    password: { __type: "String" },
    registered: { __type: "String" },
    richEditing: { __type: "String" },
    roles: { __type: "[String]" },
    username: { __type: "String!" },
    websiteUrl: { __type: "String" },
    yim: { __type: "String" },
  },
  CreateUserPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    user: { __type: "User" },
  },
  DatabaseIdentifier: {
    __typename: { __type: "String!" },
    databaseId: { __type: "Int!" },
    $on: { __type: "$DatabaseIdentifier!" },
  },
  DateInput: {
    day: { __type: "Int" },
    month: { __type: "Int" },
    year: { __type: "Int" },
  },
  DateQueryInput: {
    after: { __type: "DateInput" },
    before: { __type: "DateInput" },
    column: { __type: "PostObjectsConnectionDateColumnEnum" },
    compare: { __type: "String" },
    day: { __type: "Int" },
    hour: { __type: "Int" },
    inclusive: { __type: "Boolean" },
    minute: { __type: "Int" },
    month: { __type: "Int" },
    relation: { __type: "RelationEnum" },
    second: { __type: "Int" },
    week: { __type: "Int" },
    year: { __type: "Int" },
  },
  DefaultTemplate: {
    __typename: { __type: "String!" },
    templateName: { __type: "String" },
  },
  DeleteCXAlertInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteCXAlertPayload: {
    __typename: { __type: "String!" },
    cXAlert: { __type: "CXAlert" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
  },
  DeleteCategoryInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
  },
  DeleteCategoryPayload: {
    __typename: { __type: "String!" },
    category: { __type: "Category" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
  },
  DeleteCommentInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteCommentPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    comment: { __type: "Comment" },
    deletedId: { __type: "ID" },
  },
  DeleteContactInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteContactPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    contact: { __type: "Contact" },
    deletedId: { __type: "ID" },
  },
  DeleteFaqInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteFaqPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    faq: { __type: "Faq" },
  },
  DeleteMediaItemInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteMediaItemPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    mediaItem: { __type: "MediaItem" },
  },
  DeletePageInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeletePagePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    page: { __type: "Page" },
  },
  DeletePostFormatInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
  },
  DeletePostFormatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    postFormat: { __type: "PostFormat" },
  },
  DeletePostInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeletePostPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    post: { __type: "Post" },
  },
  DeleteProductInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteProductNameInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
  },
  DeleteProductNamePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    productName: { __type: "ProductName" },
  },
  DeleteProductPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    product: { __type: "Product" },
  },
  DeleteRateInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteRatePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    rate: { __type: "Rate" },
  },
  DeleteServiceInput: {
    clientMutationId: { __type: "String" },
    forceDelete: { __type: "Boolean" },
    id: { __type: "ID!" },
  },
  DeleteServicePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    service: { __type: "Service" },
  },
  DeleteTagInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
  },
  DeleteTagPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    tag: { __type: "Tag" },
  },
  DeleteUserInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
    reassignId: { __type: "ID" },
  },
  DeleteUserPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    deletedId: { __type: "ID" },
    user: { __type: "User" },
  },
  DiscussionSettings: {
    __typename: { __type: "String!" },
    defaultCommentStatus: { __type: "String" },
    defaultPingStatus: { __type: "String" },
  },
  EnqueuedAsset: {
    __typename: { __type: "String!" },
    args: { __type: "Boolean" },
    dependencies: { __type: "[EnqueuedScript]" },
    extra: { __type: "String" },
    handle: { __type: "String" },
    id: { __type: "ID!" },
    src: { __type: "String" },
    version: { __type: "String" },
    $on: { __type: "$EnqueuedAsset!" },
  },
  EnqueuedScript: {
    __typename: { __type: "String!" },
    args: { __type: "Boolean" },
    dependencies: { __type: "[EnqueuedScript]" },
    extra: { __type: "String" },
    handle: { __type: "String" },
    id: { __type: "ID!" },
    src: { __type: "String" },
    version: { __type: "String" },
  },
  EnqueuedStylesheet: {
    __typename: { __type: "String!" },
    args: { __type: "Boolean" },
    dependencies: { __type: "[EnqueuedScript]" },
    extra: { __type: "String" },
    handle: { __type: "String" },
    id: { __type: "ID!" },
    src: { __type: "String" },
    version: { __type: "String" },
  },
  Faq: {
    __typename: { __type: "String!" },
    answer: { __type: "String" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    commentCount: { __type: "Int" },
    commentStatus: { __type: "String" },
    comments: {
      __type: "FaqToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "FaqToCommentConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    content: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    excerpt: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    faqId: { __type: "Int!" },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    preview: { __type: "FaqToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  FaqToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[FaqToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  FaqToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  FaqToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  FaqToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Faq" },
  },
  GeneralSettings: {
    __typename: { __type: "String!" },
    dateFormat: { __type: "String" },
    description: { __type: "String" },
    email: { __type: "String" },
    language: { __type: "String" },
    logo: { __type: "String" },
    startOfWeek: { __type: "Int" },
    styleguideVersion: { __type: "String" },
    timeFormat: { __type: "String" },
    timezone: { __type: "String" },
    title: { __type: "String" },
    url: { __type: "String" },
  },
  GenerateAuthorizationCodeInput: {
    clientMutationId: { __type: "String" },
    email: { __type: "String" },
    password: { __type: "String" },
    username: { __type: "String" },
  },
  GenerateAuthorizationCodePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    code: { __type: "String" },
    error: { __type: "String" },
  },
  GenesisBlocksGlobalSettingsSettings: {
    __typename: { __type: "String!" },
    genesisBlocksMailchimpApiKey: { __type: "String" },
    genesisProSubscriptionKey: { __type: "String" },
  },
  HierarchicalContentNode: {
    __typename: { __type: "String!" },
    ancestors: {
      __type: "HierarchicalContentNodeToContentNodeAncestorsConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs",
      },
    },
    children: {
      __type: "HierarchicalContentNodeToContentNodeChildrenConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs",
      },
    },
    parent: {
      __type: "HierarchicalContentNodeToParentContentNodeConnectionEdge",
    },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    $on: { __type: "$HierarchicalContentNode!" },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnection: {
    __typename: { __type: "String!" },
    edges: {
      __type: "[HierarchicalContentNodeToContentNodeAncestorsConnectionEdge]",
    },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  HierarchicalContentNodeToContentNodeChildrenConnection: {
    __typename: { __type: "String!" },
    edges: {
      __type: "[HierarchicalContentNodeToContentNodeChildrenConnectionEdge]",
    },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  HierarchicalContentNodeToParentContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "ContentNode" },
  },
  HierarchicalTermNode: {
    __typename: { __type: "String!" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    $on: { __type: "$HierarchicalTermNode!" },
  },
  MediaDetails: {
    __typename: { __type: "String!" },
    file: { __type: "String" },
    height: { __type: "Int" },
    meta: { __type: "MediaItemMeta" },
    sizes: {
      __type: "[MediaSize]",
      __args: {
        exclude: "[MediaItemSizeEnum]",
        include: "[MediaItemSizeEnum]",
      },
    },
    width: { __type: "Int" },
  },
  MediaItem: {
    __typename: { __type: "String!" },
    altText: { __type: "String" },
    ancestors: {
      __type: "HierarchicalContentNodeToContentNodeAncestorsConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs",
      },
    },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    caption: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    children: {
      __type: "HierarchicalContentNodeToContentNodeChildrenConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs",
      },
    },
    commentCount: { __type: "Int" },
    commentStatus: { __type: "String" },
    comments: {
      __type: "MediaItemToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "MediaItemToCommentConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    description: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    fileSize: { __type: "Int", __args: { size: "MediaItemSizeEnum" } },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    mediaDetails: { __type: "MediaDetails" },
    mediaItemId: { __type: "Int!" },
    mediaItemUrl: { __type: "String" },
    mediaType: { __type: "String" },
    mimeType: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    parent: {
      __type: "HierarchicalContentNodeToParentContentNodeConnectionEdge",
    },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    sizes: { __type: "String", __args: { size: "MediaItemSizeEnum" } },
    slug: { __type: "String" },
    sourceUrl: { __type: "String", __args: { size: "MediaItemSizeEnum" } },
    srcSet: { __type: "String", __args: { size: "MediaItemSizeEnum" } },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  MediaItemMeta: {
    __typename: { __type: "String!" },
    aperture: { __type: "Float" },
    camera: { __type: "String" },
    caption: { __type: "String" },
    copyright: { __type: "String" },
    createdTimestamp: { __type: "Int" },
    credit: { __type: "String" },
    focalLength: { __type: "Float" },
    iso: { __type: "Int" },
    keywords: { __type: "[String]" },
    orientation: { __type: "String" },
    shutterSpeed: { __type: "Float" },
    title: { __type: "String" },
  },
  MediaItemToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[MediaItemToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  MediaItemToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  MediaItemToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  MediaSize: {
    __typename: { __type: "String!" },
    file: { __type: "String" },
    fileSize: { __type: "Int" },
    height: { __type: "String" },
    mimeType: { __type: "String" },
    name: { __type: "String" },
    sourceUrl: { __type: "String" },
    width: { __type: "String" },
  },
  Menu: {
    __typename: { __type: "String!" },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    locations: { __type: "[MenuLocationEnum]" },
    menuId: { __type: "Int" },
    menuItems: {
      __type: "MenuToMenuItemConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "MenuToMenuItemConnectionWhereArgs",
      },
    },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  MenuItem: {
    __typename: { __type: "String!" },
    childItems: {
      __type: "MenuItemToMenuItemConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "MenuItemToMenuItemConnectionWhereArgs",
      },
    },
    connectedNode: { __type: "MenuItemToMenuItemLinkableConnectionEdge" },
    connectedObject: { __type: "MenuItemObjectUnion" },
    cssClasses: { __type: "[String]" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    label: { __type: "String" },
    linkRelationship: { __type: "String" },
    locations: { __type: "[MenuLocationEnum]" },
    menu: { __type: "MenuItemToMenuConnectionEdge" },
    menuItemId: { __type: "Int" },
    order: { __type: "Int" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    path: { __type: "String" },
    target: { __type: "String" },
    title: { __type: "String" },
    uri: { __type: "String" },
    url: { __type: "String" },
  },
  MenuItemLinkable: {
    __typename: { __type: "String!" },
    databaseId: { __type: "Int!" },
    id: { __type: "ID!" },
    uri: { __type: "String" },
    $on: { __type: "$MenuItemLinkable!" },
  },
  MenuItemObjectUnion: {
    __typename: { __type: "String!" },
    $on: { __type: "$MenuItemObjectUnion!" },
  },
  MenuItemToMenuConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Menu" },
  },
  MenuItemToMenuItemConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[MenuItemToMenuItemConnectionEdge]" },
    nodes: { __type: "[MenuItem]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  MenuItemToMenuItemConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "MenuItem" },
  },
  MenuItemToMenuItemConnectionWhereArgs: {
    id: { __type: "Int" },
    location: { __type: "MenuLocationEnum" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
  },
  MenuItemToMenuItemLinkableConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "MenuItemLinkable" },
  },
  MenuToMenuItemConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[MenuToMenuItemConnectionEdge]" },
    nodes: { __type: "[MenuItem]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  MenuToMenuItemConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "MenuItem" },
  },
  MenuToMenuItemConnectionWhereArgs: {
    id: { __type: "Int" },
    location: { __type: "MenuLocationEnum" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
  },
  Node: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    $on: { __type: "$Node!" },
  },
  NodeWithAuthor: {
    __typename: { __type: "String!" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    id: { __type: "ID!" },
    $on: { __type: "$NodeWithAuthor!" },
  },
  NodeWithAuthorToUserConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "User" },
  },
  NodeWithComments: {
    __typename: { __type: "String!" },
    commentCount: { __type: "Int" },
    commentStatus: { __type: "String" },
    id: { __type: "ID!" },
    $on: { __type: "$NodeWithComments!" },
  },
  NodeWithContentEditor: {
    __typename: { __type: "String!" },
    content: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    id: { __type: "ID!" },
    $on: { __type: "$NodeWithContentEditor!" },
  },
  NodeWithExcerpt: {
    __typename: { __type: "String!" },
    excerpt: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    id: { __type: "ID!" },
    $on: { __type: "$NodeWithExcerpt!" },
  },
  NodeWithFeaturedImage: {
    __typename: { __type: "String!" },
    featuredImage: { __type: "NodeWithFeaturedImageToMediaItemConnectionEdge" },
    featuredImageDatabaseId: { __type: "Int" },
    featuredImageId: { __type: "ID" },
    id: { __type: "ID!" },
    $on: { __type: "$NodeWithFeaturedImage!" },
  },
  NodeWithFeaturedImageToMediaItemConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "MediaItem" },
  },
  NodeWithPageAttributes: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    $on: { __type: "$NodeWithPageAttributes!" },
  },
  NodeWithRevisions: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    isRevision: { __type: "Boolean" },
    revisionOf: { __type: "NodeWithRevisionsToContentNodeConnectionEdge" },
    $on: { __type: "$NodeWithRevisions!" },
  },
  NodeWithRevisionsToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "ContentNode" },
  },
  NodeWithTemplate: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    template: { __type: "ContentTemplate" },
    $on: { __type: "$NodeWithTemplate!" },
  },
  NodeWithTitle: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    $on: { __type: "$NodeWithTitle!" },
  },
  NodeWithTrackbacks: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    pingStatus: { __type: "String" },
    pinged: { __type: "[String]" },
    toPing: { __type: "[String]" },
    $on: { __type: "$NodeWithTrackbacks!" },
  },
  Page: {
    __typename: { __type: "String!" },
    ancestors: {
      __type: "HierarchicalContentNodeToContentNodeAncestorsConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs",
      },
    },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    children: {
      __type: "HierarchicalContentNodeToContentNodeChildrenConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where:
          "HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs",
      },
    },
    commentCount: { __type: "Int" },
    commentStatus: { __type: "String" },
    comments: {
      __type: "PageToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PageToCommentConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    content: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    excerpt: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    featuredImage: { __type: "NodeWithFeaturedImageToMediaItemConnectionEdge" },
    featuredImageDatabaseId: { __type: "Int" },
    featuredImageId: { __type: "ID" },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isFrontPage: { __type: "Boolean!" },
    isPostsPage: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isPrivacyPage: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isRevision: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    menuOrder: { __type: "Int" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    pageId: { __type: "Int!" },
    parent: {
      __type: "HierarchicalContentNodeToParentContentNodeConnectionEdge",
    },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
    preview: { __type: "PageToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    revisionOf: { __type: "NodeWithRevisionsToContentNodeConnectionEdge" },
    revisions: {
      __type: "PageToRevisionConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PageToRevisionConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  PageToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PageToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PageToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  PageToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  PageToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Page" },
  },
  PageToRevisionConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PageToRevisionConnectionEdge]" },
    nodes: { __type: "[Page]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PageToRevisionConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Page" },
  },
  PageToRevisionConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  Plugin: {
    __typename: { __type: "String!" },
    author: { __type: "String" },
    authorUri: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    name: { __type: "String" },
    path: { __type: "String" },
    pluginUri: { __type: "String" },
    version: { __type: "String" },
  },
  Post: {
    __typename: { __type: "String!" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    categories: {
      __type: "PostToCategoryConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToCategoryConnectionWhereArgs",
      },
    },
    commentCount: { __type: "Int" },
    commentStatus: { __type: "String" },
    comments: {
      __type: "PostToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToCommentConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    content: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    excerpt: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    featuredImage: { __type: "NodeWithFeaturedImageToMediaItemConnectionEdge" },
    featuredImageDatabaseId: { __type: "Int" },
    featuredImageId: { __type: "ID" },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isRevision: { __type: "Boolean" },
    isSticky: { __type: "Boolean!" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    pingStatus: { __type: "String" },
    pinged: { __type: "[String]" },
    postFormats: {
      __type: "PostToPostFormatConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToPostFormatConnectionWhereArgs",
      },
    },
    postId: { __type: "Int!" },
    preview: { __type: "PostToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    revisionOf: { __type: "NodeWithRevisionsToContentNodeConnectionEdge" },
    revisions: {
      __type: "PostToRevisionConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToRevisionConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    status: { __type: "String" },
    tags: {
      __type: "PostToTagConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToTagConnectionWhereArgs",
      },
    },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    terms: {
      __type: "PostToTermNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostToTermNodeConnectionWhereArgs",
      },
    },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    toPing: { __type: "[String]" },
    uri: { __type: "String" },
  },
  PostCategoriesInput: {
    append: { __type: "Boolean" },
    nodes: { __type: "[PostCategoriesNodeInput]" },
  },
  PostCategoriesNodeInput: {
    description: { __type: "String" },
    id: { __type: "ID" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  PostFormat: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    contentNodes: {
      __type: "PostFormatToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostFormatToContentNodeConnectionWhereArgs",
      },
    },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    enqueuedScripts: {
      __type: "TermNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "TermNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    link: { __type: "String" },
    name: { __type: "String" },
    postFormatId: { __type: "Int" },
    posts: {
      __type: "PostFormatToPostConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "PostFormatToPostConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    taxonomy: { __type: "PostFormatToTaxonomyConnectionEdge" },
    taxonomyName: { __type: "String" },
    templates: { __type: "[String]" },
    termGroupId: { __type: "Int" },
    termTaxonomyId: { __type: "Int" },
    uri: { __type: "String" },
  },
  PostFormatToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostFormatToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostFormatToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  PostFormatToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypesOfPostFormatEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  PostFormatToPostConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostFormatToPostConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostFormatToPostConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  PostFormatToPostConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  PostFormatToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Taxonomy" },
  },
  PostObjectsConnectionOrderbyInput: {
    field: { __type: "PostObjectsConnectionOrderbyEnum!" },
    order: { __type: "OrderEnum!" },
  },
  PostPostFormatsInput: {
    append: { __type: "Boolean" },
    nodes: { __type: "[PostPostFormatsNodeInput]" },
  },
  PostPostFormatsNodeInput: {
    description: { __type: "String" },
    id: { __type: "ID" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  PostTagsInput: {
    append: { __type: "Boolean" },
    nodes: { __type: "[PostTagsNodeInput]" },
  },
  PostTagsNodeInput: {
    description: { __type: "String" },
    id: { __type: "ID" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  PostToCategoryConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToCategoryConnectionEdge]" },
    nodes: { __type: "[Category]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToCategoryConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Category" },
  },
  PostToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  PostToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  PostToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  PostToPostFormatConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToPostFormatConnectionEdge]" },
    nodes: { __type: "[PostFormat]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToPostFormatConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "PostFormat" },
  },
  PostToPostFormatConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  PostToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Post" },
  },
  PostToRevisionConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToRevisionConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToRevisionConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  PostToRevisionConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  PostToTagConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToTagConnectionEdge]" },
    nodes: { __type: "[Tag]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToTagConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Tag" },
  },
  PostToTagConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  PostToTermNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[PostToTermNodeConnectionEdge]" },
    nodes: { __type: "[TermNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  PostToTermNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "TermNode" },
  },
  PostToTermNodeConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    taxonomies: { __type: "[TaxonomyEnum]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  PostTypeLabelDetails: {
    __typename: { __type: "String!" },
    addNew: { __type: "String" },
    addNewItem: { __type: "String" },
    allItems: { __type: "String" },
    archives: { __type: "String" },
    attributes: { __type: "String" },
    editItem: { __type: "String" },
    featuredImage: { __type: "String" },
    filterItemsList: { __type: "String" },
    insertIntoItem: { __type: "String" },
    itemsList: { __type: "String" },
    itemsListNavigation: { __type: "String" },
    menuName: { __type: "String" },
    name: { __type: "String" },
    newItem: { __type: "String" },
    notFound: { __type: "String" },
    notFoundInTrash: { __type: "String" },
    parentItemColon: { __type: "String" },
    removeFeaturedImage: { __type: "String" },
    searchItems: { __type: "String" },
    setFeaturedImage: { __type: "String" },
    singularName: { __type: "String" },
    uploadedToThisItem: { __type: "String" },
    useFeaturedImage: { __type: "String" },
    viewItem: { __type: "String" },
    viewItems: { __type: "String" },
  },
  Product: {
    __typename: { __type: "String!" },
    accurateDate: { __type: "String" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    bookNowURL: { __type: "String" },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    displayName: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    loanBasedAmount: { __type: "String" },
    memberApplyNowURL: { __type: "String" },
    minorMemberApplyNowURL: { __type: "String" },
    minorNonMemberApplyNowURL: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    name: { __type: "String" },
    nonMemberApplyNowURL: { __type: "String" },
    preview: { __type: "ProductToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    productApplyURL: { __type: "String" },
    productId: { __type: "Int!" },
    productPageURL: { __type: "String" },
    rates: {
      __type: "ProductToRateConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  ProductName: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    contentNodes: {
      __type: "ProductNameToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "ProductNameToContentNodeConnectionWhereArgs",
      },
    },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    enqueuedScripts: {
      __type: "TermNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "TermNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    link: { __type: "String" },
    name: { __type: "String" },
    productNameId: { __type: "Int" },
    rates: {
      __type: "ProductNameToRateConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "ProductNameToRateConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    taxonomy: { __type: "ProductNameToTaxonomyConnectionEdge" },
    taxonomyName: { __type: "String" },
    templates: { __type: "[String]" },
    termGroupId: { __type: "Int" },
    termTaxonomyId: { __type: "Int" },
    uri: { __type: "String" },
  },
  ProductNameToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ProductNameToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ProductNameToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  ProductNameToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypesOfProductNameEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  ProductNameToRateConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ProductNameToRateConnectionEdge]" },
    nodes: { __type: "[Rate]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ProductNameToRateConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Rate" },
  },
  ProductNameToRateConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  ProductNameToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Taxonomy" },
  },
  ProductToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Product" },
  },
  ProductToRateConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[ProductToRateConnectionEdge]" },
    nodes: { __type: "[Rate]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  ProductToRateConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Rate" },
  },
  Rate: {
    __typename: { __type: "String!" },
    aprapy: { __type: "String" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    desiredSlug: { __type: "String" },
    displayName: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    minimumBalance: { __type: "Float" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    name: { __type: "String" },
    payment: { __type: "Float" },
    preview: { __type: "RateToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    product: {
      __type: "RateToProductConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    productNames: {
      __type: "RateToProductNameConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RateToProductNameConnectionWhereArgs",
      },
    },
    rate: { __type: "Float" },
    rateId: { __type: "Int!" },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    term: { __type: "String" },
    terms: {
      __type: "RateToTermNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RateToTermNodeConnectionWhereArgs",
      },
    },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  RateProductNamesInput: {
    append: { __type: "Boolean" },
    nodes: { __type: "[RateProductNamesNodeInput]" },
  },
  RateProductNamesNodeInput: {
    description: { __type: "String" },
    id: { __type: "ID" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  RateToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Rate" },
  },
  RateToProductConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RateToProductConnectionEdge]" },
    nodes: { __type: "[Product]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RateToProductConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Product" },
  },
  RateToProductNameConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RateToProductNameConnectionEdge]" },
    nodes: { __type: "[ProductName]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RateToProductNameConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ProductName" },
  },
  RateToProductNameConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RateToTermNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RateToTermNodeConnectionEdge]" },
    nodes: { __type: "[TermNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RateToTermNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "TermNode" },
  },
  RateToTermNodeConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    taxonomies: { __type: "[TaxonomyEnum]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  ReadingSettings: {
    __typename: { __type: "String!" },
    pageForPosts: { __type: "Int" },
    pageOnFront: { __type: "Int" },
    postsPerPage: { __type: "Int" },
    showOnFront: { __type: "String" },
  },
  RegisterUserInput: {
    aim: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    displayName: { __type: "String" },
    email: { __type: "String" },
    firstName: { __type: "String" },
    jabber: { __type: "String" },
    lastName: { __type: "String" },
    locale: { __type: "String" },
    nicename: { __type: "String" },
    nickname: { __type: "String" },
    password: { __type: "String" },
    registered: { __type: "String" },
    richEditing: { __type: "String" },
    username: { __type: "String!" },
    websiteUrl: { __type: "String" },
    yim: { __type: "String" },
  },
  RegisterUserPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    user: { __type: "User" },
  },
  ResetUserPasswordInput: {
    clientMutationId: { __type: "String" },
    key: { __type: "String" },
    login: { __type: "String" },
    password: { __type: "String" },
  },
  ResetUserPasswordPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    user: { __type: "User" },
  },
  RestoreCommentInput: {
    clientMutationId: { __type: "String" },
    id: { __type: "ID!" },
  },
  RestoreCommentPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    comment: { __type: "Comment" },
    restoredId: { __type: "ID" },
  },
  RootQueryToCXAlertConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToCXAlertConnectionEdge]" },
    nodes: { __type: "[CXAlert]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToCXAlertConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "CXAlert" },
  },
  RootQueryToCXAlertConnectionWhereArgs: {
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToCategoryConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToCategoryConnectionEdge]" },
    nodes: { __type: "[Category]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToCategoryConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Category" },
  },
  RootQueryToCategoryConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RootQueryToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  RootQueryToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  RootQueryToContactConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToContactConnectionEdge]" },
    nodes: { __type: "[Contact]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToContactConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Contact" },
  },
  RootQueryToContactConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  RootQueryToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToContentRevisionUnionConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToContentRevisionUnionConnectionEdge]" },
    nodes: { __type: "[ContentRevisionUnion]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToContentRevisionUnionConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentRevisionUnion" },
  },
  RootQueryToContentRevisionUnionConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToContentTypeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToContentTypeConnectionEdge]" },
    nodes: { __type: "[ContentType]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToContentTypeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentType" },
  },
  RootQueryToEnqueuedScriptConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToEnqueuedScriptConnectionEdge]" },
    nodes: { __type: "[EnqueuedScript]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToEnqueuedScriptConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedScript" },
  },
  RootQueryToEnqueuedStylesheetConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToEnqueuedStylesheetConnectionEdge]" },
    nodes: { __type: "[EnqueuedStylesheet]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedStylesheet" },
  },
  RootQueryToFaqConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToFaqConnectionEdge]" },
    nodes: { __type: "[Faq]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToFaqConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Faq" },
  },
  RootQueryToFaqConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToMediaItemConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToMediaItemConnectionEdge]" },
    nodes: { __type: "[MediaItem]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToMediaItemConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "MediaItem" },
  },
  RootQueryToMediaItemConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToMenuConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToMenuConnectionEdge]" },
    nodes: { __type: "[Menu]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToMenuConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Menu" },
  },
  RootQueryToMenuConnectionWhereArgs: {
    id: { __type: "Int" },
    location: { __type: "MenuLocationEnum" },
    slug: { __type: "String" },
  },
  RootQueryToMenuItemConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToMenuItemConnectionEdge]" },
    nodes: { __type: "[MenuItem]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToMenuItemConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "MenuItem" },
  },
  RootQueryToMenuItemConnectionWhereArgs: {
    id: { __type: "Int" },
    location: { __type: "MenuLocationEnum" },
    parentDatabaseId: { __type: "Int" },
    parentId: { __type: "ID" },
  },
  RootQueryToPageConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToPageConnectionEdge]" },
    nodes: { __type: "[Page]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToPageConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Page" },
  },
  RootQueryToPageConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToPluginConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToPluginConnectionEdge]" },
    nodes: { __type: "[Plugin]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToPluginConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Plugin" },
  },
  RootQueryToPluginConnectionWhereArgs: {
    search: { __type: "String" },
    stati: { __type: "[PluginStatusEnum]" },
    status: { __type: "PluginStatusEnum" },
  },
  RootQueryToPostConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToPostConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToPostConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  RootQueryToPostConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  RootQueryToPostFormatConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToPostFormatConnectionEdge]" },
    nodes: { __type: "[PostFormat]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToPostFormatConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "PostFormat" },
  },
  RootQueryToPostFormatConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RootQueryToProductConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToProductConnectionEdge]" },
    nodes: { __type: "[Product]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToProductConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Product" },
  },
  RootQueryToProductConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToProductNameConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToProductNameConnectionEdge]" },
    nodes: { __type: "[ProductName]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToProductNameConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ProductName" },
  },
  RootQueryToProductNameConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RootQueryToRateConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToRateConnectionEdge]" },
    nodes: { __type: "[Rate]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToRateConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Rate" },
  },
  RootQueryToRateConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToServiceConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToServiceConnectionEdge]" },
    nodes: { __type: "[Service]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToServiceConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Service" },
  },
  RootQueryToServiceConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  RootQueryToTagConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToTagConnectionEdge]" },
    nodes: { __type: "[Tag]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToTagConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Tag" },
  },
  RootQueryToTagConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RootQueryToTaxonomyConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToTaxonomyConnectionEdge]" },
    nodes: { __type: "[Taxonomy]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Taxonomy" },
  },
  RootQueryToTermNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToTermNodeConnectionEdge]" },
    nodes: { __type: "[TermNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToTermNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "TermNode" },
  },
  RootQueryToTermNodeConnectionWhereArgs: {
    cacheDomain: { __type: "String" },
    childOf: { __type: "Int" },
    childless: { __type: "Boolean" },
    descriptionLike: { __type: "String" },
    exclude: { __type: "[ID]" },
    excludeTree: { __type: "[ID]" },
    hideEmpty: { __type: "Boolean" },
    hierarchical: { __type: "Boolean" },
    include: { __type: "[ID]" },
    name: { __type: "[String]" },
    nameLike: { __type: "String" },
    objectIds: { __type: "[ID]" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "TermObjectsConnectionOrderbyEnum" },
    padCounts: { __type: "Boolean" },
    parent: { __type: "Int" },
    search: { __type: "String" },
    slug: { __type: "[String]" },
    taxonomies: { __type: "[TaxonomyEnum]" },
    termTaxonomId: { __type: "[ID]" },
    termTaxonomyId: { __type: "[ID]" },
    updateTermMetaCache: { __type: "Boolean" },
  },
  RootQueryToThemeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToThemeConnectionEdge]" },
    nodes: { __type: "[Theme]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToThemeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Theme" },
  },
  RootQueryToUserConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToUserConnectionEdge]" },
    nodes: { __type: "[User]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToUserConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "User" },
  },
  RootQueryToUserConnectionWhereArgs: {
    exclude: { __type: "[Int]" },
    hasPublishedPosts: { __type: "[ContentTypeEnum]" },
    include: { __type: "[Int]" },
    login: { __type: "String" },
    loginIn: { __type: "[String]" },
    loginNotIn: { __type: "[String]" },
    nicename: { __type: "String" },
    nicenameIn: { __type: "[String]" },
    nicenameNotIn: { __type: "[String]" },
    orderby: { __type: "[UsersConnectionOrderbyInput]" },
    role: { __type: "UserRoleEnum" },
    roleIn: { __type: "[UserRoleEnum]" },
    roleNotIn: { __type: "[UserRoleEnum]" },
    search: { __type: "String" },
    searchColumns: { __type: "[UsersConnectionSearchColumnEnum]" },
  },
  RootQueryToUserRoleConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[RootQueryToUserRoleConnectionEdge]" },
    nodes: { __type: "[UserRole]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  RootQueryToUserRoleConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "UserRole" },
  },
  SendPasswordResetEmailInput: {
    clientMutationId: { __type: "String" },
    username: { __type: "String!" },
  },
  SendPasswordResetEmailPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    user: { __type: "User" },
  },
  Service: {
    __typename: { __type: "String!" },
    author: { __type: "NodeWithAuthorToUserConnectionEdge" },
    authorDatabaseId: { __type: "Int" },
    authorId: { __type: "ID" },
    conditionalTags: { __type: "ConditionalTags" },
    contentType: { __type: "ContentNodeToContentTypeConnectionEdge" },
    contentTypeName: { __type: "String!" },
    databaseId: { __type: "Int!" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    description: { __type: "String" },
    desiredSlug: { __type: "String" },
    displayName: { __type: "String" },
    editingLockedBy: { __type: "ContentNodeToEditLockConnectionEdge" },
    enclosure: { __type: "String" },
    enqueuedScripts: {
      __type: "ContentNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "ContentNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    guid: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isPreview: { __type: "Boolean" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastEditedBy: { __type: "ContentNodeToEditLastConnectionEdge" },
    link: { __type: "String" },
    modified: { __type: "String" },
    modifiedGmt: { __type: "String" },
    name: { __type: "String" },
    preview: { __type: "ServiceToPreviewConnectionEdge" },
    previewRevisionDatabaseId: { __type: "Int" },
    previewRevisionId: { __type: "ID" },
    serviceId: { __type: "Int!" },
    slug: { __type: "String" },
    status: { __type: "String" },
    template: { __type: "ContentTemplate" },
    templates: { __type: "[String]" },
    title: {
      __type: "String",
      __args: { format: "PostObjectFieldFormatEnum" },
    },
    uri: { __type: "String" },
  },
  ServiceToPreviewConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Service" },
  },
  Settings: {
    __typename: { __type: "String!" },
    atlasContentModelerSettingsSettingsAtlasContentModelerUsageTracking: {
      __type: "String",
    },
    discussionSettingsDefaultCommentStatus: { __type: "String" },
    discussionSettingsDefaultPingStatus: { __type: "String" },
    generalSettingsDateFormat: { __type: "String" },
    generalSettingsDescription: { __type: "String" },
    generalSettingsEmail: { __type: "String" },
    generalSettingsLanguage: { __type: "String" },
    generalSettingsStartOfWeek: { __type: "Int" },
    generalSettingsTimeFormat: { __type: "String" },
    generalSettingsTimezone: { __type: "String" },
    generalSettingsTitle: { __type: "String" },
    generalSettingsUrl: { __type: "String" },
    genesisBlocksGlobalSettingsSettingsGenesisBlocksMailchimpApiKey: {
      __type: "String",
    },
    genesisBlocksGlobalSettingsSettingsGenesisProSubscriptionKey: {
      __type: "String",
    },
    readingSettingsPageForPosts: { __type: "Int" },
    readingSettingsPageOnFront: { __type: "Int" },
    readingSettingsPostsPerPage: { __type: "Int" },
    readingSettingsShowOnFront: { __type: "String" },
    writingSettingsDefaultCategory: { __type: "Int" },
    writingSettingsDefaultPostFormat: { __type: "String" },
    writingSettingsUseSmilies: { __type: "Boolean" },
  },
  Tag: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    contentNodes: {
      __type: "TagToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "TagToContentNodeConnectionWhereArgs",
      },
    },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    enqueuedScripts: {
      __type: "TermNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "TermNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    link: { __type: "String" },
    name: { __type: "String" },
    posts: {
      __type: "TagToPostConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "TagToPostConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    tagId: { __type: "Int" },
    taxonomy: { __type: "TagToTaxonomyConnectionEdge" },
    taxonomyName: { __type: "String" },
    templates: { __type: "[String]" },
    termGroupId: { __type: "Int" },
    termTaxonomyId: { __type: "Int" },
    uri: { __type: "String" },
  },
  TagToContentNodeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[TagToContentNodeConnectionEdge]" },
    nodes: { __type: "[ContentNode]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  TagToContentNodeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentNode" },
  },
  TagToContentNodeConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypesOfTagEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  TagToPostConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[TagToPostConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  TagToPostConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  TagToPostConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  TagToTaxonomyConnectionEdge: {
    __typename: { __type: "String!" },
    node: { __type: "Taxonomy" },
  },
  Taxonomy: {
    __typename: { __type: "String!" },
    connectedContentTypes: {
      __type: "TaxonomyToContentTypeConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    description: { __type: "String" },
    graphqlPluralName: { __type: "String" },
    graphqlSingleName: { __type: "String" },
    hierarchical: { __type: "Boolean" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    label: { __type: "String" },
    name: { __type: "String" },
    public: { __type: "Boolean" },
    restBase: { __type: "String" },
    restControllerClass: { __type: "String" },
    showCloud: { __type: "Boolean" },
    showInAdminColumn: { __type: "Boolean" },
    showInGraphql: { __type: "Boolean" },
    showInMenu: { __type: "Boolean" },
    showInNavMenus: { __type: "Boolean" },
    showInQuickEdit: { __type: "Boolean" },
    showInRest: { __type: "Boolean" },
    showUi: { __type: "Boolean" },
  },
  TaxonomyToContentTypeConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[TaxonomyToContentTypeConnectionEdge]" },
    nodes: { __type: "[ContentType]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  TaxonomyToContentTypeConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentType" },
  },
  Template_ApplyNow: {
    __typename: { __type: "String!" },
    templateName: { __type: "String" },
  },
  Template_FullWidth: {
    __typename: { __type: "String!" },
    templateName: { __type: "String" },
  },
  TermNode: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    count: { __type: "Int" },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    enqueuedScripts: {
      __type: "TermNodeToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "TermNodeToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    link: { __type: "String" },
    name: { __type: "String" },
    slug: { __type: "String" },
    taxonomyName: { __type: "String" },
    templates: { __type: "[String]" },
    termGroupId: { __type: "Int" },
    termTaxonomyId: { __type: "Int" },
    uri: { __type: "String" },
    $on: { __type: "$TermNode!" },
  },
  TermNodeToEnqueuedScriptConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[TermNodeToEnqueuedScriptConnectionEdge]" },
    nodes: { __type: "[EnqueuedScript]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  TermNodeToEnqueuedScriptConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedScript" },
  },
  TermNodeToEnqueuedStylesheetConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[TermNodeToEnqueuedStylesheetConnectionEdge]" },
    nodes: { __type: "[EnqueuedStylesheet]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  TermNodeToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedStylesheet" },
  },
  Theme: {
    __typename: { __type: "String!" },
    author: { __type: "String" },
    authorUri: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    name: { __type: "String" },
    screenshot: { __type: "String" },
    slug: { __type: "String" },
    tags: { __type: "[String]" },
    themeUri: { __type: "String" },
    version: { __type: "String" },
  },
  UniformResourceIdentifiable: {
    __typename: { __type: "String!" },
    conditionalTags: { __type: "ConditionalTags" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isTermNode: { __type: "Boolean!" },
    templates: { __type: "[String]" },
    uri: { __type: "String" },
    $on: { __type: "$UniformResourceIdentifiable!" },
  },
  UpdateCXAlertInput: {
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UpdateCXAlertPayload: {
    __typename: { __type: "String!" },
    cXAlert: { __type: "CXAlert" },
    clientMutationId: { __type: "String" },
  },
  UpdateCategoryInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    name: { __type: "String" },
    parentId: { __type: "ID" },
    slug: { __type: "String" },
  },
  UpdateCategoryPayload: {
    __typename: { __type: "String!" },
    category: { __type: "Category" },
    clientMutationId: { __type: "String" },
  },
  UpdateCommentInput: {
    approved: { __type: "String" },
    author: { __type: "String" },
    authorEmail: { __type: "String" },
    authorUrl: { __type: "String" },
    clientMutationId: { __type: "String" },
    commentOn: { __type: "Int" },
    content: { __type: "String" },
    date: { __type: "String" },
    id: { __type: "ID!" },
    parent: { __type: "ID" },
    type: { __type: "String" },
  },
  UpdateCommentPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    comment: { __type: "Comment" },
    success: { __type: "Boolean" },
  },
  UpdateContactInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    name: { __type: "String" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
    type: { __type: "[String]" },
    value: { __type: "String" },
  },
  UpdateContactPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    contact: { __type: "Contact" },
  },
  UpdateFaqInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UpdateFaqPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    faq: { __type: "Faq" },
  },
  UpdateMediaItemInput: {
    altText: { __type: "String" },
    authorId: { __type: "ID" },
    caption: { __type: "String" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    date: { __type: "String" },
    dateGmt: { __type: "String" },
    description: { __type: "String" },
    filePath: { __type: "String" },
    fileType: { __type: "MimeTypeEnum" },
    id: { __type: "ID!" },
    parentId: { __type: "ID" },
    pingStatus: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "MediaItemStatusEnum" },
    title: { __type: "String" },
  },
  UpdateMediaItemPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    mediaItem: { __type: "MediaItem" },
  },
  UpdatePageInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    parentId: { __type: "ID" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UpdatePagePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    page: { __type: "Page" },
  },
  UpdatePostFormatInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  UpdatePostFormatPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    postFormat: { __type: "PostFormat" },
  },
  UpdatePostInput: {
    authorId: { __type: "ID" },
    categories: { __type: "PostCategoriesInput" },
    clientMutationId: { __type: "String" },
    commentStatus: { __type: "String" },
    content: { __type: "String" },
    date: { __type: "String" },
    excerpt: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    password: { __type: "String" },
    pingStatus: { __type: "String" },
    pinged: { __type: "[String]" },
    postFormats: { __type: "PostPostFormatsInput" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    tags: { __type: "PostTagsInput" },
    title: { __type: "String" },
    toPing: { __type: "[String]" },
  },
  UpdatePostPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    post: { __type: "Post" },
  },
  UpdateProductInput: {
    accurateDate: { __type: "String" },
    authorId: { __type: "ID" },
    bookNowURL: { __type: "String" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String" },
    id: { __type: "ID!" },
    loanBasedAmount: { __type: "String" },
    memberApplyNowURL: { __type: "String" },
    menuOrder: { __type: "Int" },
    minorMemberApplyNowURL: { __type: "String" },
    minorNonMemberApplyNowURL: { __type: "String" },
    name: { __type: "String" },
    nonMemberApplyNowURL: { __type: "String" },
    password: { __type: "String" },
    productApplyURL: { __type: "String" },
    productPageURL: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UpdateProductNameInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  UpdateProductNamePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    productName: { __type: "ProductName" },
  },
  UpdateProductPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    product: { __type: "Product" },
  },
  UpdateRateInput: {
    aprapy: { __type: "String" },
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    displayName: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    minimumBalance: { __type: "Float" },
    name: { __type: "String" },
    password: { __type: "String" },
    payment: { __type: "Float" },
    productNames: { __type: "RateProductNamesInput" },
    rate: { __type: "Float" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    term: { __type: "String" },
    title: { __type: "String" },
  },
  UpdateRatePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    rate: { __type: "Rate" },
  },
  UpdateServiceInput: {
    authorId: { __type: "ID" },
    clientMutationId: { __type: "String" },
    date: { __type: "String" },
    description: { __type: "String" },
    displayName: { __type: "String" },
    id: { __type: "ID!" },
    menuOrder: { __type: "Int" },
    name: { __type: "String" },
    password: { __type: "String" },
    slug: { __type: "String" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UpdateServicePayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    service: { __type: "Service" },
  },
  UpdateSettingsInput: {
    atlasContentModelerSettingsSettingsAtlasContentModelerUsageTracking: {
      __type: "String",
    },
    clientMutationId: { __type: "String" },
    discussionSettingsDefaultCommentStatus: { __type: "String" },
    discussionSettingsDefaultPingStatus: { __type: "String" },
    generalSettingsDateFormat: { __type: "String" },
    generalSettingsDescription: { __type: "String" },
    generalSettingsEmail: { __type: "String" },
    generalSettingsLanguage: { __type: "String" },
    generalSettingsStartOfWeek: { __type: "Int" },
    generalSettingsTimeFormat: { __type: "String" },
    generalSettingsTimezone: { __type: "String" },
    generalSettingsTitle: { __type: "String" },
    generalSettingsUrl: { __type: "String" },
    genesisBlocksGlobalSettingsSettingsGenesisBlocksMailchimpApiKey: {
      __type: "String",
    },
    genesisBlocksGlobalSettingsSettingsGenesisProSubscriptionKey: {
      __type: "String",
    },
    readingSettingsPageForPosts: { __type: "Int" },
    readingSettingsPageOnFront: { __type: "Int" },
    readingSettingsPostsPerPage: { __type: "Int" },
    readingSettingsShowOnFront: { __type: "String" },
    writingSettingsDefaultCategory: { __type: "Int" },
    writingSettingsDefaultPostFormat: { __type: "String" },
    writingSettingsUseSmilies: { __type: "Boolean" },
  },
  UpdateSettingsPayload: {
    __typename: { __type: "String!" },
    allSettings: { __type: "Settings" },
    atlasContentModelerSettingsSettings: {
      __type: "AtlasContentModelerSettingsSettings",
    },
    clientMutationId: { __type: "String" },
    discussionSettings: { __type: "DiscussionSettings" },
    generalSettings: { __type: "GeneralSettings" },
    genesisBlocksGlobalSettingsSettings: {
      __type: "GenesisBlocksGlobalSettingsSettings",
    },
    readingSettings: { __type: "ReadingSettings" },
    writingSettings: { __type: "WritingSettings" },
  },
  UpdateTagInput: {
    aliasOf: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "ID!" },
    name: { __type: "String" },
    slug: { __type: "String" },
  },
  UpdateTagPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    tag: { __type: "Tag" },
  },
  UpdateUserInput: {
    aim: { __type: "String" },
    clientMutationId: { __type: "String" },
    description: { __type: "String" },
    displayName: { __type: "String" },
    email: { __type: "String" },
    firstName: { __type: "String" },
    id: { __type: "ID!" },
    jabber: { __type: "String" },
    lastName: { __type: "String" },
    locale: { __type: "String" },
    nicename: { __type: "String" },
    nickname: { __type: "String" },
    password: { __type: "String" },
    registered: { __type: "String" },
    richEditing: { __type: "String" },
    roles: { __type: "[String]" },
    websiteUrl: { __type: "String" },
    yim: { __type: "String" },
  },
  UpdateUserPayload: {
    __typename: { __type: "String!" },
    clientMutationId: { __type: "String" },
    user: { __type: "User" },
  },
  User: {
    __typename: { __type: "String!" },
    avatar: {
      __type: "Avatar",
      __args: {
        forceDefault: "Boolean",
        rating: "AvatarRatingEnum",
        size: "Int",
      },
    },
    capKey: { __type: "String" },
    capabilities: { __type: "[String]" },
    comments: {
      __type: "UserToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToCommentConnectionWhereArgs",
      },
    },
    conditionalTags: { __type: "ConditionalTags" },
    contacts: {
      __type: "UserToContactConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToContactConnectionWhereArgs",
      },
    },
    databaseId: { __type: "Int!" },
    description: { __type: "String" },
    email: { __type: "String" },
    enqueuedScripts: {
      __type: "UserToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    enqueuedStylesheets: {
      __type: "UserToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    extraCapabilities: { __type: "[String]" },
    faqs: {
      __type: "UserToFaqConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToFaqConnectionWhereArgs",
      },
    },
    firstName: { __type: "String" },
    id: { __type: "ID!" },
    isContentNode: { __type: "Boolean!" },
    isRestricted: { __type: "Boolean" },
    isTermNode: { __type: "Boolean!" },
    lastName: { __type: "String" },
    locale: { __type: "String" },
    mediaItems: {
      __type: "UserToMediaItemConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToMediaItemConnectionWhereArgs",
      },
    },
    name: { __type: "String" },
    nicename: { __type: "String" },
    nickname: { __type: "String" },
    pages: {
      __type: "UserToPageConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToPageConnectionWhereArgs",
      },
    },
    posts: {
      __type: "UserToPostConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToPostConnectionWhereArgs",
      },
    },
    products: {
      __type: "UserToProductConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToProductConnectionWhereArgs",
      },
    },
    rates: {
      __type: "UserToRateConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToRateConnectionWhereArgs",
      },
    },
    registeredDate: { __type: "String" },
    revisions: {
      __type: "UserToContentRevisionUnionConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToContentRevisionUnionConnectionWhereArgs",
      },
    },
    roles: {
      __type: "UserToUserRoleConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    services: {
      __type: "UserToServiceConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "UserToServiceConnectionWhereArgs",
      },
    },
    slug: { __type: "String" },
    templates: { __type: "[String]" },
    uri: { __type: "String" },
    url: { __type: "String" },
    userId: { __type: "Int" },
    username: { __type: "String" },
  },
  UserRole: {
    __typename: { __type: "String!" },
    capabilities: { __type: "[String]" },
    displayName: { __type: "String" },
    id: { __type: "ID!" },
    isRestricted: { __type: "Boolean" },
    name: { __type: "String" },
  },
  UserToCommentConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToCommentConnectionEdge]" },
    nodes: { __type: "[Comment]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToCommentConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Comment" },
  },
  UserToCommentConnectionWhereArgs: {
    authorEmail: { __type: "String" },
    authorIn: { __type: "[ID]" },
    authorNotIn: { __type: "[ID]" },
    authorUrl: { __type: "String" },
    commentIn: { __type: "[ID]" },
    commentNotIn: { __type: "[ID]" },
    commentType: { __type: "String" },
    commentTypeIn: { __type: "[String]" },
    commentTypeNotIn: { __type: "String" },
    contentAuthor: { __type: "[ID]" },
    contentAuthorIn: { __type: "[ID]" },
    contentAuthorNotIn: { __type: "[ID]" },
    contentId: { __type: "ID" },
    contentIdIn: { __type: "[ID]" },
    contentIdNotIn: { __type: "[ID]" },
    contentName: { __type: "String" },
    contentParent: { __type: "Int" },
    contentStatus: { __type: "[PostStatusEnum]" },
    contentType: { __type: "[ContentTypeEnum]" },
    includeUnapproved: { __type: "[ID]" },
    karma: { __type: "Int" },
    order: { __type: "OrderEnum" },
    orderby: { __type: "CommentsConnectionOrderbyEnum" },
    parent: { __type: "Int" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    search: { __type: "String" },
    status: { __type: "String" },
    userId: { __type: "ID" },
  },
  UserToContactConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToContactConnectionEdge]" },
    nodes: { __type: "[Contact]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToContactConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Contact" },
  },
  UserToContactConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToContentRevisionUnionConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToContentRevisionUnionConnectionEdge]" },
    nodes: { __type: "[ContentRevisionUnion]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToContentRevisionUnionConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "ContentRevisionUnion" },
  },
  UserToContentRevisionUnionConnectionWhereArgs: {
    contentTypes: { __type: "[ContentTypeEnum]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToEnqueuedScriptConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToEnqueuedScriptConnectionEdge]" },
    nodes: { __type: "[EnqueuedScript]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToEnqueuedScriptConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedScript" },
  },
  UserToEnqueuedStylesheetConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToEnqueuedStylesheetConnectionEdge]" },
    nodes: { __type: "[EnqueuedStylesheet]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToEnqueuedStylesheetConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "EnqueuedStylesheet" },
  },
  UserToFaqConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToFaqConnectionEdge]" },
    nodes: { __type: "[Faq]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToFaqConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Faq" },
  },
  UserToFaqConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToMediaItemConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToMediaItemConnectionEdge]" },
    nodes: { __type: "[MediaItem]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToMediaItemConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "MediaItem" },
  },
  UserToMediaItemConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToPageConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToPageConnectionEdge]" },
    nodes: { __type: "[Page]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToPageConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Page" },
  },
  UserToPageConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToPostConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToPostConnectionEdge]" },
    nodes: { __type: "[Post]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToPostConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Post" },
  },
  UserToPostConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    categoryId: { __type: "Int" },
    categoryIn: { __type: "[ID]" },
    categoryName: { __type: "String" },
    categoryNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    tag: { __type: "String" },
    tagId: { __type: "String" },
    tagIn: { __type: "[ID]" },
    tagNotIn: { __type: "[ID]" },
    tagSlugAnd: { __type: "[String]" },
    tagSlugIn: { __type: "[String]" },
    title: { __type: "String" },
  },
  UserToProductConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToProductConnectionEdge]" },
    nodes: { __type: "[Product]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToProductConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Product" },
  },
  UserToProductConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToRateConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToRateConnectionEdge]" },
    nodes: { __type: "[Rate]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToRateConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Rate" },
  },
  UserToRateConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToServiceConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToServiceConnectionEdge]" },
    nodes: { __type: "[Service]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToServiceConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "Service" },
  },
  UserToServiceConnectionWhereArgs: {
    author: { __type: "Int" },
    authorIn: { __type: "[ID]" },
    authorName: { __type: "String" },
    authorNotIn: { __type: "[ID]" },
    dateQuery: { __type: "DateQueryInput" },
    hasPassword: { __type: "Boolean" },
    id: { __type: "Int" },
    in: { __type: "[ID]" },
    mimeType: { __type: "MimeTypeEnum" },
    name: { __type: "String" },
    nameIn: { __type: "[String]" },
    notIn: { __type: "[ID]" },
    orderby: { __type: "[PostObjectsConnectionOrderbyInput]" },
    parent: { __type: "ID" },
    parentIn: { __type: "[ID]" },
    parentNotIn: { __type: "[ID]" },
    password: { __type: "String" },
    search: { __type: "String" },
    stati: { __type: "[PostStatusEnum]" },
    status: { __type: "PostStatusEnum" },
    title: { __type: "String" },
  },
  UserToUserRoleConnection: {
    __typename: { __type: "String!" },
    edges: { __type: "[UserToUserRoleConnectionEdge]" },
    nodes: { __type: "[UserRole]" },
    pageInfo: { __type: "WPPageInfo" },
  },
  UserToUserRoleConnectionEdge: {
    __typename: { __type: "String!" },
    cursor: { __type: "String" },
    node: { __type: "UserRole" },
  },
  UsersConnectionOrderbyInput: {
    field: { __type: "UsersConnectionOrderbyEnum!" },
    order: { __type: "OrderEnum" },
  },
  WPPageInfo: {
    __typename: { __type: "String!" },
    endCursor: { __type: "String" },
    hasNextPage: { __type: "Boolean!" },
    hasPreviousPage: { __type: "Boolean!" },
    startCursor: { __type: "String" },
  },
  WritingSettings: {
    __typename: { __type: "String!" },
    defaultCategory: { __type: "Int" },
    defaultPostFormat: { __type: "String" },
    useSmilies: { __type: "Boolean" },
  },
  mutation: {
    __typename: { __type: "String!" },
    createCXAlert: {
      __type: "CreateCXAlertPayload",
      __args: { input: "CreateCXAlertInput!" },
    },
    createCategory: {
      __type: "CreateCategoryPayload",
      __args: { input: "CreateCategoryInput!" },
    },
    createComment: {
      __type: "CreateCommentPayload",
      __args: { input: "CreateCommentInput!" },
    },
    createContact: {
      __type: "CreateContactPayload",
      __args: { input: "CreateContactInput!" },
    },
    createFaq: {
      __type: "CreateFaqPayload",
      __args: { input: "CreateFaqInput!" },
    },
    createMediaItem: {
      __type: "CreateMediaItemPayload",
      __args: { input: "CreateMediaItemInput!" },
    },
    createPage: {
      __type: "CreatePagePayload",
      __args: { input: "CreatePageInput!" },
    },
    createPost: {
      __type: "CreatePostPayload",
      __args: { input: "CreatePostInput!" },
    },
    createPostFormat: {
      __type: "CreatePostFormatPayload",
      __args: { input: "CreatePostFormatInput!" },
    },
    createProduct: {
      __type: "CreateProductPayload",
      __args: { input: "CreateProductInput!" },
    },
    createProductName: {
      __type: "CreateProductNamePayload",
      __args: { input: "CreateProductNameInput!" },
    },
    createRate: {
      __type: "CreateRatePayload",
      __args: { input: "CreateRateInput!" },
    },
    createService: {
      __type: "CreateServicePayload",
      __args: { input: "CreateServiceInput!" },
    },
    createTag: {
      __type: "CreateTagPayload",
      __args: { input: "CreateTagInput!" },
    },
    createUser: {
      __type: "CreateUserPayload",
      __args: { input: "CreateUserInput!" },
    },
    deleteCXAlert: {
      __type: "DeleteCXAlertPayload",
      __args: { input: "DeleteCXAlertInput!" },
    },
    deleteCategory: {
      __type: "DeleteCategoryPayload",
      __args: { input: "DeleteCategoryInput!" },
    },
    deleteComment: {
      __type: "DeleteCommentPayload",
      __args: { input: "DeleteCommentInput!" },
    },
    deleteContact: {
      __type: "DeleteContactPayload",
      __args: { input: "DeleteContactInput!" },
    },
    deleteFaq: {
      __type: "DeleteFaqPayload",
      __args: { input: "DeleteFaqInput!" },
    },
    deleteMediaItem: {
      __type: "DeleteMediaItemPayload",
      __args: { input: "DeleteMediaItemInput!" },
    },
    deletePage: {
      __type: "DeletePagePayload",
      __args: { input: "DeletePageInput!" },
    },
    deletePost: {
      __type: "DeletePostPayload",
      __args: { input: "DeletePostInput!" },
    },
    deletePostFormat: {
      __type: "DeletePostFormatPayload",
      __args: { input: "DeletePostFormatInput!" },
    },
    deleteProduct: {
      __type: "DeleteProductPayload",
      __args: { input: "DeleteProductInput!" },
    },
    deleteProductName: {
      __type: "DeleteProductNamePayload",
      __args: { input: "DeleteProductNameInput!" },
    },
    deleteRate: {
      __type: "DeleteRatePayload",
      __args: { input: "DeleteRateInput!" },
    },
    deleteService: {
      __type: "DeleteServicePayload",
      __args: { input: "DeleteServiceInput!" },
    },
    deleteTag: {
      __type: "DeleteTagPayload",
      __args: { input: "DeleteTagInput!" },
    },
    deleteUser: {
      __type: "DeleteUserPayload",
      __args: { input: "DeleteUserInput!" },
    },
    generateAuthorizationCode: {
      __type: "GenerateAuthorizationCodePayload",
      __args: { input: "GenerateAuthorizationCodeInput!" },
    },
    increaseCount: { __type: "Int", __args: { count: "Int" } },
    registerUser: {
      __type: "RegisterUserPayload",
      __args: { input: "RegisterUserInput!" },
    },
    resetUserPassword: {
      __type: "ResetUserPasswordPayload",
      __args: { input: "ResetUserPasswordInput!" },
    },
    restoreComment: {
      __type: "RestoreCommentPayload",
      __args: { input: "RestoreCommentInput!" },
    },
    sendPasswordResetEmail: {
      __type: "SendPasswordResetEmailPayload",
      __args: { input: "SendPasswordResetEmailInput!" },
    },
    updateCXAlert: {
      __type: "UpdateCXAlertPayload",
      __args: { input: "UpdateCXAlertInput!" },
    },
    updateCategory: {
      __type: "UpdateCategoryPayload",
      __args: { input: "UpdateCategoryInput!" },
    },
    updateComment: {
      __type: "UpdateCommentPayload",
      __args: { input: "UpdateCommentInput!" },
    },
    updateContact: {
      __type: "UpdateContactPayload",
      __args: { input: "UpdateContactInput!" },
    },
    updateFaq: {
      __type: "UpdateFaqPayload",
      __args: { input: "UpdateFaqInput!" },
    },
    updateMediaItem: {
      __type: "UpdateMediaItemPayload",
      __args: { input: "UpdateMediaItemInput!" },
    },
    updatePage: {
      __type: "UpdatePagePayload",
      __args: { input: "UpdatePageInput!" },
    },
    updatePost: {
      __type: "UpdatePostPayload",
      __args: { input: "UpdatePostInput!" },
    },
    updatePostFormat: {
      __type: "UpdatePostFormatPayload",
      __args: { input: "UpdatePostFormatInput!" },
    },
    updateProduct: {
      __type: "UpdateProductPayload",
      __args: { input: "UpdateProductInput!" },
    },
    updateProductName: {
      __type: "UpdateProductNamePayload",
      __args: { input: "UpdateProductNameInput!" },
    },
    updateRate: {
      __type: "UpdateRatePayload",
      __args: { input: "UpdateRateInput!" },
    },
    updateService: {
      __type: "UpdateServicePayload",
      __args: { input: "UpdateServiceInput!" },
    },
    updateSettings: {
      __type: "UpdateSettingsPayload",
      __args: { input: "UpdateSettingsInput!" },
    },
    updateTag: {
      __type: "UpdateTagPayload",
      __args: { input: "UpdateTagInput!" },
    },
    updateUser: {
      __type: "UpdateUserPayload",
      __args: { input: "UpdateUserInput!" },
    },
  },
  query: {
    __typename: { __type: "String!" },
    allSettings: { __type: "Settings" },
    atlasContentModelerSettingsSettings: {
      __type: "AtlasContentModelerSettingsSettings",
    },
    cXAlert: {
      __type: "CXAlert",
      __args: { asPreview: "Boolean", id: "ID!", idType: "CXAlertIdType" },
    },
    cXAlertBy: {
      __type: "CXAlert",
      __args: { cXAlertId: "Int", id: "ID", slug: "String", uri: "String" },
    },
    cXAlerts: {
      __type: "RootQueryToCXAlertConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToCXAlertConnectionWhereArgs",
      },
    },
    categories: {
      __type: "RootQueryToCategoryConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToCategoryConnectionWhereArgs",
      },
    },
    category: {
      __type: "Category",
      __args: { id: "ID!", idType: "CategoryIdType" },
    },
    comment: {
      __type: "Comment",
      __args: { id: "ID!", idType: "CommentNodeIdTypeEnum" },
    },
    comments: {
      __type: "RootQueryToCommentConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToCommentConnectionWhereArgs",
      },
    },
    contact: {
      __type: "Contact",
      __args: { asPreview: "Boolean", id: "ID!", idType: "ContactIdType" },
    },
    contactBy: {
      __type: "Contact",
      __args: { contactId: "Int", id: "ID", slug: "String", uri: "String" },
    },
    contacts: {
      __type: "RootQueryToContactConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToContactConnectionWhereArgs",
      },
    },
    contentNode: {
      __type: "ContentNode",
      __args: {
        asPreview: "Boolean",
        contentType: "ContentTypeEnum",
        id: "ID!",
        idType: "ContentNodeIdTypeEnum",
      },
    },
    contentNodes: {
      __type: "RootQueryToContentNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToContentNodeConnectionWhereArgs",
      },
    },
    contentType: {
      __type: "ContentType",
      __args: { id: "ID!", idType: "ContentTypeIdTypeEnum" },
    },
    contentTypes: {
      __type: "RootQueryToContentTypeConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    discussionSettings: { __type: "DiscussionSettings" },
    faq: {
      __type: "Faq",
      __args: { asPreview: "Boolean", id: "ID!", idType: "FaqIdType" },
    },
    faqBy: {
      __type: "Faq",
      __args: { faqId: "Int", id: "ID", slug: "String", uri: "String" },
    },
    faqs: {
      __type: "RootQueryToFaqConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToFaqConnectionWhereArgs",
      },
    },
    generalSettings: { __type: "GeneralSettings" },
    genesisBlocksGlobalSettingsSettings: {
      __type: "GenesisBlocksGlobalSettingsSettings",
    },
    mediaItem: {
      __type: "MediaItem",
      __args: { asPreview: "Boolean", id: "ID!", idType: "MediaItemIdType" },
    },
    mediaItemBy: {
      __type: "MediaItem",
      __args: { id: "ID", mediaItemId: "Int", slug: "String", uri: "String" },
    },
    mediaItems: {
      __type: "RootQueryToMediaItemConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToMediaItemConnectionWhereArgs",
      },
    },
    menu: {
      __type: "Menu",
      __args: { id: "ID!", idType: "MenuNodeIdTypeEnum" },
    },
    menuItem: {
      __type: "MenuItem",
      __args: { id: "ID!", idType: "MenuItemNodeIdTypeEnum" },
    },
    menuItems: {
      __type: "RootQueryToMenuItemConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToMenuItemConnectionWhereArgs",
      },
    },
    menus: {
      __type: "RootQueryToMenuConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToMenuConnectionWhereArgs",
      },
    },
    node: { __type: "Node", __args: { id: "ID" } },
    nodeByUri: {
      __type: "UniformResourceIdentifiable",
      __args: { uri: "String!" },
    },
    page: {
      __type: "Page",
      __args: { asPreview: "Boolean", id: "ID!", idType: "PageIdType" },
    },
    pageBy: {
      __type: "Page",
      __args: { id: "ID", pageId: "Int", uri: "String" },
    },
    pages: {
      __type: "RootQueryToPageConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToPageConnectionWhereArgs",
      },
    },
    plugin: { __type: "Plugin", __args: { id: "ID!" } },
    plugins: {
      __type: "RootQueryToPluginConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToPluginConnectionWhereArgs",
      },
    },
    post: {
      __type: "Post",
      __args: { asPreview: "Boolean", id: "ID!", idType: "PostIdType" },
    },
    postBy: {
      __type: "Post",
      __args: { id: "ID", postId: "Int", slug: "String", uri: "String" },
    },
    postFormat: {
      __type: "PostFormat",
      __args: { id: "ID!", idType: "PostFormatIdType" },
    },
    postFormats: {
      __type: "RootQueryToPostFormatConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToPostFormatConnectionWhereArgs",
      },
    },
    posts: {
      __type: "RootQueryToPostConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToPostConnectionWhereArgs",
      },
    },
    product: {
      __type: "Product",
      __args: { asPreview: "Boolean", id: "ID!", idType: "ProductIdType" },
    },
    productBy: {
      __type: "Product",
      __args: { id: "ID", productId: "Int", slug: "String", uri: "String" },
    },
    productName: {
      __type: "ProductName",
      __args: { id: "ID!", idType: "ProductNameIdType" },
    },
    productNames: {
      __type: "RootQueryToProductNameConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToProductNameConnectionWhereArgs",
      },
    },
    products: {
      __type: "RootQueryToProductConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToProductConnectionWhereArgs",
      },
    },
    rate: {
      __type: "Rate",
      __args: { asPreview: "Boolean", id: "ID!", idType: "RateIdType" },
    },
    rateBy: {
      __type: "Rate",
      __args: { id: "ID", rateId: "Int", slug: "String", uri: "String" },
    },
    rates: {
      __type: "RootQueryToRateConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToRateConnectionWhereArgs",
      },
    },
    readingSettings: { __type: "ReadingSettings" },
    registeredScripts: {
      __type: "RootQueryToEnqueuedScriptConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    registeredStylesheets: {
      __type: "RootQueryToEnqueuedStylesheetConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    revisions: {
      __type: "RootQueryToContentRevisionUnionConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToContentRevisionUnionConnectionWhereArgs",
      },
    },
    service: {
      __type: "Service",
      __args: { asPreview: "Boolean", id: "ID!", idType: "ServiceIdType" },
    },
    serviceBy: {
      __type: "Service",
      __args: { id: "ID", serviceId: "Int", slug: "String", uri: "String" },
    },
    services: {
      __type: "RootQueryToServiceConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToServiceConnectionWhereArgs",
      },
    },
    tag: { __type: "Tag", __args: { id: "ID!", idType: "TagIdType" } },
    tags: {
      __type: "RootQueryToTagConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToTagConnectionWhereArgs",
      },
    },
    taxonomies: {
      __type: "RootQueryToTaxonomyConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    taxonomy: {
      __type: "Taxonomy",
      __args: { id: "ID!", idType: "TaxonomyIdTypeEnum" },
    },
    termNode: {
      __type: "TermNode",
      __args: {
        id: "ID!",
        idType: "TermNodeIdTypeEnum",
        taxonomy: "TaxonomyEnum",
      },
    },
    terms: {
      __type: "RootQueryToTermNodeConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToTermNodeConnectionWhereArgs",
      },
    },
    theme: { __type: "Theme", __args: { id: "ID!" } },
    themes: {
      __type: "RootQueryToThemeConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    user: {
      __type: "User",
      __args: { id: "ID!", idType: "UserNodeIdTypeEnum" },
    },
    userRole: { __type: "UserRole", __args: { id: "ID!" } },
    userRoles: {
      __type: "RootQueryToUserRoleConnection",
      __args: { after: "String", before: "String", first: "Int", last: "Int" },
    },
    users: {
      __type: "RootQueryToUserConnection",
      __args: {
        after: "String",
        before: "String",
        first: "Int",
        last: "Int",
        where: "RootQueryToUserConnectionWhereArgs",
      },
    },
    viewer: { __type: "User" },
    writingSettings: { __type: "WritingSettings" },
  },
  subscription: {},
  [SchemaUnionsKey]: {
    ContentNode: [
      "CXAlert",
      "Contact",
      "Faq",
      "MediaItem",
      "Page",
      "Post",
      "Product",
      "Rate",
      "Service",
    ],
    DatabaseIdentifier: [
      "CXAlert",
      "Category",
      "Comment",
      "Contact",
      "Faq",
      "MediaItem",
      "Menu",
      "MenuItem",
      "Page",
      "Post",
      "PostFormat",
      "Product",
      "ProductName",
      "Rate",
      "Service",
      "Tag",
      "User",
    ],
    MenuItemLinkable: [
      "CXAlert",
      "Category",
      "Faq",
      "Page",
      "Post",
      "ProductName",
      "Tag",
    ],
    Node: [
      "CXAlert",
      "Category",
      "Comment",
      "CommentAuthor",
      "Contact",
      "ContentType",
      "EnqueuedScript",
      "EnqueuedStylesheet",
      "Faq",
      "MediaItem",
      "Menu",
      "MenuItem",
      "Page",
      "Plugin",
      "Post",
      "PostFormat",
      "Product",
      "ProductName",
      "Rate",
      "Service",
      "Tag",
      "Taxonomy",
      "Theme",
      "User",
      "UserRole",
    ],
    NodeWithPageAttributes: ["CXAlert", "Page"],
    NodeWithRevisions: ["CXAlert", "Page", "Post"],
    NodeWithTemplate: [
      "CXAlert",
      "Contact",
      "Faq",
      "MediaItem",
      "Page",
      "Post",
      "Product",
      "Rate",
      "Service",
    ],
    NodeWithTitle: [
      "CXAlert",
      "Contact",
      "Faq",
      "MediaItem",
      "Page",
      "Post",
      "Product",
      "Rate",
      "Service",
    ],
    UniformResourceIdentifiable: [
      "CXAlert",
      "Category",
      "Contact",
      "ContentType",
      "Faq",
      "MediaItem",
      "Page",
      "Post",
      "PostFormat",
      "Product",
      "ProductName",
      "Rate",
      "Service",
      "Tag",
      "User",
    ],
    HierarchicalTermNode: ["Category"],
    TermNode: ["Category", "PostFormat", "ProductName", "Tag"],
    Commenter: ["CommentAuthor", "User"],
    NodeWithAuthor: [
      "Contact",
      "Faq",
      "MediaItem",
      "Page",
      "Post",
      "Product",
      "Rate",
      "Service",
    ],
    ContentRevisionUnion: ["CXAlert", "Page", "Post"],
    ContentTemplate: [
      "DefaultTemplate",
      "Template_ApplyNow",
      "Template_FullWidth",
    ],
    EnqueuedAsset: ["EnqueuedScript", "EnqueuedStylesheet"],
    NodeWithComments: ["Faq", "MediaItem", "Page", "Post"],
    NodeWithContentEditor: ["Faq", "Page", "Post"],
    NodeWithExcerpt: ["Faq", "Page", "Post"],
    HierarchicalContentNode: ["MediaItem", "Page"],
    MenuItemObjectUnion: [
      "CXAlert",
      "Category",
      "Faq",
      "Page",
      "Post",
      "ProductName",
      "Tag",
    ],
    NodeWithFeaturedImage: ["Page", "Post"],
    NodeWithTrackbacks: ["Post"],
  },
} as const;

/**
 * The atlasContentModelerSettings setting type
 */
export interface AtlasContentModelerSettingsSettings {
  __typename?: "AtlasContentModelerSettingsSettings";
  /**
   * Opt into anonymous usage tracking to help us make Atlas Content Modeler better.
   */
  atlasContentModelerUsageTracking?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from.
 */
export interface Avatar {
  __typename?: "Avatar";
  /**
   * URL for the default image or a default type. Accepts &#039;404&#039; (return a 404 instead of a default image), &#039;retro&#039; (8bit), &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face), &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;, &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039; (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo).
   */
  default?: Maybe<ScalarsEnums["String"]>;
  /**
   * HTML attributes to insert in the IMG element. Is not sanitized.
   */
  extraAttr?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether to always show the default image, never the Gravatar.
   */
  forceDefault?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the avatar was successfully found.
   */
  foundAvatar?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Height of the avatar image.
   */
  height?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;, &#039;R&#039;, &#039;X&#039;, and are judged in that order.
   */
  rating?: Maybe<ScalarsEnums["String"]>;
  /**
   * Type of url scheme to use. Typically HTTP vs. HTTPS.
   */
  scheme?: Maybe<ScalarsEnums["String"]>;
  /**
   * The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image.
   */
  size?: Maybe<ScalarsEnums["Int"]>;
  /**
   * URL for the gravatar image source.
   */
  url?: Maybe<ScalarsEnums["String"]>;
  /**
   * Width of the avatar image.
   */
  width?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * The CXAlert type
 */
export interface CXAlert {
  __typename?: "CXAlert";
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  cXAlertId: ScalarsEnums["Int"];
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the cx_alert object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types.
   */
  menuOrder?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the CXAlert type and the CXAlert type
   */
  preview?: Maybe<CXAlertToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  /**
   * Connection between the CXAlert type and the CXAlert type
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CXAlertToRevisionConnectionWhereArgs>;
  }) => Maybe<CXAlertToRevisionConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the CXAlert type and the CXAlert type
 */
export interface CXAlertToPreviewConnectionEdge {
  __typename?: "CXAlertToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<CXAlert>;
}

/**
 * Connection between the CXAlert type and the CXAlert type
 */
export interface CXAlertToRevisionConnection {
  __typename?: "CXAlertToRevisionConnection";
  /**
   * Edges for the CXAlertToRevisionConnection connection
   */
  edges?: Maybe<Array<Maybe<CXAlertToRevisionConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<CXAlert>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CXAlertToRevisionConnectionEdge {
  __typename?: "CXAlertToRevisionConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<CXAlert>;
}

/**
 * The category type
 */
export interface Category {
  __typename?: "Category";
  /**
   * The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<CategoryToAncestorsCategoryConnection>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  categoryId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the category type and its children categories.
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToCategoryConnectionWhereArgs>;
  }) => Maybe<CategoryToCategoryConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the Category type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToContentNodeConnectionWhereArgs>;
  }) => Maybe<CategoryToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the category type and its parent category.
   */
  parent?: Maybe<CategoryToParentCategoryConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the Category type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CategoryToPostConnectionWhereArgs>;
  }) => Maybe<CategoryToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Category type and the Taxonomy type
   */
  taxonomy?: Maybe<CategoryToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToAncestorsCategoryConnection {
  __typename?: "CategoryToAncestorsCategoryConnection";
  /**
   * Edges for the CategoryToAncestorsCategoryConnection connection
   */
  edges?: Maybe<Array<Maybe<CategoryToAncestorsCategoryConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CategoryToAncestorsCategoryConnectionEdge {
  __typename?: "CategoryToAncestorsCategoryConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Category>;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToCategoryConnection {
  __typename?: "CategoryToCategoryConnection";
  /**
   * Edges for the CategoryToCategoryConnection connection
   */
  edges?: Maybe<Array<Maybe<CategoryToCategoryConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CategoryToCategoryConnectionEdge {
  __typename?: "CategoryToCategoryConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Category>;
}

/**
 * Connection between the Category type and the ContentNode type
 */
export interface CategoryToContentNodeConnection {
  __typename?: "CategoryToContentNodeConnection";
  /**
   * Edges for the CategoryToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<CategoryToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CategoryToContentNodeConnectionEdge {
  __typename?: "CategoryToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the Category type and the category type
 */
export interface CategoryToParentCategoryConnectionEdge {
  __typename?: "CategoryToParentCategoryConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Category>;
}

/**
 * Connection between the Category type and the post type
 */
export interface CategoryToPostConnection {
  __typename?: "CategoryToPostConnection";
  /**
   * Edges for the CategoryToPostConnection connection
   */
  edges?: Maybe<Array<Maybe<CategoryToPostConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CategoryToPostConnectionEdge {
  __typename?: "CategoryToPostConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the Category type and the Taxonomy type
 */
export interface CategoryToTaxonomyConnectionEdge {
  __typename?: "CategoryToTaxonomyConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Taxonomy>;
}

/**
 * A Comment object
 */
export interface Comment {
  __typename?: "Comment";
  /**
   * User agent used to post the comment. This field is equivalent to WP_Comment-&gt;comment_agent and the value matching the &quot;comment_agent&quot; column in SQL.
   */
  agent?: Maybe<ScalarsEnums["String"]>;
  /**
   * The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL.
   */
  approved?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The author of the comment
   */
  author?: Maybe<CommentToCommenterConnectionEdge>;
  /**
   * IP address for the author. This field is equivalent to WP_Comment-&gt;comment_author_IP and the value matching the &quot;comment_author_IP&quot; column in SQL.
   */
  authorIp?: Maybe<ScalarsEnums["String"]>;
  /**
   * ID for the comment, unique among comments.
   * @deprecated Deprecated in favor of databaseId
   */
  commentId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the Comment type and the ContentNode type
   */
  commentedOn?: Maybe<CommentToContentNodeConnectionEdge>;
  /**
   * Content of the comment. This field is equivalent to WP_Comment-&gt;comment_content and the value matching the &quot;comment_content&quot; column in SQL.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Date the comment was posted in local time. This field is equivalent to WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * Date the comment was posted in GMT. This field is equivalent to WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier for the comment object
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Karma value for the comment. This field is equivalent to WP_Comment-&gt;comment_karma and the value matching the &quot;comment_karma&quot; column in SQL.
   */
  karma?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the Comment type and the Comment type
   */
  parent: (args?: {
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CommentToParentCommentConnectionWhereArgs>;
  }) => Maybe<CommentToParentCommentConnectionEdge>;
  /**
   * The database id of the parent comment node or null if it is the root comment
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent comment node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the Comment type and the Comment type
   */
  replies: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<CommentToCommentConnectionWhereArgs>;
  }) => Maybe<CommentToCommentConnection>;
  /**
   * Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and the value matching the &quot;comment_type&quot; column in SQL.
   */
  type?: Maybe<ScalarsEnums["String"]>;
}

/**
 * A Comment Author object
 */
export interface CommentAuthor {
  __typename?: "CommentAuthor";
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar: (args?: {
    /**
     * Whether to always show the default image, never the Gravatar. Default false
     */
    forceDefault?: Maybe<Scalars["Boolean"]>;
    /**
     * The rating level of the avatar.
     */
    rating?: Maybe<AvatarRatingEnum>;
    /**
     * The size attribute of the avatar field can be used to fetch avatars of different sizes. The value corresponds to the dimension in pixels to fetch. The default is 96 pixels.
     * @defaultValue `96`
     */
    size?: Maybe<Scalars["Int"]>;
  }) => Maybe<Avatar>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The email for the comment author
   */
  email?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier for the comment author object
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The name for the comment author.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The url the comment author.
   */
  url?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Comment type and the Comment type
 */
export interface CommentToCommentConnection {
  __typename?: "CommentToCommentConnection";
  /**
   * Edges for the CommentToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<CommentToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface CommentToCommentConnectionEdge {
  __typename?: "CommentToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the Comment type and the Commenter type
 */
export interface CommentToCommenterConnectionEdge {
  __typename?: "CommentToCommenterConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Commenter>;
}

/**
 * Connection between the Comment type and the ContentNode type
 */
export interface CommentToContentNodeConnectionEdge {
  __typename?: "CommentToContentNodeConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the Comment type and the Comment type
 */
export interface CommentToParentCommentConnectionEdge {
  __typename?: "CommentToParentCommentConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Comment>;
}

/**
 * The author of a comment
 */
export interface Commenter {
  __typename?: "CommentAuthor" | "User";
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar?: Maybe<Avatar>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The email address of the author of a comment.
   */
  email?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier for the comment author.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the author information is considered restricted. (not fully public)
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The name of the author of a comment.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The url of the author of a comment.
   */
  url?: Maybe<ScalarsEnums["String"]>;
  $on: $Commenter;
}

/**
 * GraphQL representation of WordPress Conditional Tags.
 */
export interface ConditionalTags {
  __typename?: "ConditionalTags";
  /**
   * Determines whether the query is for an existing archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isArchive?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing attachment page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isAttachment?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing author archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isAuthor?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing category archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isCategory?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing date archive.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isDate?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing day archive.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isDay?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for the front page of the site.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isFrontPage?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for the blog homepage.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isHome?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing month archive.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isMonth?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether this site has more than one author.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isMultiAuthor?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing single page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isPage?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether currently in a page template.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isPageTemplate?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing post type archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isPostTypeArchive?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for a post or page preview.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for the Privacy Policy page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isPrivacyPolicy?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for a search.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isSearch?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing single post.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isSingle?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing single post of any post type (post, attachment, page, custom post types).
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isSingular?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether a post is sticky.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isSticky?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing tag archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isTag?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing custom taxonomy archive page.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isTax?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Determines whether the query is for an existing year archive.
   * @deprecated Deprecated in favor of using Next.js pages
   */
  isYear?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * The contact type
 */
export interface Contact {
  __typename?: "Contact";
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  contactId: ScalarsEnums["Int"];
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  displayName?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the contact object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Contact type and the contact type
   */
  preview?: Maybe<ContactToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  type?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  value?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Contact type and the contact type
 */
export interface ContactToPreviewConnectionEdge {
  __typename?: "ContactToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Contact>;
}

/**
 * Nodes used to manage content
 */
export interface ContentNode {
  __typename?:
    | "CXAlert"
    | "Contact"
    | "Faq"
    | "MediaItem"
    | "Page"
    | "Post"
    | "Product"
    | "Rate"
    | "Service";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The ID of the node in the database.
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to a node of content
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  $on: $ContentNode;
}

/**
 * Connection between the ContentNode type and the ContentType type
 */
export interface ContentNodeToContentTypeConnectionEdge {
  __typename?: "ContentNodeToContentTypeConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<ContentType>;
}

/**
 * Connection between the ContentNode type and the User type
 */
export interface ContentNodeToEditLastConnectionEdge {
  __typename?: "ContentNodeToEditLastConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<User>;
}

/**
 * Connection between the ContentNode type and the User type
 */
export interface ContentNodeToEditLockConnectionEdge {
  __typename?: "ContentNodeToEditLockConnectionEdge";
  /**
   * The timestamp for when the node was last edited
   */
  lockTimestamp?: Maybe<ScalarsEnums["String"]>;
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<User>;
}

/**
 * Connection between the ContentNode type and the EnqueuedScript type
 */
export interface ContentNodeToEnqueuedScriptConnection {
  __typename?: "ContentNodeToEnqueuedScriptConnection";
  /**
   * Edges for the ContentNodeToEnqueuedScriptConnection connection
   */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedScriptConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ContentNodeToEnqueuedScriptConnectionEdge {
  __typename?: "ContentNodeToEnqueuedScriptConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedScript>;
}

/**
 * Connection between the ContentNode type and the EnqueuedStylesheet type
 */
export interface ContentNodeToEnqueuedStylesheetConnection {
  __typename?: "ContentNodeToEnqueuedStylesheetConnection";
  /**
   * Edges for the ContentNodeToEnqueuedStylesheetConnection connection
   */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedStylesheetConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ContentNodeToEnqueuedStylesheetConnectionEdge {
  __typename?: "ContentNodeToEnqueuedStylesheetConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedStylesheet>;
}

/**
 * A union of Content Node Types that support revisions
 */
export interface ContentRevisionUnion {
  __typename?: "CXAlert" | "Page" | "Post";
  $on: $ContentRevisionUnion;
}

/**
 * The template assigned to a node of content
 */
export interface ContentTemplate {
  __typename?: "DefaultTemplate" | "Template_ApplyNow" | "Template_FullWidth";
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums["String"]>;
  $on: $ContentTemplate;
}

/**
 * An Post Type object
 */
export interface ContentType {
  __typename?: "ContentType";
  /**
   * Whether this content type should can be exported.
   */
  canExport?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentType type and the Taxonomy type
   */
  connectedTaxonomies: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentTypeToTaxonomyConnection>;
  /**
   * Connection between the ContentType type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<ContentTypeToContentNodeConnectionWhereArgs>;
  }) => Maybe<ContentTypeToContentNodeConnection>;
  /**
   * Whether content of this type should be deleted when the author of it is deleted from the system.
   */
  deleteWithUser?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Description of the content type.
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether to exclude nodes of this content type from front end search results.
   */
  excludeFromSearch?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The plural name of the content type within the GraphQL Schema.
   */
  graphqlPluralName?: Maybe<ScalarsEnums["String"]>;
  /**
   * The singular name of the content type within the GraphQL Schema.
   */
  graphqlSingleName?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether this content type should have archives. Content archives are generated by type and by date.
   */
  hasArchive?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the content type is hierarchical, for example pages.
   */
  hierarchical?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The globally unique identifier of the post-type object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether this page is set to the static front page.
   */
  isFrontPage: ScalarsEnums["Boolean"];
  /**
   * Whether this page is set to the blog posts page.
   */
  isPostsPage: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * Display name of the content type.
   */
  label?: Maybe<ScalarsEnums["String"]>;
  /**
   * Details about the content type labels.
   */
  labels?: Maybe<PostTypeLabelDetails>;
  /**
   * The name of the icon file to display as a menu icon.
   */
  menuIcon?: Maybe<ScalarsEnums["String"]>;
  /**
   * The position of this post type in the menu. Only applies if show_in_menu is true.
   */
  menuPosition?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The internal name of the post type. This should not be used for display purposes.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether a content type is intended for use publicly either via the admin interface or by front-end users. While the default settings of exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are inherited from public, each does not rely on this relationship and controls a very specific intention.
   */
  public?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether queries can be performed on the front end for the content type as part of parse_request().
   */
  publiclyQueryable?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Name of content type to display in REST API &quot;wp/v2&quot; namespace.
   */
  restBase?: Maybe<ScalarsEnums["String"]>;
  /**
   * The REST Controller class assigned to handling this content type.
   */
  restControllerClass?: Maybe<ScalarsEnums["String"]>;
  /**
   * Makes this content type available via the admin bar.
   */
  showInAdminBar?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to add the content type to the GraphQL Schema.
   */
  showInGraphql?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Where to show the content type in the admin menu. To work, $show_ui must be true. If true, the post type is shown in its own top level menu. If false, no menu is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot; or &quot;edit.php?post_type=page&quot;), the post type will be placed as a sub-menu of that.
   */
  showInMenu?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Makes this content type available for selection in navigation menus.
   */
  showInNavMenus?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the content type is associated with a route under the the REST API &quot;wp/v2&quot; namespace.
   */
  showInRest?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to generate and allow a UI for managing this content type in the admin.
   */
  showUi?: Maybe<ScalarsEnums["Boolean"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the ContentType type and the ContentNode type
 */
export interface ContentTypeToContentNodeConnection {
  __typename?: "ContentTypeToContentNodeConnection";
  /**
   * Edges for the ContentTypeToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<ContentTypeToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ContentTypeToContentNodeConnectionEdge {
  __typename?: "ContentTypeToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the ContentType type and the Taxonomy type
 */
export interface ContentTypeToTaxonomyConnection {
  __typename?: "ContentTypeToTaxonomyConnection";
  /**
   * Edges for the ContentTypeToTaxonomyConnection connection
   */
  edges?: Maybe<Array<Maybe<ContentTypeToTaxonomyConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ContentTypeToTaxonomyConnectionEdge {
  __typename?: "ContentTypeToTaxonomyConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Taxonomy>;
}

/**
 * The payload for the createCXAlert mutation
 */
export interface CreateCXAlertPayload {
  __typename?: "CreateCXAlertPayload";
  /**
   * The Post object mutation type.
   */
  cXAlert?: Maybe<CXAlert>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the createCategory mutation
 */
export interface CreateCategoryPayload {
  __typename?: "CreateCategoryPayload";
  /**
   * The created category
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the createComment mutation
 */
export interface CreateCommentPayload {
  __typename?: "CreateCommentPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The comment that was created
   */
  comment?: Maybe<Comment>;
  /**
   * Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache
   */
  success?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * The payload for the createContact mutation
 */
export interface CreateContactPayload {
  __typename?: "CreateContactPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  contact?: Maybe<Contact>;
}

/**
 * The payload for the createFaq mutation
 */
export interface CreateFaqPayload {
  __typename?: "CreateFaqPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  faq?: Maybe<Faq>;
}

/**
 * The payload for the createMediaItem mutation
 */
export interface CreateMediaItemPayload {
  __typename?: "CreateMediaItemPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The MediaItem object mutation type.
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the createPage mutation
 */
export interface CreatePagePayload {
  __typename?: "CreatePagePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the createPostFormat mutation
 */
export interface CreatePostFormatPayload {
  __typename?: "CreatePostFormatPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created post_format
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the createPost mutation
 */
export interface CreatePostPayload {
  __typename?: "CreatePostPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the createProductName mutation
 */
export interface CreateProductNamePayload {
  __typename?: "CreateProductNamePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created productname
   */
  productName?: Maybe<ProductName>;
}

/**
 * The payload for the createProduct mutation
 */
export interface CreateProductPayload {
  __typename?: "CreateProductPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  product?: Maybe<Product>;
}

/**
 * The payload for the createRate mutation
 */
export interface CreateRatePayload {
  __typename?: "CreateRatePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  rate?: Maybe<Rate>;
}

/**
 * The payload for the createService mutation
 */
export interface CreateServicePayload {
  __typename?: "CreateServicePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  service?: Maybe<Service>;
}

/**
 * The payload for the createTag mutation
 */
export interface CreateTagPayload {
  __typename?: "CreateTagPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created post_tag
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the createUser mutation
 */
export interface CreateUserPayload {
  __typename?: "CreateUserPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * Object that can be identified with a Database ID
 */
export interface DatabaseIdentifier {
  __typename?:
    | "CXAlert"
    | "Category"
    | "Comment"
    | "Contact"
    | "Faq"
    | "MediaItem"
    | "Menu"
    | "MenuItem"
    | "Page"
    | "Post"
    | "PostFormat"
    | "Product"
    | "ProductName"
    | "Rate"
    | "Service"
    | "Tag"
    | "User";
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  $on: $DatabaseIdentifier;
}

/**
 * The template assigned to the node
 */
export interface DefaultTemplate {
  __typename?: "DefaultTemplate";
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the deleteCXAlert mutation
 */
export interface DeleteCXAlertPayload {
  __typename?: "DeleteCXAlertPayload";
  /**
   * The object before it was deleted
   */
  cXAlert?: Maybe<CXAlert>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
}

/**
 * The payload for the deleteCategory mutation
 */
export interface DeleteCategoryPayload {
  __typename?: "DeleteCategoryPayload";
  /**
   * The deteted term object
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
}

/**
 * The payload for the deleteComment mutation
 */
export interface DeleteCommentPayload {
  __typename?: "DeleteCommentPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The deleted comment object
   */
  comment?: Maybe<Comment>;
  /**
   * The deleted comment ID
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
}

/**
 * The payload for the deleteContact mutation
 */
export interface DeleteContactPayload {
  __typename?: "DeleteContactPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The object before it was deleted
   */
  contact?: Maybe<Contact>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
}

/**
 * The payload for the deleteFaq mutation
 */
export interface DeleteFaqPayload {
  __typename?: "DeleteFaqPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  faq?: Maybe<Faq>;
}

/**
 * The payload for the deleteMediaItem mutation
 */
export interface DeleteMediaItemPayload {
  __typename?: "DeleteMediaItemPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted mediaItem
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The mediaItem before it was deleted
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the deletePage mutation
 */
export interface DeletePagePayload {
  __typename?: "DeletePagePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the deletePostFormat mutation
 */
export interface DeletePostFormatPayload {
  __typename?: "DeletePostFormatPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The deteted term object
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the deletePost mutation
 */
export interface DeletePostPayload {
  __typename?: "DeletePostPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the deleteProductName mutation
 */
export interface DeleteProductNamePayload {
  __typename?: "DeleteProductNamePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The deteted term object
   */
  productName?: Maybe<ProductName>;
}

/**
 * The payload for the deleteProduct mutation
 */
export interface DeleteProductPayload {
  __typename?: "DeleteProductPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  product?: Maybe<Product>;
}

/**
 * The payload for the deleteRate mutation
 */
export interface DeleteRatePayload {
  __typename?: "DeleteRatePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  rate?: Maybe<Rate>;
}

/**
 * The payload for the deleteService mutation
 */
export interface DeleteServicePayload {
  __typename?: "DeleteServicePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The object before it was deleted
   */
  service?: Maybe<Service>;
}

/**
 * The payload for the deleteTag mutation
 */
export interface DeleteTagPayload {
  __typename?: "DeleteTagPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the deleted object
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The deteted term object
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the deleteUser mutation
 */
export interface DeleteUserPayload {
  __typename?: "DeleteUserPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the user that you just deleted
   */
  deletedId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The deleted user object
   */
  user?: Maybe<User>;
}

/**
 * The discussion setting type
 */
export interface DiscussionSettings {
  __typename?: "DiscussionSettings";
  /**
   * Allow people to submit comments on new posts.
   */
  defaultCommentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Allow link notifications from other blogs (pingbacks and trackbacks) on new articles.
   */
  defaultPingStatus?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Asset enqueued by the CMS
 */
export interface EnqueuedAsset {
  __typename?: "EnqueuedScript" | "EnqueuedStylesheet";
  /**
   * @todo
   */
  args?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Extra information needed for the script
   */
  extra?: Maybe<ScalarsEnums["String"]>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the enqueued asset
   */
  id: ScalarsEnums["ID"];
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums["String"]>;
  /**
   * The version of the enqueued asset
   */
  version?: Maybe<ScalarsEnums["String"]>;
  $on: $EnqueuedAsset;
}

/**
 * Script enqueued by the CMS
 */
export interface EnqueuedScript {
  __typename?: "EnqueuedScript";
  /**
   * @todo
   */
  args?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Extra information needed for the script
   */
  extra?: Maybe<ScalarsEnums["String"]>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the enqueued asset
   */
  id: ScalarsEnums["ID"];
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums["String"]>;
  /**
   * The version of the enqueued asset
   */
  version?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Stylesheet enqueued by the CMS
 */
export interface EnqueuedStylesheet {
  __typename?: "EnqueuedStylesheet";
  /**
   * @todo
   */
  args?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Dependencies needed to use this asset
   */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Extra information needed for the script
   */
  extra?: Maybe<ScalarsEnums["String"]>;
  /**
   * The handle of the enqueued asset
   */
  handle?: Maybe<ScalarsEnums["String"]>;
  /**
   * The ID of the enqueued asset
   */
  id: ScalarsEnums["ID"];
  /**
   * The source of the asset
   */
  src?: Maybe<ScalarsEnums["String"]>;
  /**
   * The version of the enqueued asset
   */
  version?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The faq type
 */
export interface Faq {
  __typename?: "Faq";
  /**
   * The cost of the food item
   */
  answer?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Faq type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<FaqToCommentConnectionWhereArgs>;
  }) => Maybe<FaqToCommentConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  faqId: ScalarsEnums["Int"];
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the ufaq object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Faq type and the faq type
   */
  preview?: Maybe<FaqToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Faq type and the Comment type
 */
export interface FaqToCommentConnection {
  __typename?: "FaqToCommentConnection";
  /**
   * Edges for the FaqToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<FaqToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface FaqToCommentConnectionEdge {
  __typename?: "FaqToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the Faq type and the faq type
 */
export interface FaqToPreviewConnectionEdge {
  __typename?: "FaqToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Faq>;
}

/**
 * The general setting type
 */
export interface GeneralSettings {
  __typename?: "GeneralSettings";
  /**
   * A date format for all date strings.
   */
  dateFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * Site tagline.
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * This address is used for admin purposes, like new user notification.
   */
  email?: Maybe<ScalarsEnums["String"]>;
  /**
   * WordPress locale code.
   */
  language?: Maybe<ScalarsEnums["String"]>;
  /**
   * The number of votes
   */
  logo?: Maybe<ScalarsEnums["String"]>;
  /**
   * A day number of the week that the week should start on.
   */
  startOfWeek?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The number of votes
   */
  styleguideVersion?: Maybe<ScalarsEnums["String"]>;
  /**
   * A time format for all time strings.
   */
  timeFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * A city in the same timezone as you.
   */
  timezone?: Maybe<ScalarsEnums["String"]>;
  /**
   * Site title.
   */
  title?: Maybe<ScalarsEnums["String"]>;
  /**
   * Site URL.
   */
  url?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the generateAuthorizationCode mutation
 */
export interface GenerateAuthorizationCodePayload {
  __typename?: "GenerateAuthorizationCodePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * Authorization code used for requesting refresh/access tokens
   */
  code?: Maybe<ScalarsEnums["String"]>;
  /**
   * Error encountered during user authentication, if any
   */
  error?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The genesisBlocksGlobalSettings setting type
 */
export interface GenesisBlocksGlobalSettingsSettings {
  __typename?: "GenesisBlocksGlobalSettingsSettings";
  /**
   * The string Settings Group
   */
  genesisBlocksMailchimpApiKey?: Maybe<ScalarsEnums["String"]>;
  /**
   * The string Settings Group
   */
  genesisProSubscriptionKey?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Content node with hierarchical (parent/child) relationships
 */
export interface HierarchicalContentNode {
  __typename?: "MediaItem" | "Page";
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  $on: $HierarchicalContentNode;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToContentNodeAncestorsConnection {
  __typename?: "HierarchicalContentNodeToContentNodeAncestorsConnection";
  /**
   * Edges for the HierarchicalContentNodeToContentNodeAncestorsConnection connection
   */
  edges?: Maybe<
    Array<Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionEdge>>
  >;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface HierarchicalContentNodeToContentNodeAncestorsConnectionEdge {
  __typename?: "HierarchicalContentNodeToContentNodeAncestorsConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToContentNodeChildrenConnection {
  __typename?: "HierarchicalContentNodeToContentNodeChildrenConnection";
  /**
   * Edges for the HierarchicalContentNodeToContentNodeChildrenConnection connection
   */
  edges?: Maybe<
    Array<Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionEdge>>
  >;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface HierarchicalContentNodeToContentNodeChildrenConnectionEdge {
  __typename?: "HierarchicalContentNodeToContentNodeChildrenConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the HierarchicalContentNode type and the ContentNode type
 */
export interface HierarchicalContentNodeToParentContentNodeConnectionEdge {
  __typename?: "HierarchicalContentNodeToParentContentNodeConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<ContentNode>;
}

/**
 * Term node with hierarchical (parent/child) relationships
 */
export interface HierarchicalTermNode {
  __typename?: "Category";
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  $on: $HierarchicalTermNode;
}

/**
 * File details for a Media Item
 */
export interface MediaDetails {
  __typename?: "MediaDetails";
  /**
   * The filename of the mediaItem
   */
  file?: Maybe<ScalarsEnums["String"]>;
  /**
   * The height of the mediaItem
   */
  height?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Meta information associated with the mediaItem
   */
  meta?: Maybe<MediaItemMeta>;
  /**
   * The available sizes of the mediaItem
   */
  sizes: (args?: {
    /**
     * The sizes to exclude. Will take precedence over `include`.
     */
    exclude?: Maybe<Array<Maybe<MediaItemSizeEnum>>>;
    /**
     * The sizes to include. Can be overridden by `exclude`.
     */
    include?: Maybe<Array<Maybe<MediaItemSizeEnum>>>;
  }) => Maybe<Array<Maybe<MediaSize>>>;
  /**
   * The width of the mediaItem
   */
  width?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * The mediaItem type
 */
export interface MediaItem {
  __typename?: "MediaItem";
  /**
   * Alternative text to display when resource is not displayed
   */
  altText?: Maybe<ScalarsEnums["String"]>;
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The caption for the resource
   */
  caption: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the MediaItem type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MediaItemToCommentConnectionWhereArgs>;
  }) => Maybe<MediaItemToCommentConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * Description of the image (stored as post_content)
   */
  description: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The filesize in bytes of the resource
   */
  fileSize: (args?: {
    /**
     * Size of the MediaItem to return
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums["Int"]>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the attachment object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * Details about the mediaItem
   */
  mediaDetails?: Maybe<MediaDetails>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  mediaItemId: ScalarsEnums["Int"];
  /**
   * Url of the mediaItem
   */
  mediaItemUrl?: Maybe<ScalarsEnums["String"]>;
  /**
   * Type of resource
   */
  mediaType?: Maybe<ScalarsEnums["String"]>;
  /**
   * The mime type of the mediaItem
   */
  mimeType?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The sizes attribute value for an image.
   */
  sizes: (args?: {
    /**
     * Size of the MediaItem to calculate sizes with
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * Url of the mediaItem
   */
  sourceUrl: (args?: {
    /**
     * Size of the MediaItem to return
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths.
   */
  srcSet: (args?: {
    /**
     * Size of the MediaItem to calculate srcSet with
     */
    size?: Maybe<MediaItemSizeEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Meta connected to a MediaItem
 */
export interface MediaItemMeta {
  __typename?: "MediaItemMeta";
  /**
   * Aperture measurement of the media item.
   */
  aperture?: Maybe<ScalarsEnums["Float"]>;
  /**
   * Information about the camera used to create the media item.
   */
  camera?: Maybe<ScalarsEnums["String"]>;
  /**
   * The text string description associated with the media item.
   */
  caption?: Maybe<ScalarsEnums["String"]>;
  /**
   * Copyright information associated with the media item.
   */
  copyright?: Maybe<ScalarsEnums["String"]>;
  /**
   * The date/time when the media was created.
   */
  createdTimestamp?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The original creator of the media item.
   */
  credit?: Maybe<ScalarsEnums["String"]>;
  /**
   * The focal length value of the media item.
   */
  focalLength?: Maybe<ScalarsEnums["Float"]>;
  /**
   * The ISO (International Organization for Standardization) value of the media item.
   */
  iso?: Maybe<ScalarsEnums["Int"]>;
  /**
   * List of keywords used to describe or identfy the media item.
   */
  keywords?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The vertical or horizontal aspect of the media item.
   */
  orientation?: Maybe<ScalarsEnums["String"]>;
  /**
   * The shutter speed information of the media item.
   */
  shutterSpeed?: Maybe<ScalarsEnums["Float"]>;
  /**
   * A useful title for the media item.
   */
  title?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the MediaItem type and the Comment type
 */
export interface MediaItemToCommentConnection {
  __typename?: "MediaItemToCommentConnection";
  /**
   * Edges for the MediaItemToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<MediaItemToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface MediaItemToCommentConnectionEdge {
  __typename?: "MediaItemToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Details of an available size for a media item
 */
export interface MediaSize {
  __typename?: "MediaSize";
  /**
   * The filename of the referenced size
   */
  file?: Maybe<ScalarsEnums["String"]>;
  /**
   * The filesize of the resource
   */
  fileSize?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The height of the referenced size
   */
  height?: Maybe<ScalarsEnums["String"]>;
  /**
   * The mime type of the referenced size
   */
  mimeType?: Maybe<ScalarsEnums["String"]>;
  /**
   * The referenced size name
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The url of the referenced size
   */
  sourceUrl?: Maybe<ScalarsEnums["String"]>;
  /**
   * The width of the referenced size
   */
  width?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme.
 */
export interface Menu {
  __typename?: "Menu";
  /**
   * The number of items in the menu
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The globally unique identifier of the nav menu object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The locations a menu is assigned to
   */
  locations?: Maybe<Array<Maybe<ScalarsEnums["MenuLocationEnum"]>>>;
  /**
   * WP ID of the nav menu.
   * @deprecated Deprecated in favor of the databaseId field
   */
  menuId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the Menu type and the MenuItem type
   */
  menuItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MenuToMenuItemConnectionWhereArgs>;
  }) => Maybe<MenuToMenuItemConnection>;
  /**
   * Display name of the menu. Equivalent to WP_Term-&gt;name.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The url friendly name of the menu. Equivalent to WP_Term-&gt;slug
   */
  slug?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu.
 */
export interface MenuItem {
  __typename?: "MenuItem";
  /**
   * Connection between the MenuItem type and the MenuItem type
   */
  childItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<MenuItemToMenuItemConnectionWhereArgs>;
  }) => Maybe<MenuItemToMenuItemConnection>;
  /**
   * Connection from MenuItem to it&#039;s connected node
   */
  connectedNode?: Maybe<MenuItemToMenuItemLinkableConnectionEdge>;
  /**
   * The object connected to this menu item.
   * @deprecated Deprecated in favor of the connectedNode field
   */
  connectedObject?: Maybe<MenuItemObjectUnion>;
  /**
   * Class attribute for the menu item link
   */
  cssClasses?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Description of the menu item.
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the nav menu item object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Label or title of the menu item.
   */
  label?: Maybe<ScalarsEnums["String"]>;
  /**
   * Link relationship (XFN) of the menu item.
   */
  linkRelationship?: Maybe<ScalarsEnums["String"]>;
  /**
   * The locations the menu item&#039;s Menu is assigned to
   */
  locations?: Maybe<Array<Maybe<ScalarsEnums["MenuLocationEnum"]>>>;
  /**
   * The Menu a MenuItem is part of
   */
  menu?: Maybe<MenuItemToMenuConnectionEdge>;
  /**
   * WP ID of the menu item.
   * @deprecated Deprecated in favor of the databaseId field
   */
  menuItemId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Menu item order
   */
  order?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The database id of the parent menu item or null if it is the root
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent nav menu item object.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Path for the resource. Relative path for internal resources. Absolute path for external resources.
   */
  path?: Maybe<ScalarsEnums["String"]>;
  /**
   * Target attribute for the menu item link.
   */
  target?: Maybe<ScalarsEnums["String"]>;
  /**
   * Title attribute for the menu item link
   */
  title?: Maybe<ScalarsEnums["String"]>;
  /**
   * The uri of the resource the menu item links to
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  /**
   * URL or destination of the menu item.
   */
  url?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Nodes that can be linked to as Menu Items
 */
export interface MenuItemLinkable {
  __typename?:
    | "CXAlert"
    | "Category"
    | "Faq"
    | "Page"
    | "Post"
    | "ProductName"
    | "Tag";
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  $on: $MenuItemLinkable;
}

/**
 * Deprecated in favor of MenuItemLinkeable Interface
 */
export interface MenuItemObjectUnion {
  __typename?:
    | "CXAlert"
    | "Category"
    | "Faq"
    | "Page"
    | "Post"
    | "ProductName"
    | "Tag";
  $on: $MenuItemObjectUnion;
}

/**
 * Connection between the MenuItem type and the Menu type
 */
export interface MenuItemToMenuConnectionEdge {
  __typename?: "MenuItemToMenuConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Menu>;
}

/**
 * Connection between the MenuItem type and the MenuItem type
 */
export interface MenuItemToMenuItemConnection {
  __typename?: "MenuItemToMenuItemConnection";
  /**
   * Edges for the MenuItemToMenuItemConnection connection
   */
  edges?: Maybe<Array<Maybe<MenuItemToMenuItemConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface MenuItemToMenuItemConnectionEdge {
  __typename?: "MenuItemToMenuItemConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<MenuItem>;
}

/**
 * Connection between the MenuItem type and the MenuItemLinkable type
 */
export interface MenuItemToMenuItemLinkableConnectionEdge {
  __typename?: "MenuItemToMenuItemLinkableConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<MenuItemLinkable>;
}

/**
 * Connection between the Menu type and the MenuItem type
 */
export interface MenuToMenuItemConnection {
  __typename?: "MenuToMenuItemConnection";
  /**
   * Edges for the MenuToMenuItemConnection connection
   */
  edges?: Maybe<Array<Maybe<MenuToMenuItemConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface MenuToMenuItemConnectionEdge {
  __typename?: "MenuToMenuItemConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<MenuItem>;
}

/**
 * An object with an ID
 */
export interface Node {
  __typename?:
    | "CXAlert"
    | "Category"
    | "Comment"
    | "CommentAuthor"
    | "Contact"
    | "ContentType"
    | "EnqueuedScript"
    | "EnqueuedStylesheet"
    | "Faq"
    | "MediaItem"
    | "Menu"
    | "MenuItem"
    | "Page"
    | "Plugin"
    | "Post"
    | "PostFormat"
    | "Product"
    | "ProductName"
    | "Rate"
    | "Service"
    | "Tag"
    | "Taxonomy"
    | "Theme"
    | "User"
    | "UserRole";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $Node;
}

/**
 * A node that can have an author assigned to it
 */
export interface NodeWithAuthor {
  __typename?:
    | "Contact"
    | "Faq"
    | "MediaItem"
    | "Page"
    | "Post"
    | "Product"
    | "Rate"
    | "Service";
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $NodeWithAuthor;
}

/**
 * Connection between the NodeWithAuthor type and the User type
 */
export interface NodeWithAuthorToUserConnectionEdge {
  __typename?: "NodeWithAuthorToUserConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<User>;
}

/**
 * A node that can have comments associated with it
 */
export interface NodeWithComments {
  __typename?: "Faq" | "MediaItem" | "Page" | "Post";
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $NodeWithComments;
}

/**
 * A node that supports the content editor
 */
export interface NodeWithContentEditor {
  __typename?: "Faq" | "Page" | "Post";
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $NodeWithContentEditor;
}

/**
 * A node that can have an excerpt
 */
export interface NodeWithExcerpt {
  __typename?: "Faq" | "Page" | "Post";
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $NodeWithExcerpt;
}

/**
 * A node that can have a featured image set
 */
export interface NodeWithFeaturedImage {
  __typename?: "Page" | "Post";
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  $on: $NodeWithFeaturedImage;
}

/**
 * Connection between the NodeWithFeaturedImage type and the MediaItem type
 */
export interface NodeWithFeaturedImageToMediaItemConnectionEdge {
  __typename?: "NodeWithFeaturedImageToMediaItemConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<MediaItem>;
}

/**
 * A node that can have page attributes
 */
export interface NodeWithPageAttributes {
  __typename?: "CXAlert" | "Page";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  /**
   * A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types.
   */
  menuOrder?: Maybe<ScalarsEnums["Int"]>;
  $on: $NodeWithPageAttributes;
}

/**
 * A node that can have revisions
 */
export interface NodeWithRevisions {
  __typename?: "CXAlert" | "Page" | "Post";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  $on: $NodeWithRevisions;
}

/**
 * Connection between the NodeWithRevisions type and the ContentNode type
 */
export interface NodeWithRevisionsToContentNodeConnectionEdge {
  __typename?: "NodeWithRevisionsToContentNodeConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<ContentNode>;
}

/**
 * A node that can have a template associated with it
 */
export interface NodeWithTemplate {
  __typename?:
    | "CXAlert"
    | "Contact"
    | "Faq"
    | "MediaItem"
    | "Page"
    | "Post"
    | "Product"
    | "Rate"
    | "Service";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  $on: $NodeWithTemplate;
}

/**
 * A node that NodeWith a title
 */
export interface NodeWithTitle {
  __typename?:
    | "CXAlert"
    | "Contact"
    | "Faq"
    | "MediaItem"
    | "Page"
    | "Post"
    | "Product"
    | "Rate"
    | "Service";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  $on: $NodeWithTitle;
}

/**
 * A node that can have trackbacks and pingbacks
 */
export interface NodeWithTrackbacks {
  __typename?: "Post";
  /**
   * The globally unique ID for the object
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the pings are open or closed for this particular post.
   */
  pingStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * URLs that have been pinged.
   */
  pinged?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * URLs queued to be pinged.
   */
  toPing?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  $on: $NodeWithTrackbacks;
}

/**
 * The page type
 */
export interface Page {
  __typename?: "Page";
  /**
   * Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root).
   */
  ancestors: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the HierarchicalContentNode type and the ContentNode type
   */
  children: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>;
  }) => Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Page type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PageToCommentConnectionWhereArgs>;
  }) => Maybe<PageToCommentConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the page object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether this page is set to the static front page.
   */
  isFrontPage: ScalarsEnums["Boolean"];
  /**
   * Whether this page is set to the blog posts page.
   */
  isPostsPage: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether this page is set to the privacy page.
   */
  isPrivacyPage: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types.
   */
  menuOrder?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  pageId: ScalarsEnums["Int"];
  /**
   * The parent of the node. The parent object can be of various types
   */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>;
  /**
   * Database id of the parent node
   */
  parentDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the parent node.
   */
  parentId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the Page type and the page type
   */
  preview?: Maybe<PageToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  /**
   * Connection between the Page type and the page type
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PageToRevisionConnectionWhereArgs>;
  }) => Maybe<PageToRevisionConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Page type and the Comment type
 */
export interface PageToCommentConnection {
  __typename?: "PageToCommentConnection";
  /**
   * Edges for the PageToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<PageToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PageToCommentConnectionEdge {
  __typename?: "PageToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the Page type and the page type
 */
export interface PageToPreviewConnectionEdge {
  __typename?: "PageToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Page>;
}

/**
 * Connection between the Page type and the page type
 */
export interface PageToRevisionConnection {
  __typename?: "PageToRevisionConnection";
  /**
   * Edges for the PageToRevisionConnection connection
   */
  edges?: Maybe<Array<Maybe<PageToRevisionConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PageToRevisionConnectionEdge {
  __typename?: "PageToRevisionConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Page>;
}

/**
 * An plugin object
 */
export interface Plugin {
  __typename?: "Plugin";
  /**
   * Name of the plugin author(s), may also be a company name.
   */
  author?: Maybe<ScalarsEnums["String"]>;
  /**
   * URI for the related author(s)/company website.
   */
  authorUri?: Maybe<ScalarsEnums["String"]>;
  /**
   * Description of the plugin.
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the plugin object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Display name of the plugin.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Plugin path.
   */
  path?: Maybe<ScalarsEnums["String"]>;
  /**
   * URI for the plugin website. This is useful for directing users for support requests etc.
   */
  pluginUri?: Maybe<ScalarsEnums["String"]>;
  /**
   * Current version of the plugin.
   */
  version?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The post type
 */
export interface Post {
  __typename?: "Post";
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the Post type and the category type
   */
  categories: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToCategoryConnectionWhereArgs>;
  }) => Maybe<PostToCategoryConnection>;
  /**
   * The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility.
   */
  commentCount?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the comments are open or closed for this particular post.
   */
  commentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Post type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToCommentConnectionWhereArgs>;
  }) => Maybe<PostToCommentConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The content of the post.
   */
  content: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The excerpt of the post.
   */
  excerpt: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
  /**
   * The database identifier for the featured image node assigned to the content node
   */
  featuredImageDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Globally unique ID of the featured image assigned to the node
   */
  featuredImageId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the post object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * True if the node is a revision of another node
   */
  isRevision?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether this page is sticky
   */
  isSticky: ScalarsEnums["Boolean"];
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether the pings are open or closed for this particular post.
   */
  pingStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * URLs that have been pinged.
   */
  pinged?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * Connection between the Post type and the postFormat type
   */
  postFormats: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToPostFormatConnectionWhereArgs>;
  }) => Maybe<PostToPostFormatConnection>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  postId: ScalarsEnums["Int"];
  /**
   * Connection between the Post type and the post type
   */
  preview?: Maybe<PostToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node.
   */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>;
  /**
   * Connection between the Post type and the post type
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToRevisionConnectionWhereArgs>;
  }) => Maybe<PostToRevisionConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Post type and the tag type
   */
  tags: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToTagConnectionWhereArgs>;
  }) => Maybe<PostToTagConnection>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * Connection between the Post type and the TermNode type
   */
  terms: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostToTermNodeConnectionWhereArgs>;
  }) => Maybe<PostToTermNodeConnection>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * URLs queued to be pinged.
   */
  toPing?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The postFormat type
 */
export interface PostFormat {
  __typename?: "PostFormat";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the PostFormat type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostFormatToContentNodeConnectionWhereArgs>;
  }) => Maybe<PostFormatToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  postFormatId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the PostFormat type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<PostFormatToPostConnectionWhereArgs>;
  }) => Maybe<PostFormatToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the PostFormat type and the Taxonomy type
   */
  taxonomy?: Maybe<PostFormatToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the PostFormat type and the ContentNode type
 */
export interface PostFormatToContentNodeConnection {
  __typename?: "PostFormatToContentNodeConnection";
  /**
   * Edges for the PostFormatToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<PostFormatToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostFormatToContentNodeConnectionEdge {
  __typename?: "PostFormatToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the PostFormat type and the post type
 */
export interface PostFormatToPostConnection {
  __typename?: "PostFormatToPostConnection";
  /**
   * Edges for the PostFormatToPostConnection connection
   */
  edges?: Maybe<Array<Maybe<PostFormatToPostConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostFormatToPostConnectionEdge {
  __typename?: "PostFormatToPostConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the PostFormat type and the Taxonomy type
 */
export interface PostFormatToTaxonomyConnectionEdge {
  __typename?: "PostFormatToTaxonomyConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Taxonomy>;
}

/**
 * Connection between the Post type and the category type
 */
export interface PostToCategoryConnection {
  __typename?: "PostToCategoryConnection";
  /**
   * Edges for the PostToCategoryConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToCategoryConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToCategoryConnectionEdge {
  __typename?: "PostToCategoryConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Category>;
}

/**
 * Connection between the Post type and the Comment type
 */
export interface PostToCommentConnection {
  __typename?: "PostToCommentConnection";
  /**
   * Edges for the PostToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToCommentConnectionEdge {
  __typename?: "PostToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the Post type and the postFormat type
 */
export interface PostToPostFormatConnection {
  __typename?: "PostToPostFormatConnection";
  /**
   * Edges for the PostToPostFormatConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToPostFormatConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<PostFormat>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToPostFormatConnectionEdge {
  __typename?: "PostToPostFormatConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<PostFormat>;
}

/**
 * Connection between the Post type and the post type
 */
export interface PostToPreviewConnectionEdge {
  __typename?: "PostToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the Post type and the post type
 */
export interface PostToRevisionConnection {
  __typename?: "PostToRevisionConnection";
  /**
   * Edges for the PostToRevisionConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToRevisionConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToRevisionConnectionEdge {
  __typename?: "PostToRevisionConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the Post type and the tag type
 */
export interface PostToTagConnection {
  __typename?: "PostToTagConnection";
  /**
   * Edges for the PostToTagConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToTagConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Tag>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToTagConnectionEdge {
  __typename?: "PostToTagConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Tag>;
}

/**
 * Connection between the Post type and the TermNode type
 */
export interface PostToTermNodeConnection {
  __typename?: "PostToTermNodeConnection";
  /**
   * Edges for the PostToTermNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<PostToTermNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<TermNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface PostToTermNodeConnectionEdge {
  __typename?: "PostToTermNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<TermNode>;
}

/**
 * Details for labels of the PostType
 */
export interface PostTypeLabelDetails {
  __typename?: "PostTypeLabelDetails";
  /**
   * Default is ‘Add New’ for both hierarchical and non-hierarchical types.
   */
  addNew?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for adding a new singular item.
   */
  addNewItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label to signify all items in a submenu link.
   */
  allItems?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for archives in nav menus
   */
  archives?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the attributes meta box.
   */
  attributes?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for editing a singular item.
   */
  editItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the Featured Image meta box title.
   */
  featuredImage?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the table views hidden heading.
   */
  filterItemsList?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the media frame button.
   */
  insertIntoItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the table hidden heading.
   */
  itemsList?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the table pagination hidden heading.
   */
  itemsListNavigation?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the menu name.
   */
  menuName?: Maybe<ScalarsEnums["String"]>;
  /**
   * General name for the post type, usually plural.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the new item page title.
   */
  newItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label used when no items are found.
   */
  notFound?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label used when no items are in the trash.
   */
  notFoundInTrash?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label used to prefix parents of hierarchical items.
   */
  parentItemColon?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for removing the featured image.
   */
  removeFeaturedImage?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for searching plural items.
   */
  searchItems?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for setting the featured image.
   */
  setFeaturedImage?: Maybe<ScalarsEnums["String"]>;
  /**
   * Name for one object of this post type.
   */
  singularName?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for the media frame filter.
   */
  uploadedToThisItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label in the media frame for using a featured image.
   */
  useFeaturedImage?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for viewing a singular item.
   */
  viewItem?: Maybe<ScalarsEnums["String"]>;
  /**
   * Label for viewing post type archives.
   */
  viewItems?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The product type
 */
export interface Product {
  __typename?: "Product";
  accurateDate?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  bookNowURL?: Maybe<ScalarsEnums["String"]>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  displayName?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the product object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  loanBasedAmount?: Maybe<ScalarsEnums["String"]>;
  memberApplyNowURL?: Maybe<ScalarsEnums["String"]>;
  minorMemberApplyNowURL?: Maybe<ScalarsEnums["String"]>;
  minorNonMemberApplyNowURL?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  nonMemberApplyNowURL?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Product type and the product type
   */
  preview?: Maybe<ProductToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  productApplyURL?: Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  productId: ScalarsEnums["Int"];
  productPageURL?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the product type and the rate type
   */
  rates: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ProductToRateConnection>;
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The productName type
 */
export interface ProductName {
  __typename?: "ProductName";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ProductName type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<ProductNameToContentNodeConnectionWhereArgs>;
  }) => Maybe<ProductNameToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  productNameId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the ProductName type and the rate type
   */
  rates: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<ProductNameToRateConnectionWhereArgs>;
  }) => Maybe<ProductNameToRateConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ProductName type and the Taxonomy type
   */
  taxonomy?: Maybe<ProductNameToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the ProductName type and the ContentNode type
 */
export interface ProductNameToContentNodeConnection {
  __typename?: "ProductNameToContentNodeConnection";
  /**
   * Edges for the ProductNameToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<ProductNameToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ProductNameToContentNodeConnectionEdge {
  __typename?: "ProductNameToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the ProductName type and the rate type
 */
export interface ProductNameToRateConnection {
  __typename?: "ProductNameToRateConnection";
  /**
   * Edges for the ProductNameToRateConnection connection
   */
  edges?: Maybe<Array<Maybe<ProductNameToRateConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Rate>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ProductNameToRateConnectionEdge {
  __typename?: "ProductNameToRateConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Rate>;
}

/**
 * Connection between the ProductName type and the Taxonomy type
 */
export interface ProductNameToTaxonomyConnectionEdge {
  __typename?: "ProductNameToTaxonomyConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Taxonomy>;
}

/**
 * Connection between the Product type and the product type
 */
export interface ProductToPreviewConnectionEdge {
  __typename?: "ProductToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Product>;
}

/**
 * Connection between the product type and the rate type
 */
export interface ProductToRateConnection {
  __typename?: "ProductToRateConnection";
  /**
   * Edges for the ProductToRateConnection connection
   */
  edges?: Maybe<Array<Maybe<ProductToRateConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Rate>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface ProductToRateConnectionEdge {
  __typename?: "ProductToRateConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Rate>;
}

/**
 * The rate type
 */
export interface Rate {
  __typename?: "Rate";
  aprapy?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  displayName?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the rate object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  minimumBalance?: Maybe<ScalarsEnums["Float"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  payment?: Maybe<ScalarsEnums["Float"]>;
  /**
   * Connection between the Rate type and the rate type
   */
  preview?: Maybe<RateToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * Connection between the rate type and the product type
   */
  product: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RateToProductConnection>;
  /**
   * Connection between the Rate type and the productName type
   */
  productNames: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<RateToProductNameConnectionWhereArgs>;
  }) => Maybe<RateToProductNameConnection>;
  rate?: Maybe<ScalarsEnums["Float"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  rateId: ScalarsEnums["Int"];
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  term?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Rate type and the TermNode type
   */
  terms: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<RateToTermNodeConnectionWhereArgs>;
  }) => Maybe<RateToTermNodeConnection>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Rate type and the rate type
 */
export interface RateToPreviewConnectionEdge {
  __typename?: "RateToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Rate>;
}

/**
 * Connection between the rate type and the product type
 */
export interface RateToProductConnection {
  __typename?: "RateToProductConnection";
  /**
   * Edges for the RateToProductConnection connection
   */
  edges?: Maybe<Array<Maybe<RateToProductConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Product>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RateToProductConnectionEdge {
  __typename?: "RateToProductConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Product>;
}

/**
 * Connection between the Rate type and the productName type
 */
export interface RateToProductNameConnection {
  __typename?: "RateToProductNameConnection";
  /**
   * Edges for the RateToProductNameConnection connection
   */
  edges?: Maybe<Array<Maybe<RateToProductNameConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ProductName>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RateToProductNameConnectionEdge {
  __typename?: "RateToProductNameConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ProductName>;
}

/**
 * Connection between the Rate type and the TermNode type
 */
export interface RateToTermNodeConnection {
  __typename?: "RateToTermNodeConnection";
  /**
   * Edges for the RateToTermNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<RateToTermNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<TermNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RateToTermNodeConnectionEdge {
  __typename?: "RateToTermNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<TermNode>;
}

/**
 * The reading setting type
 */
export interface ReadingSettings {
  __typename?: "ReadingSettings";
  /**
   * The ID of the page that should display the latest posts
   */
  pageForPosts?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The ID of the page that should be displayed on the front page
   */
  pageOnFront?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Blog pages show at most.
   */
  postsPerPage?: Maybe<ScalarsEnums["Int"]>;
  /**
   * What to show on the front page
   */
  showOnFront?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the registerUser mutation
 */
export interface RegisterUserPayload {
  __typename?: "RegisterUserPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * The payload for the resetUserPassword mutation
 */
export interface ResetUserPasswordPayload {
  __typename?: "ResetUserPasswordPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * The payload for the restoreComment mutation
 */
export interface RestoreCommentPayload {
  __typename?: "RestoreCommentPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The restored comment object
   */
  comment?: Maybe<Comment>;
  /**
   * The ID of the restored comment
   */
  restoredId?: Maybe<ScalarsEnums["ID"]>;
}

/**
 * Connection between the RootQuery type and the CXAlert type
 */
export interface RootQueryToCXAlertConnection {
  __typename?: "RootQueryToCXAlertConnection";
  /**
   * Edges for the RootQueryToCXAlertConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToCXAlertConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<CXAlert>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToCXAlertConnectionEdge {
  __typename?: "RootQueryToCXAlertConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<CXAlert>;
}

/**
 * Connection between the RootQuery type and the category type
 */
export interface RootQueryToCategoryConnection {
  __typename?: "RootQueryToCategoryConnection";
  /**
   * Edges for the RootQueryToCategoryConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToCategoryConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToCategoryConnectionEdge {
  __typename?: "RootQueryToCategoryConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Category>;
}

/**
 * Connection between the RootQuery type and the Comment type
 */
export interface RootQueryToCommentConnection {
  __typename?: "RootQueryToCommentConnection";
  /**
   * Edges for the RootQueryToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToCommentConnectionEdge {
  __typename?: "RootQueryToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the RootQuery type and the contact type
 */
export interface RootQueryToContactConnection {
  __typename?: "RootQueryToContactConnection";
  /**
   * Edges for the RootQueryToContactConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToContactConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Contact>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContactConnectionEdge {
  __typename?: "RootQueryToContactConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Contact>;
}

/**
 * Connection between the RootQuery type and the ContentNode type
 */
export interface RootQueryToContentNodeConnection {
  __typename?: "RootQueryToContentNodeConnection";
  /**
   * Edges for the RootQueryToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContentNodeConnectionEdge {
  __typename?: "RootQueryToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the RootQuery type and the ContentRevisionUnion type
 */
export interface RootQueryToContentRevisionUnionConnection {
  __typename?: "RootQueryToContentRevisionUnionConnection";
  /**
   * Edges for the RootQueryToContentRevisionUnionConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToContentRevisionUnionConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContentRevisionUnionConnectionEdge {
  __typename?: "RootQueryToContentRevisionUnionConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentRevisionUnion>;
}

/**
 * Connection between the RootQuery type and the ContentType type
 */
export interface RootQueryToContentTypeConnection {
  __typename?: "RootQueryToContentTypeConnection";
  /**
   * Edges for the RootQueryToContentTypeConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToContentTypeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentType>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToContentTypeConnectionEdge {
  __typename?: "RootQueryToContentTypeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentType>;
}

/**
 * Connection between the RootQuery type and the EnqueuedScript type
 */
export interface RootQueryToEnqueuedScriptConnection {
  __typename?: "RootQueryToEnqueuedScriptConnection";
  /**
   * Edges for the RootQueryToEnqueuedScriptConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedScriptConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToEnqueuedScriptConnectionEdge {
  __typename?: "RootQueryToEnqueuedScriptConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedScript>;
}

/**
 * Connection between the RootQuery type and the EnqueuedStylesheet type
 */
export interface RootQueryToEnqueuedStylesheetConnection {
  __typename?: "RootQueryToEnqueuedStylesheetConnection";
  /**
   * Edges for the RootQueryToEnqueuedStylesheetConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedStylesheetConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToEnqueuedStylesheetConnectionEdge {
  __typename?: "RootQueryToEnqueuedStylesheetConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedStylesheet>;
}

/**
 * Connection between the RootQuery type and the faq type
 */
export interface RootQueryToFaqConnection {
  __typename?: "RootQueryToFaqConnection";
  /**
   * Edges for the RootQueryToFaqConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToFaqConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Faq>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToFaqConnectionEdge {
  __typename?: "RootQueryToFaqConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Faq>;
}

/**
 * Connection between the RootQuery type and the mediaItem type
 */
export interface RootQueryToMediaItemConnection {
  __typename?: "RootQueryToMediaItemConnection";
  /**
   * Edges for the RootQueryToMediaItemConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToMediaItemConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<MediaItem>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMediaItemConnectionEdge {
  __typename?: "RootQueryToMediaItemConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<MediaItem>;
}

/**
 * Connection between the RootQuery type and the Menu type
 */
export interface RootQueryToMenuConnection {
  __typename?: "RootQueryToMenuConnection";
  /**
   * Edges for the RootQueryToMenuConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToMenuConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Menu>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMenuConnectionEdge {
  __typename?: "RootQueryToMenuConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Menu>;
}

/**
 * Connection between the RootQuery type and the MenuItem type
 */
export interface RootQueryToMenuItemConnection {
  __typename?: "RootQueryToMenuItemConnection";
  /**
   * Edges for the RootQueryToMenuItemConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToMenuItemConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<MenuItem>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToMenuItemConnectionEdge {
  __typename?: "RootQueryToMenuItemConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<MenuItem>;
}

/**
 * Connection between the RootQuery type and the page type
 */
export interface RootQueryToPageConnection {
  __typename?: "RootQueryToPageConnection";
  /**
   * Edges for the RootQueryToPageConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToPageConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPageConnectionEdge {
  __typename?: "RootQueryToPageConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Page>;
}

/**
 * Connection between the RootQuery type and the Plugin type
 */
export interface RootQueryToPluginConnection {
  __typename?: "RootQueryToPluginConnection";
  /**
   * Edges for the RootQueryToPluginConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToPluginConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Plugin>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPluginConnectionEdge {
  __typename?: "RootQueryToPluginConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Plugin>;
}

/**
 * Connection between the RootQuery type and the post type
 */
export interface RootQueryToPostConnection {
  __typename?: "RootQueryToPostConnection";
  /**
   * Edges for the RootQueryToPostConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToPostConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPostConnectionEdge {
  __typename?: "RootQueryToPostConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the RootQuery type and the postFormat type
 */
export interface RootQueryToPostFormatConnection {
  __typename?: "RootQueryToPostFormatConnection";
  /**
   * Edges for the RootQueryToPostFormatConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToPostFormatConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<PostFormat>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToPostFormatConnectionEdge {
  __typename?: "RootQueryToPostFormatConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<PostFormat>;
}

/**
 * Connection between the RootQuery type and the product type
 */
export interface RootQueryToProductConnection {
  __typename?: "RootQueryToProductConnection";
  /**
   * Edges for the RootQueryToProductConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToProductConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Product>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToProductConnectionEdge {
  __typename?: "RootQueryToProductConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Product>;
}

/**
 * Connection between the RootQuery type and the productName type
 */
export interface RootQueryToProductNameConnection {
  __typename?: "RootQueryToProductNameConnection";
  /**
   * Edges for the RootQueryToProductNameConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToProductNameConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ProductName>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToProductNameConnectionEdge {
  __typename?: "RootQueryToProductNameConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ProductName>;
}

/**
 * Connection between the RootQuery type and the rate type
 */
export interface RootQueryToRateConnection {
  __typename?: "RootQueryToRateConnection";
  /**
   * Edges for the RootQueryToRateConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToRateConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Rate>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToRateConnectionEdge {
  __typename?: "RootQueryToRateConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Rate>;
}

/**
 * Connection between the RootQuery type and the service type
 */
export interface RootQueryToServiceConnection {
  __typename?: "RootQueryToServiceConnection";
  /**
   * Edges for the RootQueryToServiceConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToServiceConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Service>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToServiceConnectionEdge {
  __typename?: "RootQueryToServiceConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Service>;
}

/**
 * Connection between the RootQuery type and the tag type
 */
export interface RootQueryToTagConnection {
  __typename?: "RootQueryToTagConnection";
  /**
   * Edges for the RootQueryToTagConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToTagConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Tag>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTagConnectionEdge {
  __typename?: "RootQueryToTagConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Tag>;
}

/**
 * Connection between the RootQuery type and the Taxonomy type
 */
export interface RootQueryToTaxonomyConnection {
  __typename?: "RootQueryToTaxonomyConnection";
  /**
   * Edges for the RootQueryToTaxonomyConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToTaxonomyConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTaxonomyConnectionEdge {
  __typename?: "RootQueryToTaxonomyConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Taxonomy>;
}

/**
 * Connection between the RootQuery type and the TermNode type
 */
export interface RootQueryToTermNodeConnection {
  __typename?: "RootQueryToTermNodeConnection";
  /**
   * Edges for the RootQueryToTermNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToTermNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<TermNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToTermNodeConnectionEdge {
  __typename?: "RootQueryToTermNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<TermNode>;
}

/**
 * Connection between the RootQuery type and the Theme type
 */
export interface RootQueryToThemeConnection {
  __typename?: "RootQueryToThemeConnection";
  /**
   * Edges for the RootQueryToThemeConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToThemeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Theme>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToThemeConnectionEdge {
  __typename?: "RootQueryToThemeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Theme>;
}

/**
 * Connection between the RootQuery type and the User type
 */
export interface RootQueryToUserConnection {
  __typename?: "RootQueryToUserConnection";
  /**
   * Edges for the RootQueryToUserConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToUserConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<User>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToUserConnectionEdge {
  __typename?: "RootQueryToUserConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<User>;
}

/**
 * Connection between the RootQuery type and the UserRole type
 */
export interface RootQueryToUserRoleConnection {
  __typename?: "RootQueryToUserRoleConnection";
  /**
   * Edges for the RootQueryToUserRoleConnection connection
   */
  edges?: Maybe<Array<Maybe<RootQueryToUserRoleConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<UserRole>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface RootQueryToUserRoleConnectionEdge {
  __typename?: "RootQueryToUserRoleConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<UserRole>;
}

/**
 * The payload for the sendPasswordResetEmail mutation
 */
export interface SendPasswordResetEmailPayload {
  __typename?: "SendPasswordResetEmailPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The user that the password reset email was sent to
   */
  user?: Maybe<User>;
}

/**
 * The service type
 */
export interface Service {
  __typename?: "Service";
  /**
   * Connection between the NodeWithAuthor type and the User type
   */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>;
  /**
   * The database identifier of the author of the node
   */
  authorDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The globally unique identifier of the author of the node
   */
  authorId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the ContentNode type and the ContentType type
   */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>;
  /**
   * The name of the Content Type the node belongs to
   */
  contentTypeName: ScalarsEnums["String"];
  /**
   * The unique identifier stored in the database
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Post publishing date.
   */
  date?: Maybe<ScalarsEnums["String"]>;
  /**
   * The publishing date set in GMT.
   */
  dateGmt?: Maybe<ScalarsEnums["String"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * The desired slug of the post
   */
  desiredSlug?: Maybe<ScalarsEnums["String"]>;
  displayName?: Maybe<ScalarsEnums["String"]>;
  /**
   * If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds
   */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>;
  /**
   * The RSS enclosure for the object
   */
  enclosure?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the ContentNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the ContentNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<ContentNodeToEnqueuedStylesheetConnection>;
  /**
   * The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table.
   */
  guid?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the service object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is a node in the preview state
   */
  isPreview?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The user that most recently edited the node
   */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>;
  /**
   * The permalink of the post
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time.
   */
  modified?: Maybe<ScalarsEnums["String"]>;
  /**
   * The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT.
   */
  modifiedGmt?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Service type and the service type
   */
  preview?: Maybe<ServiceToPreviewConnectionEdge>;
  /**
   * The database id of the preview node
   */
  previewRevisionDatabaseId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Whether the object is a node in the preview state
   */
  previewRevisionId?: Maybe<ScalarsEnums["ID"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of the databaseId field
   */
  serviceId: ScalarsEnums["Int"];
  /**
   * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current status of the object
   */
  status?: Maybe<ScalarsEnums["String"]>;
  /**
   * The template assigned to the node
   */
  template?: Maybe<ContentTemplate>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: (args?: {
    /**
     * Format of the field output
     */
    format?: Maybe<PostObjectFieldFormatEnum>;
  }) => Maybe<ScalarsEnums["String"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Service type and the service type
 */
export interface ServiceToPreviewConnectionEdge {
  __typename?: "ServiceToPreviewConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Service>;
}

/**
 * All of the registered settings
 */
export interface Settings {
  __typename?: "Settings";
  /**
   * Settings of the the string Settings Group
   */
  atlasContentModelerSettingsSettingsAtlasContentModelerUsageTracking?: Maybe<
    ScalarsEnums["String"]
  >;
  /**
   * Settings of the the string Settings Group
   */
  discussionSettingsDefaultCommentStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  discussionSettingsDefaultPingStatus?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsDateFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsDescription?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsEmail?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsLanguage?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the integer Settings Group
   */
  generalSettingsStartOfWeek?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTimeFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTimezone?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsTitle?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  generalSettingsUrl?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the string Settings Group
   */
  genesisBlocksGlobalSettingsSettingsGenesisBlocksMailchimpApiKey?: Maybe<
    ScalarsEnums["String"]
  >;
  /**
   * Settings of the the string Settings Group
   */
  genesisBlocksGlobalSettingsSettingsGenesisProSubscriptionKey?: Maybe<
    ScalarsEnums["String"]
  >;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPageForPosts?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPageOnFront?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Settings of the the integer Settings Group
   */
  readingSettingsPostsPerPage?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Settings of the the string Settings Group
   */
  readingSettingsShowOnFront?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the integer Settings Group
   */
  writingSettingsDefaultCategory?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Settings of the the string Settings Group
   */
  writingSettingsDefaultPostFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * Settings of the the boolean Settings Group
   */
  writingSettingsUseSmilies?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * The tag type
 */
export interface Tag {
  __typename?: "Tag";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the Tag type and the ContentNode type
   */
  contentNodes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<TagToContentNodeConnectionWhereArgs>;
  }) => Maybe<TagToContentNodeConnection>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the Tag type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<TagToPostConnectionWhereArgs>;
  }) => Maybe<TagToPostConnection>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The id field matches the WP_Post-&gt;ID field.
   * @deprecated Deprecated in favor of databaseId
   */
  tagId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Connection between the Tag type and the Taxonomy type
   */
  taxonomy?: Maybe<TagToTaxonomyConnectionEdge>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the Tag type and the ContentNode type
 */
export interface TagToContentNodeConnection {
  __typename?: "TagToContentNodeConnection";
  /**
   * Edges for the TagToContentNodeConnection connection
   */
  edges?: Maybe<Array<Maybe<TagToContentNodeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentNode>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface TagToContentNodeConnectionEdge {
  __typename?: "TagToContentNodeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentNode>;
}

/**
 * Connection between the Tag type and the post type
 */
export interface TagToPostConnection {
  __typename?: "TagToPostConnection";
  /**
   * Edges for the TagToPostConnection connection
   */
  edges?: Maybe<Array<Maybe<TagToPostConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface TagToPostConnectionEdge {
  __typename?: "TagToPostConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the Tag type and the Taxonomy type
 */
export interface TagToTaxonomyConnectionEdge {
  __typename?: "TagToTaxonomyConnectionEdge";
  /**
   * The node of the connection, without the edges
   */
  node?: Maybe<Taxonomy>;
}

/**
 * A taxonomy object
 */
export interface Taxonomy {
  __typename?: "Taxonomy";
  /**
   * List of Content Types associated with the Taxonomy
   */
  connectedContentTypes: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TaxonomyToContentTypeConnection>;
  /**
   * Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * The plural name of the post type within the GraphQL Schema.
   */
  graphqlPluralName?: Maybe<ScalarsEnums["String"]>;
  /**
   * The singular name of the post type within the GraphQL Schema.
   */
  graphqlSingleName?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether the taxonomy is hierarchical
   */
  hierarchical?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The globally unique identifier of the taxonomy object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Name of the taxonomy shown in the menu. Usually plural.
   */
  label?: Maybe<ScalarsEnums["String"]>;
  /**
   * The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether the taxonomy is publicly queryable
   */
  public?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Name of content type to diplay in REST API &quot;wp/v2&quot; namespace.
   */
  restBase?: Maybe<ScalarsEnums["String"]>;
  /**
   * The REST Controller class assigned to handling this content type.
   */
  restControllerClass?: Maybe<ScalarsEnums["String"]>;
  /**
   * Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud
   */
  showCloud?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to display a column for the taxonomy on its post type listing screens.
   */
  showInAdminColumn?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to add the post type to the GraphQL Schema.
   */
  showInGraphql?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to show the taxonomy in the admin menu
   */
  showInMenu?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the taxonomy is available for selection in navigation menus.
   */
  showInNavMenus?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to show the taxonomy in the quick/bulk edit panel.
   */
  showInQuickEdit?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace.
   */
  showInRest?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether to generate and allow a UI for managing terms in this taxonomy in the admin
   */
  showUi?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * Connection between the Taxonomy type and the ContentType type
 */
export interface TaxonomyToContentTypeConnection {
  __typename?: "TaxonomyToContentTypeConnection";
  /**
   * Edges for the TaxonomyToContentTypeConnection connection
   */
  edges?: Maybe<Array<Maybe<TaxonomyToContentTypeConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentType>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface TaxonomyToContentTypeConnectionEdge {
  __typename?: "TaxonomyToContentTypeConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentType>;
}

/**
 * The template assigned to the node
 */
export interface Template_ApplyNow {
  __typename?: "Template_ApplyNow";
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The template assigned to the node
 */
export interface Template_FullWidth {
  __typename?: "Template_FullWidth";
  /**
   * The name of the template
   */
  templateName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Terms are nodes within a Taxonomy, used to group and relate other nodes.
 */
export interface TermNode {
  __typename?: "Category" | "PostFormat" | "ProductName" | "Tag";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The number of objects connected to the object
   */
  count?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * The description of the object
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the TermNode type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedScriptConnection>;
  /**
   * Connection between the TermNode type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<TermNodeToEnqueuedStylesheetConnection>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * The link to the term
   */
  link?: Maybe<ScalarsEnums["String"]>;
  /**
   * The human friendly name of the object.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * An alphanumeric identifier for the object unique to its type.
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * The name of the taxonomy that the object is associated with
   */
  taxonomyName?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The ID of the term group that this term object belongs to
   */
  termGroupId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The taxonomy ID that the object is associated with
   */
  termTaxonomyId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  $on: $TermNode;
}

/**
 * Connection between the TermNode type and the EnqueuedScript type
 */
export interface TermNodeToEnqueuedScriptConnection {
  __typename?: "TermNodeToEnqueuedScriptConnection";
  /**
   * Edges for the TermNodeToEnqueuedScriptConnection connection
   */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedScriptConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface TermNodeToEnqueuedScriptConnectionEdge {
  __typename?: "TermNodeToEnqueuedScriptConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedScript>;
}

/**
 * Connection between the TermNode type and the EnqueuedStylesheet type
 */
export interface TermNodeToEnqueuedStylesheetConnection {
  __typename?: "TermNodeToEnqueuedStylesheetConnection";
  /**
   * Edges for the TermNodeToEnqueuedStylesheetConnection connection
   */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedStylesheetConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface TermNodeToEnqueuedStylesheetConnectionEdge {
  __typename?: "TermNodeToEnqueuedStylesheetConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedStylesheet>;
}

/**
 * A theme object
 */
export interface Theme {
  __typename?: "Theme";
  /**
   * Name of the theme author(s), could also be a company name. This field is equivalent to WP_Theme-&gt;get( &quot;Author&quot; ).
   */
  author?: Maybe<ScalarsEnums["String"]>;
  /**
   * URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ).
   */
  authorUri?: Maybe<ScalarsEnums["String"]>;
  /**
   * The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ).
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier of the theme object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ).
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The URL of the screenshot for the theme. The screenshot is intended to give an overview of what the theme looks like. This field is equivalent to WP_Theme-&gt;get_screenshot().
   */
  screenshot?: Maybe<ScalarsEnums["String"]>;
  /**
   * The theme slug is used to internally match themes. Theme slugs can have subdirectories like: my-theme/sub-theme. This field is equivalent to WP_Theme-&gt;get_stylesheet().
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  /**
   * URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ).
   */
  tags?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * A URI if the theme has a website associated with it. The Theme URI is handy for directing users to a theme site for support etc. This field is equivalent to WP_Theme-&gt;get( &quot;ThemeURI&quot; ).
   */
  themeUri?: Maybe<ScalarsEnums["String"]>;
  /**
   * The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ).
   */
  version?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Any node that has a URI
 */
export interface UniformResourceIdentifiable {
  __typename?:
    | "CXAlert"
    | "Category"
    | "Contact"
    | "ContentType"
    | "Faq"
    | "MediaItem"
    | "Page"
    | "Post"
    | "PostFormat"
    | "Product"
    | "ProductName"
    | "Rate"
    | "Service"
    | "Tag"
    | "User";
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * The unique resource identifier path
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  $on: $UniformResourceIdentifiable;
}

/**
 * The payload for the updateCXAlert mutation
 */
export interface UpdateCXAlertPayload {
  __typename?: "UpdateCXAlertPayload";
  /**
   * The Post object mutation type.
   */
  cXAlert?: Maybe<CXAlert>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the UpdateCategory mutation
 */
export interface UpdateCategoryPayload {
  __typename?: "UpdateCategoryPayload";
  /**
   * The created category
   */
  category?: Maybe<Category>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The payload for the updateComment mutation
 */
export interface UpdateCommentPayload {
  __typename?: "UpdateCommentPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The comment that was created
   */
  comment?: Maybe<Comment>;
  /**
   * Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache
   */
  success?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * The payload for the updateContact mutation
 */
export interface UpdateContactPayload {
  __typename?: "UpdateContactPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  contact?: Maybe<Contact>;
}

/**
 * The payload for the updateFaq mutation
 */
export interface UpdateFaqPayload {
  __typename?: "UpdateFaqPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  faq?: Maybe<Faq>;
}

/**
 * The payload for the updateMediaItem mutation
 */
export interface UpdateMediaItemPayload {
  __typename?: "UpdateMediaItemPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The MediaItem object mutation type.
   */
  mediaItem?: Maybe<MediaItem>;
}

/**
 * The payload for the updatePage mutation
 */
export interface UpdatePagePayload {
  __typename?: "UpdatePagePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  page?: Maybe<Page>;
}

/**
 * The payload for the UpdatePostFormat mutation
 */
export interface UpdatePostFormatPayload {
  __typename?: "UpdatePostFormatPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created post_format
   */
  postFormat?: Maybe<PostFormat>;
}

/**
 * The payload for the updatePost mutation
 */
export interface UpdatePostPayload {
  __typename?: "UpdatePostPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  post?: Maybe<Post>;
}

/**
 * The payload for the UpdateProductName mutation
 */
export interface UpdateProductNamePayload {
  __typename?: "UpdateProductNamePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created productname
   */
  productName?: Maybe<ProductName>;
}

/**
 * The payload for the updateProduct mutation
 */
export interface UpdateProductPayload {
  __typename?: "UpdateProductPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  product?: Maybe<Product>;
}

/**
 * The payload for the updateRate mutation
 */
export interface UpdateRatePayload {
  __typename?: "UpdateRatePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  rate?: Maybe<Rate>;
}

/**
 * The payload for the updateService mutation
 */
export interface UpdateServicePayload {
  __typename?: "UpdateServicePayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Post object mutation type.
   */
  service?: Maybe<Service>;
}

/**
 * The payload for the updateSettings mutation
 */
export interface UpdateSettingsPayload {
  __typename?: "UpdateSettingsPayload";
  /**
   * Update all settings.
   */
  allSettings?: Maybe<Settings>;
  /**
   * Update the AtlasContentModelerSettingsSettings setting.
   */
  atlasContentModelerSettingsSettings?: Maybe<AtlasContentModelerSettingsSettings>;
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * Update the DiscussionSettings setting.
   */
  discussionSettings?: Maybe<DiscussionSettings>;
  /**
   * Update the GeneralSettings setting.
   */
  generalSettings?: Maybe<GeneralSettings>;
  /**
   * Update the GenesisBlocksGlobalSettingsSettings setting.
   */
  genesisBlocksGlobalSettingsSettings?: Maybe<GenesisBlocksGlobalSettingsSettings>;
  /**
   * Update the ReadingSettings setting.
   */
  readingSettings?: Maybe<ReadingSettings>;
  /**
   * Update the WritingSettings setting.
   */
  writingSettings?: Maybe<WritingSettings>;
}

/**
 * The payload for the UpdateTag mutation
 */
export interface UpdateTagPayload {
  __typename?: "UpdateTagPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The created post_tag
   */
  tag?: Maybe<Tag>;
}

/**
 * The payload for the updateUser mutation
 */
export interface UpdateUserPayload {
  __typename?: "UpdateUserPayload";
  /**
   * If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions.
   */
  clientMutationId?: Maybe<ScalarsEnums["String"]>;
  /**
   * The User object mutation type.
   */
  user?: Maybe<User>;
}

/**
 * A User object
 */
export interface User {
  __typename?: "User";
  /**
   * Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument.
   */
  avatar: (args?: {
    /**
     * Whether to always show the default image, never the Gravatar. Default false
     */
    forceDefault?: Maybe<Scalars["Boolean"]>;
    /**
     * The rating level of the avatar.
     */
    rating?: Maybe<AvatarRatingEnum>;
    /**
     * The size attribute of the avatar field can be used to fetch avatars of different sizes. The value corresponds to the dimension in pixels to fetch. The default is 96 pixels.
     * @defaultValue `96`
     */
    size?: Maybe<Scalars["Int"]>;
  }) => Maybe<Avatar>;
  /**
   * User metadata option name. Usually it will be &quot;wp_capabilities&quot;.
   */
  capKey?: Maybe<ScalarsEnums["String"]>;
  /**
   * A list of capabilities (permissions) granted to the user
   */
  capabilities?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * Connection between the User type and the Comment type
   */
  comments: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToCommentConnectionWhereArgs>;
  }) => Maybe<UserToCommentConnection>;
  /**
   * @deprecated Deprecated in favor of using Next.js pages
   */
  conditionalTags?: Maybe<ConditionalTags>;
  /**
   * Connection between the User type and the contact type
   */
  contacts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToContactConnectionWhereArgs>;
  }) => Maybe<UserToContactConnection>;
  /**
   * Identifies the primary key from the database.
   */
  databaseId: ScalarsEnums["Int"];
  /**
   * Description of the user.
   */
  description?: Maybe<ScalarsEnums["String"]>;
  /**
   * Email address of the user. This is equivalent to the WP_User-&gt;user_email property.
   */
  email?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the User type and the EnqueuedScript type
   */
  enqueuedScripts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<UserToEnqueuedScriptConnection>;
  /**
   * Connection between the User type and the EnqueuedStylesheet type
   */
  enqueuedStylesheets: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<UserToEnqueuedStylesheetConnection>;
  /**
   * A complete list of capabilities including capabilities inherited from a role. This is equivalent to the array keys of WP_User-&gt;allcaps.
   */
  extraCapabilities?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * Connection between the User type and the faq type
   */
  faqs: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToFaqConnectionWhereArgs>;
  }) => Maybe<UserToFaqConnection>;
  /**
   * First name of the user. This is equivalent to the WP_User-&gt;user_first_name property.
   */
  firstName?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier for the user object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the node is a Content Node
   */
  isContentNode: ScalarsEnums["Boolean"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * Whether the node is a Term
   */
  isTermNode: ScalarsEnums["Boolean"];
  /**
   * Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property.
   */
  lastName?: Maybe<ScalarsEnums["String"]>;
  /**
   * The preferred language locale set for the user. Value derived from get_user_locale().
   */
  locale?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the User type and the mediaItem type
   */
  mediaItems: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToMediaItemConnectionWhereArgs>;
  }) => Maybe<UserToMediaItemConnection>;
  /**
   * Display name of the user. This is equivalent to the WP_User-&gt;dispaly_name property.
   */
  name?: Maybe<ScalarsEnums["String"]>;
  /**
   * The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename
   */
  nicename?: Maybe<ScalarsEnums["String"]>;
  /**
   * Nickname of the user.
   */
  nickname?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the User type and the page type
   */
  pages: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToPageConnectionWhereArgs>;
  }) => Maybe<UserToPageConnection>;
  /**
   * Connection between the User type and the post type
   */
  posts: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToPostConnectionWhereArgs>;
  }) => Maybe<UserToPostConnection>;
  /**
   * Connection between the User type and the product type
   */
  products: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToProductConnectionWhereArgs>;
  }) => Maybe<UserToProductConnection>;
  /**
   * Connection between the User type and the rate type
   */
  rates: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToRateConnectionWhereArgs>;
  }) => Maybe<UserToRateConnection>;
  /**
   * The date the user registered or was created. The field follows a full ISO8601 date string format.
   */
  registeredDate?: Maybe<ScalarsEnums["String"]>;
  /**
   * Connection between the User and Revisions authored by the user
   */
  revisions: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToContentRevisionUnionConnectionWhereArgs>;
  }) => Maybe<UserToContentRevisionUnionConnection>;
  /**
   * Connection between the User type and the UserRole type
   */
  roles: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<UserToUserRoleConnection>;
  /**
   * Connection between the User type and the service type
   */
  services: (args?: {
    /**
     * Cursor used along with the "first" argument to reference where in the dataset to get data
     */
    after?: Maybe<Scalars["String"]>;
    /**
     * Cursor used along with the "last" argument to reference where in the dataset to get data
     */
    before?: Maybe<Scalars["String"]>;
    /**
     * The number of items to return after the referenced "after" cursor
     */
    first?: Maybe<Scalars["Int"]>;
    /**
     * The number of items to return before the referenced "before" cursor
     */
    last?: Maybe<Scalars["Int"]>;
    /**
     * Arguments for filtering the connection
     */
    where?: Maybe<UserToServiceConnectionWhereArgs>;
  }) => Maybe<UserToServiceConnection>;
  /**
   * The slug for the user. This field is equivalent to WP_User-&gt;user_nicename
   */
  slug?: Maybe<ScalarsEnums["String"]>;
  templates?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The unique resource identifier path
   */
  uri?: Maybe<ScalarsEnums["String"]>;
  /**
   * A website url that is associated with the user.
   */
  url?: Maybe<ScalarsEnums["String"]>;
  /**
   * The Id of the user. Equivalent to WP_User-&gt;ID
   * @deprecated Deprecated in favor of the databaseId field
   */
  userId?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Username for the user. This field is equivalent to WP_User-&gt;user_login.
   */
  username?: Maybe<ScalarsEnums["String"]>;
}

/**
 * A user role object
 */
export interface UserRole {
  __typename?: "UserRole";
  /**
   * The capabilities that belong to this role
   */
  capabilities?: Maybe<Array<Maybe<ScalarsEnums["String"]>>>;
  /**
   * The display name of the role
   */
  displayName?: Maybe<ScalarsEnums["String"]>;
  /**
   * The globally unique identifier for the user role object.
   */
  id: ScalarsEnums["ID"];
  /**
   * Whether the object is restricted from the current viewer
   */
  isRestricted?: Maybe<ScalarsEnums["Boolean"]>;
  /**
   * The registered name of the role
   */
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * Connection between the User type and the Comment type
 */
export interface UserToCommentConnection {
  __typename?: "UserToCommentConnection";
  /**
   * Edges for the UserToCommentConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToCommentConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToCommentConnectionEdge {
  __typename?: "UserToCommentConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Comment>;
}

/**
 * Connection between the User type and the contact type
 */
export interface UserToContactConnection {
  __typename?: "UserToContactConnection";
  /**
   * Edges for the UserToContactConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToContactConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Contact>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToContactConnectionEdge {
  __typename?: "UserToContactConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Contact>;
}

/**
 * Connection between the User type and the ContentRevisionUnion type
 */
export interface UserToContentRevisionUnionConnection {
  __typename?: "UserToContentRevisionUnionConnection";
  /**
   * Edges for the UserToContentRevisionUnionConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToContentRevisionUnionConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToContentRevisionUnionConnectionEdge {
  __typename?: "UserToContentRevisionUnionConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<ContentRevisionUnion>;
}

/**
 * Connection between the User type and the EnqueuedScript type
 */
export interface UserToEnqueuedScriptConnection {
  __typename?: "UserToEnqueuedScriptConnection";
  /**
   * Edges for the UserToEnqueuedScriptConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToEnqueuedScriptConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToEnqueuedScriptConnectionEdge {
  __typename?: "UserToEnqueuedScriptConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedScript>;
}

/**
 * Connection between the User type and the EnqueuedStylesheet type
 */
export interface UserToEnqueuedStylesheetConnection {
  __typename?: "UserToEnqueuedStylesheetConnection";
  /**
   * Edges for the UserToEnqueuedStylesheetConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToEnqueuedStylesheetConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToEnqueuedStylesheetConnectionEdge {
  __typename?: "UserToEnqueuedStylesheetConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<EnqueuedStylesheet>;
}

/**
 * Connection between the User type and the faq type
 */
export interface UserToFaqConnection {
  __typename?: "UserToFaqConnection";
  /**
   * Edges for the UserToFaqConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToFaqConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Faq>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToFaqConnectionEdge {
  __typename?: "UserToFaqConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Faq>;
}

/**
 * Connection between the User type and the mediaItem type
 */
export interface UserToMediaItemConnection {
  __typename?: "UserToMediaItemConnection";
  /**
   * Edges for the UserToMediaItemConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToMediaItemConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<MediaItem>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToMediaItemConnectionEdge {
  __typename?: "UserToMediaItemConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<MediaItem>;
}

/**
 * Connection between the User type and the page type
 */
export interface UserToPageConnection {
  __typename?: "UserToPageConnection";
  /**
   * Edges for the UserToPageConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToPageConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Page>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToPageConnectionEdge {
  __typename?: "UserToPageConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Page>;
}

/**
 * Connection between the User type and the post type
 */
export interface UserToPostConnection {
  __typename?: "UserToPostConnection";
  /**
   * Edges for the UserToPostConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToPostConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToPostConnectionEdge {
  __typename?: "UserToPostConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Post>;
}

/**
 * Connection between the User type and the product type
 */
export interface UserToProductConnection {
  __typename?: "UserToProductConnection";
  /**
   * Edges for the UserToProductConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToProductConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Product>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToProductConnectionEdge {
  __typename?: "UserToProductConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Product>;
}

/**
 * Connection between the User type and the rate type
 */
export interface UserToRateConnection {
  __typename?: "UserToRateConnection";
  /**
   * Edges for the UserToRateConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToRateConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Rate>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToRateConnectionEdge {
  __typename?: "UserToRateConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Rate>;
}

/**
 * Connection between the User type and the service type
 */
export interface UserToServiceConnection {
  __typename?: "UserToServiceConnection";
  /**
   * Edges for the UserToServiceConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToServiceConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<Service>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToServiceConnectionEdge {
  __typename?: "UserToServiceConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<Service>;
}

/**
 * Connection between the User type and the UserRole type
 */
export interface UserToUserRoleConnection {
  __typename?: "UserToUserRoleConnection";
  /**
   * Edges for the UserToUserRoleConnection connection
   */
  edges?: Maybe<Array<Maybe<UserToUserRoleConnectionEdge>>>;
  /**
   * The nodes of the connection, without the edges
   */
  nodes?: Maybe<Array<Maybe<UserRole>>>;
  /**
   * Information about pagination in a connection.
   */
  pageInfo?: Maybe<WPPageInfo>;
}

/**
 * An edge in a connection
 */
export interface UserToUserRoleConnectionEdge {
  __typename?: "UserToUserRoleConnectionEdge";
  /**
   * A cursor for use in pagination
   */
  cursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * The item at the end of the edge
   */
  node?: Maybe<UserRole>;
}

/**
 * Information about pagination in a connection.
 */
export interface WPPageInfo {
  __typename?: "WPPageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor?: Maybe<ScalarsEnums["String"]>;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: ScalarsEnums["Boolean"];
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: ScalarsEnums["Boolean"];
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor?: Maybe<ScalarsEnums["String"]>;
}

/**
 * The writing setting type
 */
export interface WritingSettings {
  __typename?: "WritingSettings";
  /**
   * Default post category.
   */
  defaultCategory?: Maybe<ScalarsEnums["Int"]>;
  /**
   * Default post format.
   */
  defaultPostFormat?: Maybe<ScalarsEnums["String"]>;
  /**
   * Convert emoticons like :-) and :-P to graphics on display.
   */
  useSmilies?: Maybe<ScalarsEnums["Boolean"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  createCXAlert: (args: {
    input: CreateCXAlertInput;
  }) => Maybe<CreateCXAlertPayload>;
  createCategory: (args: {
    input: CreateCategoryInput;
  }) => Maybe<CreateCategoryPayload>;
  createComment: (args: {
    input: CreateCommentInput;
  }) => Maybe<CreateCommentPayload>;
  createContact: (args: {
    input: CreateContactInput;
  }) => Maybe<CreateContactPayload>;
  createFaq: (args: { input: CreateFaqInput }) => Maybe<CreateFaqPayload>;
  createMediaItem: (args: {
    input: CreateMediaItemInput;
  }) => Maybe<CreateMediaItemPayload>;
  createPage: (args: { input: CreatePageInput }) => Maybe<CreatePagePayload>;
  createPost: (args: { input: CreatePostInput }) => Maybe<CreatePostPayload>;
  createPostFormat: (args: {
    input: CreatePostFormatInput;
  }) => Maybe<CreatePostFormatPayload>;
  createProduct: (args: {
    input: CreateProductInput;
  }) => Maybe<CreateProductPayload>;
  createProductName: (args: {
    input: CreateProductNameInput;
  }) => Maybe<CreateProductNamePayload>;
  createRate: (args: { input: CreateRateInput }) => Maybe<CreateRatePayload>;
  createService: (args: {
    input: CreateServiceInput;
  }) => Maybe<CreateServicePayload>;
  createTag: (args: { input: CreateTagInput }) => Maybe<CreateTagPayload>;
  createUser: (args: { input: CreateUserInput }) => Maybe<CreateUserPayload>;
  deleteCXAlert: (args: {
    input: DeleteCXAlertInput;
  }) => Maybe<DeleteCXAlertPayload>;
  deleteCategory: (args: {
    input: DeleteCategoryInput;
  }) => Maybe<DeleteCategoryPayload>;
  deleteComment: (args: {
    input: DeleteCommentInput;
  }) => Maybe<DeleteCommentPayload>;
  deleteContact: (args: {
    input: DeleteContactInput;
  }) => Maybe<DeleteContactPayload>;
  deleteFaq: (args: { input: DeleteFaqInput }) => Maybe<DeleteFaqPayload>;
  deleteMediaItem: (args: {
    input: DeleteMediaItemInput;
  }) => Maybe<DeleteMediaItemPayload>;
  deletePage: (args: { input: DeletePageInput }) => Maybe<DeletePagePayload>;
  deletePost: (args: { input: DeletePostInput }) => Maybe<DeletePostPayload>;
  deletePostFormat: (args: {
    input: DeletePostFormatInput;
  }) => Maybe<DeletePostFormatPayload>;
  deleteProduct: (args: {
    input: DeleteProductInput;
  }) => Maybe<DeleteProductPayload>;
  deleteProductName: (args: {
    input: DeleteProductNameInput;
  }) => Maybe<DeleteProductNamePayload>;
  deleteRate: (args: { input: DeleteRateInput }) => Maybe<DeleteRatePayload>;
  deleteService: (args: {
    input: DeleteServiceInput;
  }) => Maybe<DeleteServicePayload>;
  deleteTag: (args: { input: DeleteTagInput }) => Maybe<DeleteTagPayload>;
  deleteUser: (args: { input: DeleteUserInput }) => Maybe<DeleteUserPayload>;
  generateAuthorizationCode: (args: {
    input: GenerateAuthorizationCodeInput;
  }) => Maybe<GenerateAuthorizationCodePayload>;
  increaseCount: (args?: {
    count?: Maybe<Scalars["Int"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  registerUser: (args: {
    input: RegisterUserInput;
  }) => Maybe<RegisterUserPayload>;
  resetUserPassword: (args: {
    input: ResetUserPasswordInput;
  }) => Maybe<ResetUserPasswordPayload>;
  restoreComment: (args: {
    input: RestoreCommentInput;
  }) => Maybe<RestoreCommentPayload>;
  sendPasswordResetEmail: (args: {
    input: SendPasswordResetEmailInput;
  }) => Maybe<SendPasswordResetEmailPayload>;
  updateCXAlert: (args: {
    input: UpdateCXAlertInput;
  }) => Maybe<UpdateCXAlertPayload>;
  updateCategory: (args: {
    input: UpdateCategoryInput;
  }) => Maybe<UpdateCategoryPayload>;
  updateComment: (args: {
    input: UpdateCommentInput;
  }) => Maybe<UpdateCommentPayload>;
  updateContact: (args: {
    input: UpdateContactInput;
  }) => Maybe<UpdateContactPayload>;
  updateFaq: (args: { input: UpdateFaqInput }) => Maybe<UpdateFaqPayload>;
  updateMediaItem: (args: {
    input: UpdateMediaItemInput;
  }) => Maybe<UpdateMediaItemPayload>;
  updatePage: (args: { input: UpdatePageInput }) => Maybe<UpdatePagePayload>;
  updatePost: (args: { input: UpdatePostInput }) => Maybe<UpdatePostPayload>;
  updatePostFormat: (args: {
    input: UpdatePostFormatInput;
  }) => Maybe<UpdatePostFormatPayload>;
  updateProduct: (args: {
    input: UpdateProductInput;
  }) => Maybe<UpdateProductPayload>;
  updateProductName: (args: {
    input: UpdateProductNameInput;
  }) => Maybe<UpdateProductNamePayload>;
  updateRate: (args: { input: UpdateRateInput }) => Maybe<UpdateRatePayload>;
  updateService: (args: {
    input: UpdateServiceInput;
  }) => Maybe<UpdateServicePayload>;
  updateSettings: (args: {
    input: UpdateSettingsInput;
  }) => Maybe<UpdateSettingsPayload>;
  updateTag: (args: { input: UpdateTagInput }) => Maybe<UpdateTagPayload>;
  updateUser: (args: { input: UpdateUserInput }) => Maybe<UpdateUserPayload>;
}

export interface Query {
  __typename?: "Query";
  allSettings?: Maybe<Settings>;
  atlasContentModelerSettingsSettings?: Maybe<AtlasContentModelerSettingsSettings>;
  cXAlert: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<CXAlertIdType>;
  }) => Maybe<CXAlert>;
  cXAlertBy: (args?: {
    cXAlertId?: Maybe<Scalars["Int"]>;
    id?: Maybe<Scalars["ID"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<CXAlert>;
  cXAlerts: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToCXAlertConnectionWhereArgs>;
  }) => Maybe<RootQueryToCXAlertConnection>;
  categories: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToCategoryConnectionWhereArgs>;
  }) => Maybe<RootQueryToCategoryConnection>;
  category: (args: {
    id: Scalars["ID"];
    idType?: Maybe<CategoryIdType>;
  }) => Maybe<Category>;
  comment: (args: {
    id: Scalars["ID"];
    idType?: Maybe<CommentNodeIdTypeEnum>;
  }) => Maybe<Comment>;
  comments: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToCommentConnectionWhereArgs>;
  }) => Maybe<RootQueryToCommentConnection>;
  contact: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<ContactIdType>;
  }) => Maybe<Contact>;
  contactBy: (args?: {
    contactId?: Maybe<Scalars["Int"]>;
    id?: Maybe<Scalars["ID"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Contact>;
  contacts: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToContactConnectionWhereArgs>;
  }) => Maybe<RootQueryToContactConnection>;
  contentNode: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    contentType?: Maybe<ContentTypeEnum>;
    id: Scalars["ID"];
    idType?: Maybe<ContentNodeIdTypeEnum>;
  }) => Maybe<ContentNode>;
  contentNodes: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToContentNodeConnectionWhereArgs>;
  }) => Maybe<RootQueryToContentNodeConnection>;
  contentType: (args: {
    id: Scalars["ID"];
    idType?: Maybe<ContentTypeIdTypeEnum>;
  }) => Maybe<ContentType>;
  contentTypes: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToContentTypeConnection>;
  discussionSettings?: Maybe<DiscussionSettings>;
  faq: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<FaqIdType>;
  }) => Maybe<Faq>;
  faqBy: (args?: {
    faqId?: Maybe<Scalars["Int"]>;
    id?: Maybe<Scalars["ID"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Faq>;
  faqs: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToFaqConnectionWhereArgs>;
  }) => Maybe<RootQueryToFaqConnection>;
  generalSettings?: Maybe<GeneralSettings>;
  genesisBlocksGlobalSettingsSettings?: Maybe<GenesisBlocksGlobalSettingsSettings>;
  mediaItem: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<MediaItemIdType>;
  }) => Maybe<MediaItem>;
  mediaItemBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    mediaItemId?: Maybe<Scalars["Int"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<MediaItem>;
  mediaItems: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToMediaItemConnectionWhereArgs>;
  }) => Maybe<RootQueryToMediaItemConnection>;
  menu: (args: {
    id: Scalars["ID"];
    idType?: Maybe<MenuNodeIdTypeEnum>;
  }) => Maybe<Menu>;
  menuItem: (args: {
    id: Scalars["ID"];
    idType?: Maybe<MenuItemNodeIdTypeEnum>;
  }) => Maybe<MenuItem>;
  menuItems: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToMenuItemConnectionWhereArgs>;
  }) => Maybe<RootQueryToMenuItemConnection>;
  menus: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToMenuConnectionWhereArgs>;
  }) => Maybe<RootQueryToMenuConnection>;
  node: (args?: { id?: Maybe<Scalars["ID"]> }) => Maybe<Node>;
  nodeByUri: (args: {
    uri: Scalars["String"];
  }) => Maybe<UniformResourceIdentifiable>;
  page: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<PageIdType>;
  }) => Maybe<Page>;
  pageBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    pageId?: Maybe<Scalars["Int"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Page>;
  pages: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToPageConnectionWhereArgs>;
  }) => Maybe<RootQueryToPageConnection>;
  plugin: (args: { id: Scalars["ID"] }) => Maybe<Plugin>;
  plugins: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToPluginConnectionWhereArgs>;
  }) => Maybe<RootQueryToPluginConnection>;
  post: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<PostIdType>;
  }) => Maybe<Post>;
  postBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    postId?: Maybe<Scalars["Int"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Post>;
  postFormat: (args: {
    id: Scalars["ID"];
    idType?: Maybe<PostFormatIdType>;
  }) => Maybe<PostFormat>;
  postFormats: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToPostFormatConnectionWhereArgs>;
  }) => Maybe<RootQueryToPostFormatConnection>;
  posts: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToPostConnectionWhereArgs>;
  }) => Maybe<RootQueryToPostConnection>;
  product: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<ProductIdType>;
  }) => Maybe<Product>;
  productBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    productId?: Maybe<Scalars["Int"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Product>;
  productName: (args: {
    id: Scalars["ID"];
    idType?: Maybe<ProductNameIdType>;
  }) => Maybe<ProductName>;
  productNames: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToProductNameConnectionWhereArgs>;
  }) => Maybe<RootQueryToProductNameConnection>;
  products: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToProductConnectionWhereArgs>;
  }) => Maybe<RootQueryToProductConnection>;
  rate: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<RateIdType>;
  }) => Maybe<Rate>;
  rateBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    rateId?: Maybe<Scalars["Int"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Rate>;
  rates: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToRateConnectionWhereArgs>;
  }) => Maybe<RootQueryToRateConnection>;
  readingSettings?: Maybe<ReadingSettings>;
  registeredScripts: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToEnqueuedScriptConnection>;
  registeredStylesheets: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToEnqueuedStylesheetConnection>;
  revisions: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToContentRevisionUnionConnectionWhereArgs>;
  }) => Maybe<RootQueryToContentRevisionUnionConnection>;
  service: (args: {
    asPreview?: Maybe<Scalars["Boolean"]>;
    id: Scalars["ID"];
    idType?: Maybe<ServiceIdType>;
  }) => Maybe<Service>;
  serviceBy: (args?: {
    id?: Maybe<Scalars["ID"]>;
    serviceId?: Maybe<Scalars["Int"]>;
    slug?: Maybe<Scalars["String"]>;
    uri?: Maybe<Scalars["String"]>;
  }) => Maybe<Service>;
  services: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToServiceConnectionWhereArgs>;
  }) => Maybe<RootQueryToServiceConnection>;
  tag: (args: { id: Scalars["ID"]; idType?: Maybe<TagIdType> }) => Maybe<Tag>;
  tags: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToTagConnectionWhereArgs>;
  }) => Maybe<RootQueryToTagConnection>;
  taxonomies: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToTaxonomyConnection>;
  taxonomy: (args: {
    id: Scalars["ID"];
    idType?: Maybe<TaxonomyIdTypeEnum>;
  }) => Maybe<Taxonomy>;
  termNode: (args: {
    id: Scalars["ID"];
    idType?: Maybe<TermNodeIdTypeEnum>;
    taxonomy?: Maybe<TaxonomyEnum>;
  }) => Maybe<TermNode>;
  terms: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToTermNodeConnectionWhereArgs>;
  }) => Maybe<RootQueryToTermNodeConnection>;
  theme: (args: { id: Scalars["ID"] }) => Maybe<Theme>;
  themes: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToThemeConnection>;
  user: (args: {
    id: Scalars["ID"];
    idType?: Maybe<UserNodeIdTypeEnum>;
  }) => Maybe<User>;
  userRole: (args: { id: Scalars["ID"] }) => Maybe<UserRole>;
  userRoles: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
  }) => Maybe<RootQueryToUserRoleConnection>;
  users: (args?: {
    after?: Maybe<Scalars["String"]>;
    before?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    last?: Maybe<Scalars["Int"]>;
    where?: Maybe<RootQueryToUserConnectionWhereArgs>;
  }) => Maybe<RootQueryToUserConnection>;
  viewer?: Maybe<User>;
  writingSettings?: Maybe<WritingSettings>;
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface SchemaObjectTypes {
  AtlasContentModelerSettingsSettings: AtlasContentModelerSettingsSettings;
  Avatar: Avatar;
  CXAlert: CXAlert;
  CXAlertToPreviewConnectionEdge: CXAlertToPreviewConnectionEdge;
  CXAlertToRevisionConnection: CXAlertToRevisionConnection;
  CXAlertToRevisionConnectionEdge: CXAlertToRevisionConnectionEdge;
  Category: Category;
  CategoryToAncestorsCategoryConnection: CategoryToAncestorsCategoryConnection;
  CategoryToAncestorsCategoryConnectionEdge: CategoryToAncestorsCategoryConnectionEdge;
  CategoryToCategoryConnection: CategoryToCategoryConnection;
  CategoryToCategoryConnectionEdge: CategoryToCategoryConnectionEdge;
  CategoryToContentNodeConnection: CategoryToContentNodeConnection;
  CategoryToContentNodeConnectionEdge: CategoryToContentNodeConnectionEdge;
  CategoryToParentCategoryConnectionEdge: CategoryToParentCategoryConnectionEdge;
  CategoryToPostConnection: CategoryToPostConnection;
  CategoryToPostConnectionEdge: CategoryToPostConnectionEdge;
  CategoryToTaxonomyConnectionEdge: CategoryToTaxonomyConnectionEdge;
  Comment: Comment;
  CommentAuthor: CommentAuthor;
  CommentToCommentConnection: CommentToCommentConnection;
  CommentToCommentConnectionEdge: CommentToCommentConnectionEdge;
  CommentToCommenterConnectionEdge: CommentToCommenterConnectionEdge;
  CommentToContentNodeConnectionEdge: CommentToContentNodeConnectionEdge;
  CommentToParentCommentConnectionEdge: CommentToParentCommentConnectionEdge;
  ConditionalTags: ConditionalTags;
  Contact: Contact;
  ContactToPreviewConnectionEdge: ContactToPreviewConnectionEdge;
  ContentNodeToContentTypeConnectionEdge: ContentNodeToContentTypeConnectionEdge;
  ContentNodeToEditLastConnectionEdge: ContentNodeToEditLastConnectionEdge;
  ContentNodeToEditLockConnectionEdge: ContentNodeToEditLockConnectionEdge;
  ContentNodeToEnqueuedScriptConnection: ContentNodeToEnqueuedScriptConnection;
  ContentNodeToEnqueuedScriptConnectionEdge: ContentNodeToEnqueuedScriptConnectionEdge;
  ContentNodeToEnqueuedStylesheetConnection: ContentNodeToEnqueuedStylesheetConnection;
  ContentNodeToEnqueuedStylesheetConnectionEdge: ContentNodeToEnqueuedStylesheetConnectionEdge;
  ContentType: ContentType;
  ContentTypeToContentNodeConnection: ContentTypeToContentNodeConnection;
  ContentTypeToContentNodeConnectionEdge: ContentTypeToContentNodeConnectionEdge;
  ContentTypeToTaxonomyConnection: ContentTypeToTaxonomyConnection;
  ContentTypeToTaxonomyConnectionEdge: ContentTypeToTaxonomyConnectionEdge;
  CreateCXAlertPayload: CreateCXAlertPayload;
  CreateCategoryPayload: CreateCategoryPayload;
  CreateCommentPayload: CreateCommentPayload;
  CreateContactPayload: CreateContactPayload;
  CreateFaqPayload: CreateFaqPayload;
  CreateMediaItemPayload: CreateMediaItemPayload;
  CreatePagePayload: CreatePagePayload;
  CreatePostFormatPayload: CreatePostFormatPayload;
  CreatePostPayload: CreatePostPayload;
  CreateProductNamePayload: CreateProductNamePayload;
  CreateProductPayload: CreateProductPayload;
  CreateRatePayload: CreateRatePayload;
  CreateServicePayload: CreateServicePayload;
  CreateTagPayload: CreateTagPayload;
  CreateUserPayload: CreateUserPayload;
  DefaultTemplate: DefaultTemplate;
  DeleteCXAlertPayload: DeleteCXAlertPayload;
  DeleteCategoryPayload: DeleteCategoryPayload;
  DeleteCommentPayload: DeleteCommentPayload;
  DeleteContactPayload: DeleteContactPayload;
  DeleteFaqPayload: DeleteFaqPayload;
  DeleteMediaItemPayload: DeleteMediaItemPayload;
  DeletePagePayload: DeletePagePayload;
  DeletePostFormatPayload: DeletePostFormatPayload;
  DeletePostPayload: DeletePostPayload;
  DeleteProductNamePayload: DeleteProductNamePayload;
  DeleteProductPayload: DeleteProductPayload;
  DeleteRatePayload: DeleteRatePayload;
  DeleteServicePayload: DeleteServicePayload;
  DeleteTagPayload: DeleteTagPayload;
  DeleteUserPayload: DeleteUserPayload;
  DiscussionSettings: DiscussionSettings;
  EnqueuedScript: EnqueuedScript;
  EnqueuedStylesheet: EnqueuedStylesheet;
  Faq: Faq;
  FaqToCommentConnection: FaqToCommentConnection;
  FaqToCommentConnectionEdge: FaqToCommentConnectionEdge;
  FaqToPreviewConnectionEdge: FaqToPreviewConnectionEdge;
  GeneralSettings: GeneralSettings;
  GenerateAuthorizationCodePayload: GenerateAuthorizationCodePayload;
  GenesisBlocksGlobalSettingsSettings: GenesisBlocksGlobalSettingsSettings;
  HierarchicalContentNodeToContentNodeAncestorsConnection: HierarchicalContentNodeToContentNodeAncestorsConnection;
  HierarchicalContentNodeToContentNodeAncestorsConnectionEdge: HierarchicalContentNodeToContentNodeAncestorsConnectionEdge;
  HierarchicalContentNodeToContentNodeChildrenConnection: HierarchicalContentNodeToContentNodeChildrenConnection;
  HierarchicalContentNodeToContentNodeChildrenConnectionEdge: HierarchicalContentNodeToContentNodeChildrenConnectionEdge;
  HierarchicalContentNodeToParentContentNodeConnectionEdge: HierarchicalContentNodeToParentContentNodeConnectionEdge;
  MediaDetails: MediaDetails;
  MediaItem: MediaItem;
  MediaItemMeta: MediaItemMeta;
  MediaItemToCommentConnection: MediaItemToCommentConnection;
  MediaItemToCommentConnectionEdge: MediaItemToCommentConnectionEdge;
  MediaSize: MediaSize;
  Menu: Menu;
  MenuItem: MenuItem;
  MenuItemToMenuConnectionEdge: MenuItemToMenuConnectionEdge;
  MenuItemToMenuItemConnection: MenuItemToMenuItemConnection;
  MenuItemToMenuItemConnectionEdge: MenuItemToMenuItemConnectionEdge;
  MenuItemToMenuItemLinkableConnectionEdge: MenuItemToMenuItemLinkableConnectionEdge;
  MenuToMenuItemConnection: MenuToMenuItemConnection;
  MenuToMenuItemConnectionEdge: MenuToMenuItemConnectionEdge;
  Mutation: Mutation;
  NodeWithAuthorToUserConnectionEdge: NodeWithAuthorToUserConnectionEdge;
  NodeWithFeaturedImageToMediaItemConnectionEdge: NodeWithFeaturedImageToMediaItemConnectionEdge;
  NodeWithRevisionsToContentNodeConnectionEdge: NodeWithRevisionsToContentNodeConnectionEdge;
  Page: Page;
  PageToCommentConnection: PageToCommentConnection;
  PageToCommentConnectionEdge: PageToCommentConnectionEdge;
  PageToPreviewConnectionEdge: PageToPreviewConnectionEdge;
  PageToRevisionConnection: PageToRevisionConnection;
  PageToRevisionConnectionEdge: PageToRevisionConnectionEdge;
  Plugin: Plugin;
  Post: Post;
  PostFormat: PostFormat;
  PostFormatToContentNodeConnection: PostFormatToContentNodeConnection;
  PostFormatToContentNodeConnectionEdge: PostFormatToContentNodeConnectionEdge;
  PostFormatToPostConnection: PostFormatToPostConnection;
  PostFormatToPostConnectionEdge: PostFormatToPostConnectionEdge;
  PostFormatToTaxonomyConnectionEdge: PostFormatToTaxonomyConnectionEdge;
  PostToCategoryConnection: PostToCategoryConnection;
  PostToCategoryConnectionEdge: PostToCategoryConnectionEdge;
  PostToCommentConnection: PostToCommentConnection;
  PostToCommentConnectionEdge: PostToCommentConnectionEdge;
  PostToPostFormatConnection: PostToPostFormatConnection;
  PostToPostFormatConnectionEdge: PostToPostFormatConnectionEdge;
  PostToPreviewConnectionEdge: PostToPreviewConnectionEdge;
  PostToRevisionConnection: PostToRevisionConnection;
  PostToRevisionConnectionEdge: PostToRevisionConnectionEdge;
  PostToTagConnection: PostToTagConnection;
  PostToTagConnectionEdge: PostToTagConnectionEdge;
  PostToTermNodeConnection: PostToTermNodeConnection;
  PostToTermNodeConnectionEdge: PostToTermNodeConnectionEdge;
  PostTypeLabelDetails: PostTypeLabelDetails;
  Product: Product;
  ProductName: ProductName;
  ProductNameToContentNodeConnection: ProductNameToContentNodeConnection;
  ProductNameToContentNodeConnectionEdge: ProductNameToContentNodeConnectionEdge;
  ProductNameToRateConnection: ProductNameToRateConnection;
  ProductNameToRateConnectionEdge: ProductNameToRateConnectionEdge;
  ProductNameToTaxonomyConnectionEdge: ProductNameToTaxonomyConnectionEdge;
  ProductToPreviewConnectionEdge: ProductToPreviewConnectionEdge;
  ProductToRateConnection: ProductToRateConnection;
  ProductToRateConnectionEdge: ProductToRateConnectionEdge;
  Query: Query;
  Rate: Rate;
  RateToPreviewConnectionEdge: RateToPreviewConnectionEdge;
  RateToProductConnection: RateToProductConnection;
  RateToProductConnectionEdge: RateToProductConnectionEdge;
  RateToProductNameConnection: RateToProductNameConnection;
  RateToProductNameConnectionEdge: RateToProductNameConnectionEdge;
  RateToTermNodeConnection: RateToTermNodeConnection;
  RateToTermNodeConnectionEdge: RateToTermNodeConnectionEdge;
  ReadingSettings: ReadingSettings;
  RegisterUserPayload: RegisterUserPayload;
  ResetUserPasswordPayload: ResetUserPasswordPayload;
  RestoreCommentPayload: RestoreCommentPayload;
  RootQueryToCXAlertConnection: RootQueryToCXAlertConnection;
  RootQueryToCXAlertConnectionEdge: RootQueryToCXAlertConnectionEdge;
  RootQueryToCategoryConnection: RootQueryToCategoryConnection;
  RootQueryToCategoryConnectionEdge: RootQueryToCategoryConnectionEdge;
  RootQueryToCommentConnection: RootQueryToCommentConnection;
  RootQueryToCommentConnectionEdge: RootQueryToCommentConnectionEdge;
  RootQueryToContactConnection: RootQueryToContactConnection;
  RootQueryToContactConnectionEdge: RootQueryToContactConnectionEdge;
  RootQueryToContentNodeConnection: RootQueryToContentNodeConnection;
  RootQueryToContentNodeConnectionEdge: RootQueryToContentNodeConnectionEdge;
  RootQueryToContentRevisionUnionConnection: RootQueryToContentRevisionUnionConnection;
  RootQueryToContentRevisionUnionConnectionEdge: RootQueryToContentRevisionUnionConnectionEdge;
  RootQueryToContentTypeConnection: RootQueryToContentTypeConnection;
  RootQueryToContentTypeConnectionEdge: RootQueryToContentTypeConnectionEdge;
  RootQueryToEnqueuedScriptConnection: RootQueryToEnqueuedScriptConnection;
  RootQueryToEnqueuedScriptConnectionEdge: RootQueryToEnqueuedScriptConnectionEdge;
  RootQueryToEnqueuedStylesheetConnection: RootQueryToEnqueuedStylesheetConnection;
  RootQueryToEnqueuedStylesheetConnectionEdge: RootQueryToEnqueuedStylesheetConnectionEdge;
  RootQueryToFaqConnection: RootQueryToFaqConnection;
  RootQueryToFaqConnectionEdge: RootQueryToFaqConnectionEdge;
  RootQueryToMediaItemConnection: RootQueryToMediaItemConnection;
  RootQueryToMediaItemConnectionEdge: RootQueryToMediaItemConnectionEdge;
  RootQueryToMenuConnection: RootQueryToMenuConnection;
  RootQueryToMenuConnectionEdge: RootQueryToMenuConnectionEdge;
  RootQueryToMenuItemConnection: RootQueryToMenuItemConnection;
  RootQueryToMenuItemConnectionEdge: RootQueryToMenuItemConnectionEdge;
  RootQueryToPageConnection: RootQueryToPageConnection;
  RootQueryToPageConnectionEdge: RootQueryToPageConnectionEdge;
  RootQueryToPluginConnection: RootQueryToPluginConnection;
  RootQueryToPluginConnectionEdge: RootQueryToPluginConnectionEdge;
  RootQueryToPostConnection: RootQueryToPostConnection;
  RootQueryToPostConnectionEdge: RootQueryToPostConnectionEdge;
  RootQueryToPostFormatConnection: RootQueryToPostFormatConnection;
  RootQueryToPostFormatConnectionEdge: RootQueryToPostFormatConnectionEdge;
  RootQueryToProductConnection: RootQueryToProductConnection;
  RootQueryToProductConnectionEdge: RootQueryToProductConnectionEdge;
  RootQueryToProductNameConnection: RootQueryToProductNameConnection;
  RootQueryToProductNameConnectionEdge: RootQueryToProductNameConnectionEdge;
  RootQueryToRateConnection: RootQueryToRateConnection;
  RootQueryToRateConnectionEdge: RootQueryToRateConnectionEdge;
  RootQueryToServiceConnection: RootQueryToServiceConnection;
  RootQueryToServiceConnectionEdge: RootQueryToServiceConnectionEdge;
  RootQueryToTagConnection: RootQueryToTagConnection;
  RootQueryToTagConnectionEdge: RootQueryToTagConnectionEdge;
  RootQueryToTaxonomyConnection: RootQueryToTaxonomyConnection;
  RootQueryToTaxonomyConnectionEdge: RootQueryToTaxonomyConnectionEdge;
  RootQueryToTermNodeConnection: RootQueryToTermNodeConnection;
  RootQueryToTermNodeConnectionEdge: RootQueryToTermNodeConnectionEdge;
  RootQueryToThemeConnection: RootQueryToThemeConnection;
  RootQueryToThemeConnectionEdge: RootQueryToThemeConnectionEdge;
  RootQueryToUserConnection: RootQueryToUserConnection;
  RootQueryToUserConnectionEdge: RootQueryToUserConnectionEdge;
  RootQueryToUserRoleConnection: RootQueryToUserRoleConnection;
  RootQueryToUserRoleConnectionEdge: RootQueryToUserRoleConnectionEdge;
  SendPasswordResetEmailPayload: SendPasswordResetEmailPayload;
  Service: Service;
  ServiceToPreviewConnectionEdge: ServiceToPreviewConnectionEdge;
  Settings: Settings;
  Subscription: Subscription;
  Tag: Tag;
  TagToContentNodeConnection: TagToContentNodeConnection;
  TagToContentNodeConnectionEdge: TagToContentNodeConnectionEdge;
  TagToPostConnection: TagToPostConnection;
  TagToPostConnectionEdge: TagToPostConnectionEdge;
  TagToTaxonomyConnectionEdge: TagToTaxonomyConnectionEdge;
  Taxonomy: Taxonomy;
  TaxonomyToContentTypeConnection: TaxonomyToContentTypeConnection;
  TaxonomyToContentTypeConnectionEdge: TaxonomyToContentTypeConnectionEdge;
  Template_ApplyNow: Template_ApplyNow;
  Template_FullWidth: Template_FullWidth;
  TermNodeToEnqueuedScriptConnection: TermNodeToEnqueuedScriptConnection;
  TermNodeToEnqueuedScriptConnectionEdge: TermNodeToEnqueuedScriptConnectionEdge;
  TermNodeToEnqueuedStylesheetConnection: TermNodeToEnqueuedStylesheetConnection;
  TermNodeToEnqueuedStylesheetConnectionEdge: TermNodeToEnqueuedStylesheetConnectionEdge;
  Theme: Theme;
  UpdateCXAlertPayload: UpdateCXAlertPayload;
  UpdateCategoryPayload: UpdateCategoryPayload;
  UpdateCommentPayload: UpdateCommentPayload;
  UpdateContactPayload: UpdateContactPayload;
  UpdateFaqPayload: UpdateFaqPayload;
  UpdateMediaItemPayload: UpdateMediaItemPayload;
  UpdatePagePayload: UpdatePagePayload;
  UpdatePostFormatPayload: UpdatePostFormatPayload;
  UpdatePostPayload: UpdatePostPayload;
  UpdateProductNamePayload: UpdateProductNamePayload;
  UpdateProductPayload: UpdateProductPayload;
  UpdateRatePayload: UpdateRatePayload;
  UpdateServicePayload: UpdateServicePayload;
  UpdateSettingsPayload: UpdateSettingsPayload;
  UpdateTagPayload: UpdateTagPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: User;
  UserRole: UserRole;
  UserToCommentConnection: UserToCommentConnection;
  UserToCommentConnectionEdge: UserToCommentConnectionEdge;
  UserToContactConnection: UserToContactConnection;
  UserToContactConnectionEdge: UserToContactConnectionEdge;
  UserToContentRevisionUnionConnection: UserToContentRevisionUnionConnection;
  UserToContentRevisionUnionConnectionEdge: UserToContentRevisionUnionConnectionEdge;
  UserToEnqueuedScriptConnection: UserToEnqueuedScriptConnection;
  UserToEnqueuedScriptConnectionEdge: UserToEnqueuedScriptConnectionEdge;
  UserToEnqueuedStylesheetConnection: UserToEnqueuedStylesheetConnection;
  UserToEnqueuedStylesheetConnectionEdge: UserToEnqueuedStylesheetConnectionEdge;
  UserToFaqConnection: UserToFaqConnection;
  UserToFaqConnectionEdge: UserToFaqConnectionEdge;
  UserToMediaItemConnection: UserToMediaItemConnection;
  UserToMediaItemConnectionEdge: UserToMediaItemConnectionEdge;
  UserToPageConnection: UserToPageConnection;
  UserToPageConnectionEdge: UserToPageConnectionEdge;
  UserToPostConnection: UserToPostConnection;
  UserToPostConnectionEdge: UserToPostConnectionEdge;
  UserToProductConnection: UserToProductConnection;
  UserToProductConnectionEdge: UserToProductConnectionEdge;
  UserToRateConnection: UserToRateConnection;
  UserToRateConnectionEdge: UserToRateConnectionEdge;
  UserToServiceConnection: UserToServiceConnection;
  UserToServiceConnectionEdge: UserToServiceConnectionEdge;
  UserToUserRoleConnection: UserToUserRoleConnection;
  UserToUserRoleConnectionEdge: UserToUserRoleConnectionEdge;
  WPPageInfo: WPPageInfo;
  WritingSettings: WritingSettings;
}
export type SchemaObjectTypesNames =
  | "AtlasContentModelerSettingsSettings"
  | "Avatar"
  | "CXAlert"
  | "CXAlertToPreviewConnectionEdge"
  | "CXAlertToRevisionConnection"
  | "CXAlertToRevisionConnectionEdge"
  | "Category"
  | "CategoryToAncestorsCategoryConnection"
  | "CategoryToAncestorsCategoryConnectionEdge"
  | "CategoryToCategoryConnection"
  | "CategoryToCategoryConnectionEdge"
  | "CategoryToContentNodeConnection"
  | "CategoryToContentNodeConnectionEdge"
  | "CategoryToParentCategoryConnectionEdge"
  | "CategoryToPostConnection"
  | "CategoryToPostConnectionEdge"
  | "CategoryToTaxonomyConnectionEdge"
  | "Comment"
  | "CommentAuthor"
  | "CommentToCommentConnection"
  | "CommentToCommentConnectionEdge"
  | "CommentToCommenterConnectionEdge"
  | "CommentToContentNodeConnectionEdge"
  | "CommentToParentCommentConnectionEdge"
  | "ConditionalTags"
  | "Contact"
  | "ContactToPreviewConnectionEdge"
  | "ContentNodeToContentTypeConnectionEdge"
  | "ContentNodeToEditLastConnectionEdge"
  | "ContentNodeToEditLockConnectionEdge"
  | "ContentNodeToEnqueuedScriptConnection"
  | "ContentNodeToEnqueuedScriptConnectionEdge"
  | "ContentNodeToEnqueuedStylesheetConnection"
  | "ContentNodeToEnqueuedStylesheetConnectionEdge"
  | "ContentType"
  | "ContentTypeToContentNodeConnection"
  | "ContentTypeToContentNodeConnectionEdge"
  | "ContentTypeToTaxonomyConnection"
  | "ContentTypeToTaxonomyConnectionEdge"
  | "CreateCXAlertPayload"
  | "CreateCategoryPayload"
  | "CreateCommentPayload"
  | "CreateContactPayload"
  | "CreateFaqPayload"
  | "CreateMediaItemPayload"
  | "CreatePagePayload"
  | "CreatePostFormatPayload"
  | "CreatePostPayload"
  | "CreateProductNamePayload"
  | "CreateProductPayload"
  | "CreateRatePayload"
  | "CreateServicePayload"
  | "CreateTagPayload"
  | "CreateUserPayload"
  | "DefaultTemplate"
  | "DeleteCXAlertPayload"
  | "DeleteCategoryPayload"
  | "DeleteCommentPayload"
  | "DeleteContactPayload"
  | "DeleteFaqPayload"
  | "DeleteMediaItemPayload"
  | "DeletePagePayload"
  | "DeletePostFormatPayload"
  | "DeletePostPayload"
  | "DeleteProductNamePayload"
  | "DeleteProductPayload"
  | "DeleteRatePayload"
  | "DeleteServicePayload"
  | "DeleteTagPayload"
  | "DeleteUserPayload"
  | "DiscussionSettings"
  | "EnqueuedScript"
  | "EnqueuedStylesheet"
  | "Faq"
  | "FaqToCommentConnection"
  | "FaqToCommentConnectionEdge"
  | "FaqToPreviewConnectionEdge"
  | "GeneralSettings"
  | "GenerateAuthorizationCodePayload"
  | "GenesisBlocksGlobalSettingsSettings"
  | "HierarchicalContentNodeToContentNodeAncestorsConnection"
  | "HierarchicalContentNodeToContentNodeAncestorsConnectionEdge"
  | "HierarchicalContentNodeToContentNodeChildrenConnection"
  | "HierarchicalContentNodeToContentNodeChildrenConnectionEdge"
  | "HierarchicalContentNodeToParentContentNodeConnectionEdge"
  | "MediaDetails"
  | "MediaItem"
  | "MediaItemMeta"
  | "MediaItemToCommentConnection"
  | "MediaItemToCommentConnectionEdge"
  | "MediaSize"
  | "Menu"
  | "MenuItem"
  | "MenuItemToMenuConnectionEdge"
  | "MenuItemToMenuItemConnection"
  | "MenuItemToMenuItemConnectionEdge"
  | "MenuItemToMenuItemLinkableConnectionEdge"
  | "MenuToMenuItemConnection"
  | "MenuToMenuItemConnectionEdge"
  | "Mutation"
  | "NodeWithAuthorToUserConnectionEdge"
  | "NodeWithFeaturedImageToMediaItemConnectionEdge"
  | "NodeWithRevisionsToContentNodeConnectionEdge"
  | "Page"
  | "PageToCommentConnection"
  | "PageToCommentConnectionEdge"
  | "PageToPreviewConnectionEdge"
  | "PageToRevisionConnection"
  | "PageToRevisionConnectionEdge"
  | "Plugin"
  | "Post"
  | "PostFormat"
  | "PostFormatToContentNodeConnection"
  | "PostFormatToContentNodeConnectionEdge"
  | "PostFormatToPostConnection"
  | "PostFormatToPostConnectionEdge"
  | "PostFormatToTaxonomyConnectionEdge"
  | "PostToCategoryConnection"
  | "PostToCategoryConnectionEdge"
  | "PostToCommentConnection"
  | "PostToCommentConnectionEdge"
  | "PostToPostFormatConnection"
  | "PostToPostFormatConnectionEdge"
  | "PostToPreviewConnectionEdge"
  | "PostToRevisionConnection"
  | "PostToRevisionConnectionEdge"
  | "PostToTagConnection"
  | "PostToTagConnectionEdge"
  | "PostToTermNodeConnection"
  | "PostToTermNodeConnectionEdge"
  | "PostTypeLabelDetails"
  | "Product"
  | "ProductName"
  | "ProductNameToContentNodeConnection"
  | "ProductNameToContentNodeConnectionEdge"
  | "ProductNameToRateConnection"
  | "ProductNameToRateConnectionEdge"
  | "ProductNameToTaxonomyConnectionEdge"
  | "ProductToPreviewConnectionEdge"
  | "ProductToRateConnection"
  | "ProductToRateConnectionEdge"
  | "Query"
  | "Rate"
  | "RateToPreviewConnectionEdge"
  | "RateToProductConnection"
  | "RateToProductConnectionEdge"
  | "RateToProductNameConnection"
  | "RateToProductNameConnectionEdge"
  | "RateToTermNodeConnection"
  | "RateToTermNodeConnectionEdge"
  | "ReadingSettings"
  | "RegisterUserPayload"
  | "ResetUserPasswordPayload"
  | "RestoreCommentPayload"
  | "RootQueryToCXAlertConnection"
  | "RootQueryToCXAlertConnectionEdge"
  | "RootQueryToCategoryConnection"
  | "RootQueryToCategoryConnectionEdge"
  | "RootQueryToCommentConnection"
  | "RootQueryToCommentConnectionEdge"
  | "RootQueryToContactConnection"
  | "RootQueryToContactConnectionEdge"
  | "RootQueryToContentNodeConnection"
  | "RootQueryToContentNodeConnectionEdge"
  | "RootQueryToContentRevisionUnionConnection"
  | "RootQueryToContentRevisionUnionConnectionEdge"
  | "RootQueryToContentTypeConnection"
  | "RootQueryToContentTypeConnectionEdge"
  | "RootQueryToEnqueuedScriptConnection"
  | "RootQueryToEnqueuedScriptConnectionEdge"
  | "RootQueryToEnqueuedStylesheetConnection"
  | "RootQueryToEnqueuedStylesheetConnectionEdge"
  | "RootQueryToFaqConnection"
  | "RootQueryToFaqConnectionEdge"
  | "RootQueryToMediaItemConnection"
  | "RootQueryToMediaItemConnectionEdge"
  | "RootQueryToMenuConnection"
  | "RootQueryToMenuConnectionEdge"
  | "RootQueryToMenuItemConnection"
  | "RootQueryToMenuItemConnectionEdge"
  | "RootQueryToPageConnection"
  | "RootQueryToPageConnectionEdge"
  | "RootQueryToPluginConnection"
  | "RootQueryToPluginConnectionEdge"
  | "RootQueryToPostConnection"
  | "RootQueryToPostConnectionEdge"
  | "RootQueryToPostFormatConnection"
  | "RootQueryToPostFormatConnectionEdge"
  | "RootQueryToProductConnection"
  | "RootQueryToProductConnectionEdge"
  | "RootQueryToProductNameConnection"
  | "RootQueryToProductNameConnectionEdge"
  | "RootQueryToRateConnection"
  | "RootQueryToRateConnectionEdge"
  | "RootQueryToServiceConnection"
  | "RootQueryToServiceConnectionEdge"
  | "RootQueryToTagConnection"
  | "RootQueryToTagConnectionEdge"
  | "RootQueryToTaxonomyConnection"
  | "RootQueryToTaxonomyConnectionEdge"
  | "RootQueryToTermNodeConnection"
  | "RootQueryToTermNodeConnectionEdge"
  | "RootQueryToThemeConnection"
  | "RootQueryToThemeConnectionEdge"
  | "RootQueryToUserConnection"
  | "RootQueryToUserConnectionEdge"
  | "RootQueryToUserRoleConnection"
  | "RootQueryToUserRoleConnectionEdge"
  | "SendPasswordResetEmailPayload"
  | "Service"
  | "ServiceToPreviewConnectionEdge"
  | "Settings"
  | "Subscription"
  | "Tag"
  | "TagToContentNodeConnection"
  | "TagToContentNodeConnectionEdge"
  | "TagToPostConnection"
  | "TagToPostConnectionEdge"
  | "TagToTaxonomyConnectionEdge"
  | "Taxonomy"
  | "TaxonomyToContentTypeConnection"
  | "TaxonomyToContentTypeConnectionEdge"
  | "Template_ApplyNow"
  | "Template_FullWidth"
  | "TermNodeToEnqueuedScriptConnection"
  | "TermNodeToEnqueuedScriptConnectionEdge"
  | "TermNodeToEnqueuedStylesheetConnection"
  | "TermNodeToEnqueuedStylesheetConnectionEdge"
  | "Theme"
  | "UpdateCXAlertPayload"
  | "UpdateCategoryPayload"
  | "UpdateCommentPayload"
  | "UpdateContactPayload"
  | "UpdateFaqPayload"
  | "UpdateMediaItemPayload"
  | "UpdatePagePayload"
  | "UpdatePostFormatPayload"
  | "UpdatePostPayload"
  | "UpdateProductNamePayload"
  | "UpdateProductPayload"
  | "UpdateRatePayload"
  | "UpdateServicePayload"
  | "UpdateSettingsPayload"
  | "UpdateTagPayload"
  | "UpdateUserPayload"
  | "User"
  | "UserRole"
  | "UserToCommentConnection"
  | "UserToCommentConnectionEdge"
  | "UserToContactConnection"
  | "UserToContactConnectionEdge"
  | "UserToContentRevisionUnionConnection"
  | "UserToContentRevisionUnionConnectionEdge"
  | "UserToEnqueuedScriptConnection"
  | "UserToEnqueuedScriptConnectionEdge"
  | "UserToEnqueuedStylesheetConnection"
  | "UserToEnqueuedStylesheetConnectionEdge"
  | "UserToFaqConnection"
  | "UserToFaqConnectionEdge"
  | "UserToMediaItemConnection"
  | "UserToMediaItemConnectionEdge"
  | "UserToPageConnection"
  | "UserToPageConnectionEdge"
  | "UserToPostConnection"
  | "UserToPostConnectionEdge"
  | "UserToProductConnection"
  | "UserToProductConnectionEdge"
  | "UserToRateConnection"
  | "UserToRateConnectionEdge"
  | "UserToServiceConnection"
  | "UserToServiceConnectionEdge"
  | "UserToUserRoleConnection"
  | "UserToUserRoleConnectionEdge"
  | "WPPageInfo"
  | "WritingSettings";

export interface $Commenter {
  CommentAuthor?: CommentAuthor;
  User?: User;
}

export interface $ContentNode {
  CXAlert?: CXAlert;
  Contact?: Contact;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  Product?: Product;
  Rate?: Rate;
  Service?: Service;
}

export interface $ContentRevisionUnion {
  CXAlert?: CXAlert;
  Page?: Page;
  Post?: Post;
}

export interface $ContentTemplate {
  DefaultTemplate?: DefaultTemplate;
  Template_ApplyNow?: Template_ApplyNow;
  Template_FullWidth?: Template_FullWidth;
}

export interface $DatabaseIdentifier {
  CXAlert?: CXAlert;
  Category?: Category;
  Comment?: Comment;
  Contact?: Contact;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Menu?: Menu;
  MenuItem?: MenuItem;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Product?: Product;
  ProductName?: ProductName;
  Rate?: Rate;
  Service?: Service;
  Tag?: Tag;
  User?: User;
}

export interface $EnqueuedAsset {
  EnqueuedScript?: EnqueuedScript;
  EnqueuedStylesheet?: EnqueuedStylesheet;
}

export interface $HierarchicalContentNode {
  MediaItem?: MediaItem;
  Page?: Page;
}

export interface $HierarchicalTermNode {
  Category?: Category;
}

export interface $MenuItemLinkable {
  CXAlert?: CXAlert;
  Category?: Category;
  Faq?: Faq;
  Page?: Page;
  Post?: Post;
  ProductName?: ProductName;
  Tag?: Tag;
}

export interface $MenuItemObjectUnion {
  CXAlert?: CXAlert;
  Category?: Category;
  Faq?: Faq;
  Page?: Page;
  Post?: Post;
  ProductName?: ProductName;
  Tag?: Tag;
}

export interface $Node {
  CXAlert?: CXAlert;
  Category?: Category;
  Comment?: Comment;
  CommentAuthor?: CommentAuthor;
  Contact?: Contact;
  ContentType?: ContentType;
  EnqueuedScript?: EnqueuedScript;
  EnqueuedStylesheet?: EnqueuedStylesheet;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Menu?: Menu;
  MenuItem?: MenuItem;
  Page?: Page;
  Plugin?: Plugin;
  Post?: Post;
  PostFormat?: PostFormat;
  Product?: Product;
  ProductName?: ProductName;
  Rate?: Rate;
  Service?: Service;
  Tag?: Tag;
  Taxonomy?: Taxonomy;
  Theme?: Theme;
  User?: User;
  UserRole?: UserRole;
}

export interface $NodeWithAuthor {
  Contact?: Contact;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  Product?: Product;
  Rate?: Rate;
  Service?: Service;
}

export interface $NodeWithComments {
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithContentEditor {
  Faq?: Faq;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithExcerpt {
  Faq?: Faq;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithFeaturedImage {
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithPageAttributes {
  CXAlert?: CXAlert;
  Page?: Page;
}

export interface $NodeWithRevisions {
  CXAlert?: CXAlert;
  Page?: Page;
  Post?: Post;
}

export interface $NodeWithTemplate {
  CXAlert?: CXAlert;
  Contact?: Contact;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  Product?: Product;
  Rate?: Rate;
  Service?: Service;
}

export interface $NodeWithTitle {
  CXAlert?: CXAlert;
  Contact?: Contact;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  Product?: Product;
  Rate?: Rate;
  Service?: Service;
}

export interface $NodeWithTrackbacks {
  Post?: Post;
}

export interface $TermNode {
  Category?: Category;
  PostFormat?: PostFormat;
  ProductName?: ProductName;
  Tag?: Tag;
}

export interface $UniformResourceIdentifiable {
  CXAlert?: CXAlert;
  Category?: Category;
  Contact?: Contact;
  ContentType?: ContentType;
  Faq?: Faq;
  MediaItem?: MediaItem;
  Page?: Page;
  Post?: Post;
  PostFormat?: PostFormat;
  Product?: Product;
  ProductName?: ProductName;
  Rate?: Rate;
  Service?: Service;
  Tag?: Tag;
  User?: User;
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  AvatarRatingEnum: AvatarRatingEnum | undefined;
  CXAlertIdType: CXAlertIdType | undefined;
  CategoryIdType: CategoryIdType | undefined;
  CommentNodeIdTypeEnum: CommentNodeIdTypeEnum | undefined;
  CommentsConnectionOrderbyEnum: CommentsConnectionOrderbyEnum | undefined;
  ContactIdType: ContactIdType | undefined;
  ContentNodeIdTypeEnum: ContentNodeIdTypeEnum | undefined;
  ContentTypeEnum: ContentTypeEnum | undefined;
  ContentTypeIdTypeEnum: ContentTypeIdTypeEnum | undefined;
  ContentTypesOfCategoryEnum: ContentTypesOfCategoryEnum | undefined;
  ContentTypesOfPostFormatEnum: ContentTypesOfPostFormatEnum | undefined;
  ContentTypesOfProductNameEnum: ContentTypesOfProductNameEnum | undefined;
  ContentTypesOfTagEnum: ContentTypesOfTagEnum | undefined;
  FaqIdType: FaqIdType | undefined;
  MediaItemIdType: MediaItemIdType | undefined;
  MediaItemSizeEnum: MediaItemSizeEnum | undefined;
  MediaItemStatusEnum: MediaItemStatusEnum | undefined;
  MenuItemNodeIdTypeEnum: MenuItemNodeIdTypeEnum | undefined;
  MenuLocationEnum: MenuLocationEnum | undefined;
  MenuNodeIdTypeEnum: MenuNodeIdTypeEnum | undefined;
  MimeTypeEnum: MimeTypeEnum | undefined;
  OrderEnum: OrderEnum | undefined;
  PageIdType: PageIdType | undefined;
  PluginStatusEnum: PluginStatusEnum | undefined;
  PostFormatIdType: PostFormatIdType | undefined;
  PostIdType: PostIdType | undefined;
  PostObjectFieldFormatEnum: PostObjectFieldFormatEnum | undefined;
  PostObjectsConnectionDateColumnEnum:
    | PostObjectsConnectionDateColumnEnum
    | undefined;
  PostObjectsConnectionOrderbyEnum:
    | PostObjectsConnectionOrderbyEnum
    | undefined;
  PostStatusEnum: PostStatusEnum | undefined;
  ProductIdType: ProductIdType | undefined;
  ProductNameIdType: ProductNameIdType | undefined;
  RateIdType: RateIdType | undefined;
  RelationEnum: RelationEnum | undefined;
  ServiceIdType: ServiceIdType | undefined;
  TagIdType: TagIdType | undefined;
  TaxonomyEnum: TaxonomyEnum | undefined;
  TaxonomyIdTypeEnum: TaxonomyIdTypeEnum | undefined;
  TermNodeIdTypeEnum: TermNodeIdTypeEnum | undefined;
  TermObjectsConnectionOrderbyEnum:
    | TermObjectsConnectionOrderbyEnum
    | undefined;
  UserNodeIdTypeEnum: UserNodeIdTypeEnum | undefined;
  UserRoleEnum: UserRoleEnum | undefined;
  UsersConnectionOrderbyEnum: UsersConnectionOrderbyEnum | undefined;
  UsersConnectionSearchColumnEnum: UsersConnectionSearchColumnEnum | undefined;
}
