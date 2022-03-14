import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren } from "react";

const Protected = ({ children }: PropsWithChildren<{}>) => {
  const { status } = useSession();
  const { replace } = useRouter();
  if (status === "authenticated") return <Fragment>{children}</Fragment>;
  if (status === "unauthenticated") replace("/");

  return null;
};

export default Protected;
