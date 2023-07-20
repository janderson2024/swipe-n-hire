import type { Metadata } from "next";

import { redirect } from "next/navigation";
import getHrUser from "@/backend/getHrUser";

export const metadata: Metadata = {
  title: "Real Company HR Portal",
  description: "IDK what to put here, but yeah. This is our project 3",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode | any;
}) {
  const loginNotNeeded = [`login`, `forgot-password`].includes(
    children.props.childProp.segment
  );
  if (loginNotNeeded) {
    return <>{children}</>;
  }
  const user = await getHrUser();
  if (!user) {
    redirect("/hr/login");
  }
  return <>{children}</>;
}
