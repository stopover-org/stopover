"use client";

import { signIn } from "next-auth/react";
import { memo } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

export const Login = () => (
  <button type="button" onClick={() => signIn("keycloak")}>
    <div className="flex text-center">
      Sign In{" "}
      <ArrowRightEndOnRectangleIcon
        width={20}
        height={20}
        style={{ marginLeft: "10px" }}
      />
    </div>
  </button>
);

export default memo(Login);
