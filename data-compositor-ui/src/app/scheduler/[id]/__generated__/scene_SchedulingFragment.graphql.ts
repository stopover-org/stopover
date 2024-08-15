/**
 * @generated SignedSource<<b2b5ba11673acc2deefe064f545f4da8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AdapterType = "VIATOR_EVENT_SCRAPPER" | "%future added value";
export type SchedulingStatus = "ACTIVE" | "INACTIVE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type scene_SchedulingFragment$data = {
  readonly adapterType: AdapterType;
  readonly configuration: string;
  readonly id: string;
  readonly name: string;
  readonly nextScheduleTime: string | null | undefined;
  readonly status: SchedulingStatus;
  readonly " $fragmentSpreads": FragmentRefs<"ToggleSchedulingForm_SchedulingFragment">;
  readonly " $fragmentType": "scene_SchedulingFragment";
};
export type scene_SchedulingFragment$key = {
  readonly " $data"?: scene_SchedulingFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"scene_SchedulingFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "scene_SchedulingFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextScheduleTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "adapterType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "configuration",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ToggleSchedulingForm_SchedulingFragment"
    }
  ],
  "type": "Scheduling",
  "abstractKey": null
};

(node as any).hash = "1c683fb431871ca4c46cdf7ccd1c25c9";

export default node;
