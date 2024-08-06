"use client";

import { signIn } from "next-auth/react";
import { memo } from "react";

export const Login = () => (
  <button onClick={() => signIn("keycloak")}>Signin with keycloak</button>
);

export default memo(Login);
