/**
 * @generated SignedSource<<b20229059c4692432430028c71f03b4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type CardImageTop_EventFragment$data = {
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
    readonly " $fragmentType": "CardImageTop_EventFragment";
};
export type CardImageTop_EventFragment$key = {
    readonly " $data"?: CardImageTop_EventFragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"CardImageTop_EventFragment">;
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
        "name": "CardImageTop_EventFragment",
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

(node as any).hash = "e72a11842e6e333b803fe406fb995014";

export default node;
