/**
 * @generated SignedSource<<77d7cf92b41a6fd4305a78be086ec7be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type CardImageLeft_EventFragment$data = {
    readonly attendeeCostPerUomCents: number;
    readonly availableDates: ReadonlyArray<any>;
    readonly description: string;
    readonly id: string;
    readonly images: ReadonlyArray<string>;
    readonly interests: ReadonlyArray<{
        readonly id: string;
        readonly link: string | null;
        readonly title: string;
    }>;
    readonly tags: ReadonlyArray<{
        readonly id: string;
        readonly link: string | null;
        readonly title: string;
    }>;
    readonly title: string;
    readonly " $fragmentType": "CardImageLeft_EventFragment";
};
export type CardImageLeft_EventFragment$key = {
    readonly " $data"?: CardImageLeft_EventFragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"CardImageLeft_EventFragment">;
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
        "name": "CardImageLeft_EventFragment",
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
            }
        ],
        "type": "Event",
        "abstractKey": null
    };
})();

(node as any).hash = "26e3280b6e4635f47c6afce75bbc07e2";

export default node;
