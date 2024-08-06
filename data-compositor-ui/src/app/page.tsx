import { memo } from "react";
import { getServerSession } from "next-auth/next";
import { Login } from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div>
        <div>Your name is {session.user?.name}</div>
        <div>
          <Logout />{" "}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default memo(Home);
