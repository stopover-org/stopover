/**
 * @generated SignedSource<<ab32c023fd967bee65bc077d17d43c6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Id_Query$variables = {
  id: string;
};
export type Id_Query$data = {
  readonly event: {
    readonly id: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"Breadcrumbs_Fragment" | "MainInformation_Fragment">;
  } | null;
};
export type Id_Query = {
  response: Id_Query$data;
  variables: Id_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Breadcrumbs_Fragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MainInformation_Fragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Id_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "event",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Interest",
            "kind": "LinkedField",
            "name": "interests",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "availableDates",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "decf1bcddfc01e20e4f89b077a36721e",
    "id": null,
    "metadata": {},
    "name": "Id_Query",
    "operationKind": "query",
    "text": "query Id_Query(\n  $id: ID!\n) {\n  event(id: $id) {\n    id\n    ...Breadcrumbs_Fragment\n    ...MainInformation_Fragment\n  }\n}\n\nfragment Breadcrumbs_Fragment on Event {\n  interests {\n    id\n    title\n  }\n}\n\nfragment MainInformation_Fragment on Event {\n  availableDates\n}\n"
  }
};
})();

(node as any).hash = "909edb74165e5db67a8db329b23155a1";

export default node;
