/**
 * @generated SignedSource<<986b0dd28d0a4a6dc23724f05a3af31c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventsFilter = {
  city: string;
  endDate?: any | null;
  maxPrice: number;
  minPrice: number;
  startDate?: any | null;
};
export type events_Query$variables = {
  filters?: EventsFilter | null;
};
export type events_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"List_EventsFragment" | "List_InterestsFragment">;
};
export type events_Query = {
  response: events_Query$data;
  variables: events_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  }
],
v1 = {
  "kind": "Variable",
  "name": "filters",
  "variableName": "filters"
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "link",
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "events_Query",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "List_EventsFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "List_InterestsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "events_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "events",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Event",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "availableDates",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "images",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "attendeeCostPerUomCents",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tag",
                    "kind": "LinkedField",
                    "name": "tags",
                    "plural": true,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Interest",
                    "kind": "LinkedField",
                    "name": "interests",
                    "plural": true,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "filters"
        ],
        "handle": "connection",
        "key": "Events_events",
        "kind": "LinkedHandle",
        "name": "events"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventFilters",
        "kind": "LinkedField",
        "name": "eventFilters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "minPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maxPrice",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "city",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Interest",
        "kind": "LinkedField",
        "name": "interests",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "preview",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "10710c5207a7c33df792206373ed33b1",
    "id": null,
    "metadata": {},
    "name": "events_Query",
    "operationKind": "query",
    "text": "query events_Query(\n  $filters: EventsFilter\n) {\n  ...List_EventsFragment_VTAHT\n  ...List_InterestsFragment\n}\n\nfragment CompactCard_EventFragment on Event {\n  title\n  description\n  id\n  availableDates\n  images\n  attendeeCostPerUomCents\n  tags {\n    title\n    link\n    id\n  }\n  interests {\n    title\n    link\n    id\n  }\n}\n\nfragment EventFilter_EventFiltersFragment on EventFilters {\n  startDate\n  endDate\n  minPrice\n  maxPrice\n  city\n}\n\nfragment InterestGallery_InterestsFragment on Query {\n  interests {\n    id\n    ...ItemGallery_InterestFragment\n  }\n}\n\nfragment ItemGallery_InterestFragment on Interest {\n  id\n  title\n  preview\n}\n\nfragment List_EventsFragment_VTAHT on Query {\n  events(first: 10, filters: $filters) {\n    edges {\n      node {\n        ...CompactCard_EventFragment\n        ...WideCard_EventFragment\n        id\n        __typename\n      }\n      cursor\n      id\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    id\n  }\n  eventFilters {\n    ...EventFilter_EventFiltersFragment\n    id\n  }\n}\n\nfragment List_InterestsFragment on Query {\n  ...InterestGallery_InterestsFragment\n}\n\nfragment WideCard_EventFragment on Event {\n  title\n  description\n  id\n  availableDates\n  images\n  attendeeCostPerUomCents\n  tags {\n    title\n    link\n    id\n  }\n  interests {\n    title\n    link\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4dedac6a48009c9ece55d09ac96a3894";

export default node;
