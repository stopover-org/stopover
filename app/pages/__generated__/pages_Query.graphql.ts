/**
 * @generated SignedSource<<4cadfc91f1ce80a112001efc23e80b82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest, FragmentRefs} from 'relay-runtime';

export type pages_Query$variables = {};
export type pages_Query$data = {
    readonly " $fragmentSpreads": FragmentRefs<"List_EventsFragment">;
};
export type pages_Query = {
    variables: pages_Query$variables;
    response: pages_Query$data;
};

const node: ConcreteRequest = (function () {
    var v0 = [
        {
            "kind": "Literal",
            "name": "first",
            "value": 10
        }
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "pages_Query",
            "selections": [
                {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "List_EventsFragment"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "pages_Query",
            "selections": [
                {
                    "alias": null,
                    "args": (v0/*: any*/),
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
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "title",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "description",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "id",
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
                    "storageKey": "events(first:10)"
                },
                {
                    "alias": null,
                    "args": (v0/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "Events_events",
                    "kind": "LinkedHandle",
                    "name": "events"
                }
            ]
        },
        "params": {
            "cacheID": "08cc4a205eddd2e433adc309acaa15f4",
            "id": null,
            "metadata": {},
            "name": "pages_Query",
            "operationKind": "query",
            "text": "query pages_Query {\n  ...List_EventsFragment\n}\n\nfragment List_EventsFragment on Query {\n  events(first: 10) {\n    edges {\n      node {\n        title\n        description\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
        }
    };
})();

(node as any).hash = "18ca3766830ba46735a69a2b7415eeac";

export default node;
