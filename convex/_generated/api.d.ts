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
import type * as editor from "../editor.js";
import type * as http from "../http.js";
import type * as projects from "../projects.js";
import type * as projects_internal_mutations from "../projects_internal_mutations.js";
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
  editor: typeof editor;
  http: typeof http;
  projects: typeof projects;
  projects_internal_mutations: typeof projects_internal_mutations;
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
