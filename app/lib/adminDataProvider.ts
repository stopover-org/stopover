import { DataProvider, fetchUtils, UpdateParams } from "ra-core";
import { stringify } from "query-string";
import { getAdminBaseUrl } from "./fetchGraphQL";

export const getAdminUrl = (apiUrl: string, resource: string, query: any) =>
  `${apiUrl}/${resource}?${stringify(query)}`;

const adminBaseUrl = getAdminBaseUrl().replace("graphql", "admin");

/**
 * Maps react-admin queries to a simple REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import simpleRestProvider from 'ra-data-simple-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */

export const dataProvider = (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
  countHeader: string = "X-Total-Count"
): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;
    const query = {
      _sort: field,
      _end: rangeEnd,
      _start: rangeStart,
      _order: order,
      _filter: JSON.stringify(params.filter),
    };
    const url = getAdminUrl(apiUrl, resource, query);
    const options =
      countHeader === "Content-Range"
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
            }),
          }
        : {};

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
        );
      }

      return {
        data: json,
        total:
          countHeader === "Content-Range"
            ? parseInt(
                // @ts-ignore
                headers.get("content-range").split("/").pop(),
                10
              )
            : // @ts-ignore
              parseInt(headers.get(countHeader.toLowerCase()), 10),
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = getAdminUrl(apiUrl, resource, query);
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;
    const query = {
      _sort: field,
      _end: rangeEnd,
      _start: rangeStart,
      _order: order,
      _filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = getAdminUrl(apiUrl, resource, query);
    const options =
      countHeader === "Content-Range"
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
            }),
          }
        : {};

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
        );
      }
      return {
        data: json,
        total:
          countHeader === "Content-Range"
            ? parseInt(
                // @ts-ignore
                headers.get("content-range").split("/").pop(),
                10
              )
            : // @ts-ignore
              parseInt(headers.get(countHeader.toLowerCase()), 10),
      };
    });
  },

  update: (resource, params: UpdateParams<any>) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    }).then(({ json }) => ({ data: json })),

  // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => json.id),
    })),
});

export const convertFileToBase64 = (file: { rawFile: File }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;
  });

const provider = dataProvider(adminBaseUrl);

export default {
  ...provider,
  update: (resource: string, params: any) => {
    if (!params.data.images) {
      // fallback to the default implementation
      return provider.update(resource, params);
    }

    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */

    if (!Array.isArray(params.data.images)) {
      params.data.images = [];
    }

    // Freshly dropped pictures are File objects and must be converted to base64 strings
    const newImages = params.data.images.filter(
      (p: { rawFile: File | string }) => p.rawFile instanceof File
    );

    const formerImages = params.data.images.filter(
      (p: { rawFile: File | string }) => !(p.rawFile instanceof File)
    );

    return Promise.all(newImages.map(convertFileToBase64))
      .then((base64Pictures) =>
        base64Pictures.map((picture64) => ({
          src: picture64,
          title: `${params.data.title}`,
        }))
      )
      .then((transformedNewImages) =>
        provider.update(resource, {
          ...params,
          data: {
            ...params.data,
            images: [...transformedNewImages, ...formerImages],
          },
        })
      );
  },
};
