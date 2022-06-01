/**
 * @generated SignedSource<<a008aec1cd07cd7c4962cf795b7d5a60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Id_Query$variables = {
  id: number;
};
export type Id_Query$data = {
  readonly events: ReadonlyArray<{
    readonly id: string | null;
  }> | null;
};
export type Id_Query = {
  variables: Id_Query$variables;
  response: Id_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "events",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Id_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "80532aaf51d646b74672723dd6996f0f",
    "id": null,
    "metadata": {},
    "name": "Id_Query",
    "operationKind": "query",
    "text": "query Id_Query(\n  $id: Int!\n) {\n  events(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "268aa347fcf12e349150a1bb0a19bf14";

export default node;
