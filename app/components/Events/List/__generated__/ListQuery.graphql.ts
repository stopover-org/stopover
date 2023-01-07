/**
 * @generated SignedSource<<c11454f71522da86ba86127444b988b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ConcreteRequest} from 'relay-runtime';

export type EventTypeEnum = "excursion" | "tour" | "%future added value";
export type ListQuery$variables = {};
export type ListQuery$data = {
    readonly currentUser: {
        readonly id: string;
    } | null;
    readonly events: ReadonlyArray<{
        readonly id: string | null;
        readonly eventType: EventTypeEnum | null;
        readonly title: string | null;
        readonly description: string | null;
        readonly country: string | null;
        readonly city: string | null;
        readonly status: string | null;
        readonly eventOptions: ReadonlyArray<{
            readonly id: string | null;
            readonly relayId: string;
        }> | null;
        readonly interests: ReadonlyArray<{
            readonly id: string | null;
            readonly title: string | null;
        }> | null;
        readonly achievements: ReadonlyArray<{
            readonly title: string | null;
        }> | null;
    }> | null;
};
export type ListQuery = {
    variables: ListQuery$variables;
    response: ListQuery$data;
};

const node: ConcreteRequest = (function () {
    var v0 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
        },
        v1 = {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "currentUser",
            "plural": false,
            "selections": [
                (v0/*: any*/)
            ],
            "storageKey": null
        },
        v2 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eventType",
            "storageKey": null
        },
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
            "name": "description",
            "storageKey": null
        },
        v5 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "country",
            "storageKey": null
        },
        v6 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "city",
            "storageKey": null
        },
        v7 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
        },
        v8 = {
            "alias": null,
            "args": null,
            "concreteType": "EventOption",
            "kind": "LinkedField",
            "name": "eventOptions",
            "plural": true,
            "selections": [
                (v0/*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "relayId",
                    "storageKey": null
                }
            ],
            "storageKey": null
        },
        v9 = {
            "alias": null,
            "args": null,
            "concreteType": "Interest",
            "kind": "LinkedField",
            "name": "interests",
            "plural": true,
            "selections": [
                (v0/*: any*/),
                (v3/*: any*/)
            ],
            "storageKey": null
        };
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "ListQuery",
            "selections": [
                (v1/*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Event",
                    "kind": "LinkedField",
                    "name": "events",
                    "plural": true,
                    "selections": [
                        (v0/*: any*/),
                        (v2/*: any*/),
                        (v3/*: any*/),
                        (v4/*: any*/),
                        (v5/*: any*/),
                        (v6/*: any*/),
                        (v7/*: any*/),
                        (v8/*: any*/),
                        (v9/*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Achievement",
                            "kind": "LinkedField",
                            "name": "achievements",
                            "plural": true,
                            "selections": [
                                (v3/*: any*/)
                            ],
                            "storageKey": null
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
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "ListQuery",
            "selections": [
                (v1/*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Event",
                    "kind": "LinkedField",
                    "name": "events",
                    "plural": true,
                    "selections": [
                        (v0/*: any*/),
                        (v2/*: any*/),
                        (v3/*: any*/),
                        (v4/*: any*/),
                        (v5/*: any*/),
                        (v6/*: any*/),
                        (v7/*: any*/),
                        (v8/*: any*/),
                        (v9/*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Achievement",
                            "kind": "LinkedField",
                            "name": "achievements",
                            "plural": true,
                            "selections": [
                                (v3/*: any*/),
                                (v0/*: any*/)
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "cacheID": "8d8d7f979daa05178fe0a8d83aa3a959",
            "id": null,
            "metadata": {},
            "name": "ListQuery",
            "operationKind": "query",
            "text": "query ListQuery {\n  currentUser {\n    id\n  }\n  events {\n    id\n    eventType\n    title\n    description\n    country\n    city\n    status\n    eventOptions {\n      id\n      relayId\n    }\n    interests {\n      id\n      title\n    }\n    achievements {\n      title\n      id\n    }\n  }\n}\n"
        }
    };
})();

(node as any).hash = "7509be64b4275fa40b0ec169286dfb9d";

export default node;
