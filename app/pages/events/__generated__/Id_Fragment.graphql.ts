/**
 * @generated SignedSource<<270e580ac3132de2b9c0340ab69ce938>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type Id_Fragment$data = {
    readonly id: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"Breadcrumbs_Fragment">;
    readonly " $fragmentType": "Id_Fragment";
};
export type Id_Fragment$key = {
    readonly " $data"?: Id_Fragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"Id_Fragment">;
};

const node: ReaderFragment = {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_Fragment",
    "selections": [
        {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
        },
        {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Breadcrumbs_Fragment"
        }
    ],
    "type": "Event",
    "abstractKey": null
};

(node as any).hash = "a3e5decca5a2f740f8322638759629ac";

export default node;
