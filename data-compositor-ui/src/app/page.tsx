import { memo } from "react";
import { getServerSession } from "next-auth/next";
import { Login } from "@/components/Login";
import Logout from "@/components/Logout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const session: Record<string, any> | null = await getServerSession(
    authOptions as any,
  );

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

export default memo(Page);
