/**
 * @generated SignedSource<<d3d299f5e8d97f20889cde59aaf82185>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type CompactCard_EventFragment$data = {
    readonly attendeePricePerUomCents: number;
    readonly availableDates: ReadonlyArray<any>;
    readonly averageRating: number | null;
    readonly description: string;
    readonly id: string;
    readonly images: ReadonlyArray<string>;
    readonly interests: ReadonlyArray<{
        readonly id: string;
        readonly link: string | null;
        readonly title: string;
    }>;
    readonly ratingsCount: number | null;
    readonly tags: ReadonlyArray<{
        readonly id: string;
        readonly link: string | null;
        readonly title: string;
    }>;
    readonly title: string;
    readonly " $fragmentType": "CompactCard_EventFragment";
};
export type CompactCard_EventFragment$key = {
    readonly " $data"?: CompactCard_EventFragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"CompactCard_EventFragment">;
};

const node: ReaderFragment = (function () {
    var v0 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
        },
        v1 = {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
        },
        v2 = [
            (v0/*: any*/),
            {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "link",
                "storageKey": null
            },
            (v1/*: any*/)
        ];
    return {
        "argumentDefinitions": [],
        "kind": "Fragment",
        "metadata": null,
        "name": "CompactCard_EventFragment",
        "selections": [
            (v0/*: any*/),
            {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
            },
            (v1/*: any*/),
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
                "selections": (v2/*: any*/),
                "storageKey": null
            },
            {
                "alias": null,
                "args": null,
                "concreteType": "Interest",
                "kind": "LinkedField",
                "name": "interests",
                "plural": true,
                "selections": (v2/*: any*/),
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
            }
        ],
        "type": "Event",
        "abstractKey": null
    };
})();

(node as any).hash = "2db00601d18c89cb59b0ee9efee84143";

export default node;
