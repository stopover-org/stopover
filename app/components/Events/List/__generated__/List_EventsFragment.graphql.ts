/**
 * @generated SignedSource<<c2e18af77341393f7d11acf26008098a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type List_EventsFragment$data = {
    readonly eventFilters: {
        readonly " $fragmentSpreads": FragmentRefs<"EventFilter_EventFiltersFragment">;
    };
    readonly events: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly " $fragmentSpreads": FragmentRefs<"CompactCard_EventFragment" | "WideCard_EventFragment">;
            } | null;
        }>;
    };
    readonly " $fragmentType": "List_EventsFragment";
};
export type List_EventsFragment$key = {
    readonly " $data"?: List_EventsFragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"List_EventsFragment">;
};

const node: ReaderFragment = (function () {
    var v0 = [
        "events"
    ];
    return {
        "argumentDefinitions": [
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
        "kind": "Fragment",
        "metadata": {
            "connection": [
                {
                    "count": "count",
                    "cursor": "cursor",
                    "direction": "forward",
                    "path": (v0/*: any*/)
                }
            ],
            "refetch": {
                "connection": {
                    "forward": {
                        "count": "count",
                        "cursor": "cursor"
                    },
                    "backward": null,
                    "path": (v0/*: any*/)
                },
                "fragmentPathInResult": [],
                "operation": require('./EventsListPaginationQuery.graphql')
            }
        },
        "name": "List_EventsFragment",
        "selections": [
            {
                "alias": "events",
                "args": [
                    {
                        "kind": "Variable",
                        "name": "filters",
                        "variableName": "filters"
                    }
                ],
                "concreteType": "EventConnection",
                "kind": "LinkedField",
                "name": "__Events_events_connection",
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
                                    {
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "CompactCard_EventFragment"
                                    },
                                    {
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "WideCard_EventFragment"
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
                "args": null,
                "concreteType": "EventFilters",
                "kind": "LinkedField",
                "name": "eventFilters",
                "plural": false,
                "selections": [
                    {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "EventFilter_EventFiltersFragment"
                    }
                ],
                "storageKey": null
            }
        ],
        "type": "Query",
        "abstractKey": null
    };
})();

(node as any).hash = "f78f1d10974c295884ee82d4b1acbac1";

export default node;
