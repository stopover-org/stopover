/**
 * @generated SignedSource<<bf59d90b0b45bc201b06d24da93dd142>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, FragmentRefs} from 'relay-runtime';

export type EventsFilter = {
    city: string;
    endDate?: any | null;
    maxPrice: number;
    minPrice: number;
    startDate?: any | null;
};
export type EventsListPaginationQuery$variables = {
    count?: number | null;
    cursor?: string | null;
    filters?: EventsFilter | null;
};
export type EventsListPaginationQuery$data = {
    readonly " $fragmentSpreads": FragmentRefs<"List_EventsFragment">;
};
export type EventsListPaginationQuery = {
    response: EventsListPaginationQuery$data;
    variables: EventsListPaginationQuery$variables;
};

const node: ConcreteRequest = (function () {
    var v0 = [
            {
                "defaultValue": 10,
                "kind": "LocalArgument",
                "name": "count"
            },
            {
                "defaultValue": null,
                "kind": "LocalArgument",
                "name": "cursor"
            },
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
            {
                "kind": "Variable",
                "name": "after",
                "variableName": "cursor"
            },
            (v1/*: any*/),
            {
                "kind": "Variable",
                "name": "first",
                "variableName": "count"
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
            "name": "EventsListPaginationQuery",
            "selections": [
                {
                    "args": [
                        {
                            "kind": "Variable",
                            "name": "count",
                            "variableName": "count"
                        },
                        {
                            "kind": "Variable",
                            "name": "cursor",
                            "variableName": "cursor"
                        },
                        (v1/*: any*/)
                    ],
                    "kind": "FragmentSpread",
                    "name": "List_EventsFragment"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0/*: any*/),
            "kind": "Operation",
            "name": "EventsListPaginationQuery",
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
                                            "name": "attendeePricePerUomCents",
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
                                            "name": "averageRating",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "ratingsCount",
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
                                }
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
                        }
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
                        }
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "cacheID": "cc0359349cc7ff0195d42b691363ab89",
            "id": null,
            "metadata": {},
            "name": "EventsListPaginationQuery",
            "operationKind": "query",
            "text": "query EventsListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $filters: EventsFilter\n) {\n  ...List_EventsFragment_4DMzEc\n}\n\nfragment CompactCard_EventFragment on Event {\n  title\n  description\n  id\n  availableDates\n  images\n  attendeePricePerUomCents\n  tags {\n    title\n    link\n    id\n  }\n  interests {\n    title\n    link\n    id\n  }\n  averageRating\n  ratingsCount\n}\n\nfragment EventFilter_EventFiltersFragment on EventFilters {\n  startDate\n  endDate\n  minPrice\n  maxPrice\n  city\n}\n\nfragment List_EventsFragment_4DMzEc on Query {\n  events(first: $count, after: $cursor, filters: $filters) {\n    edges {\n      node {\n        ...CompactCard_EventFragment\n        ...WideCard_EventFragment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  eventFilters {\n    ...EventFilter_EventFiltersFragment\n  }\n}\n\nfragment WideCard_EventFragment on Event {\n  title\n  description\n  id\n  availableDates\n  images\n  attendeePricePerUomCents\n  tags {\n    title\n    link\n    id\n  }\n  interests {\n    title\n    link\n    id\n  }\n  averageRating\n  ratingsCount\n}\n"
        }
    };
})();

(node as any).hash = "f78f1d10974c295884ee82d4b1acbac1";

export default node;
