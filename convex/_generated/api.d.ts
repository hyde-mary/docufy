/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as data_default from "../data/default.js";
import type * as editor_mutations from "../editor_mutations.js";
import type * as editor_queries from "../editor_queries.js";
import type * as http from "../http.js";
import type * as live_queries from "../live_queries.js";
import type * as projects_internal_mutations from "../projects_internal_mutations.js";
import type * as projects_mutations from "../projects_mutations.js";
import type * as projects_queries from "../projects_queries.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "data/default": typeof data_default;
  editor_mutations: typeof editor_mutations;
  editor_queries: typeof editor_queries;
  http: typeof http;
  live_queries: typeof live_queries;
  projects_internal_mutations: typeof projects_internal_mutations;
  projects_mutations: typeof projects_mutations;
  projects_queries: typeof projects_queries;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
