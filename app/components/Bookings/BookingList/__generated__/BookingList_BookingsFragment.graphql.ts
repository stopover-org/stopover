/**
 * @generated SignedSource<<701c4160db4bc187f6aefb127f221e25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {FragmentRefs, ReaderFragment} from 'relay-runtime';

export type BookingList_BookingsFragment$data = {
    readonly bookings: ReadonlyArray<{
        readonly bookedFor: any;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"Booking_BookingsFragment">;
    }> | null;
    readonly " $fragmentType": "BookingList_BookingsFragment";
};
export type BookingList_BookingsFragment$key = {
    readonly " $data"?: BookingList_BookingsFragment$data;
    readonly " $fragmentSpreads": FragmentRefs<"BookingList_BookingsFragment">;
};

const node: ReaderFragment = {
    "argumentDefinitions": [
        {
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "tripId"
        }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BookingList_BookingsFragment",
    "selections": [
        {
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "tripId"
                }
            ],
            "concreteType": "Booking",
            "kind": "LinkedField",
            "name": "bookings",
            "plural": true,
            "selections": [
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
                    "name": "bookedFor",
                    "storageKey": null
                },
                {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Booking_BookingsFragment"
                }
            ],
            "storageKey": null
        }
    ],
    "type": "Query",
    "abstractKey": null
};

(node as any).hash = "0489a075943b4ff0726392d98c015f58";

export default node;
