"use client";

import { memo } from "react";
import { signOut } from "next-auth/react";

const Logout = () => (
  <button onClick={() => signOut()}>Signout of keycloak</button>
);

export default memo(Logout);
