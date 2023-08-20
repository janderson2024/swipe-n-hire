import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { getCurrentHrID } from "@/backend/HrUser";
import { getCompanyName } from "@/components/Logo";

export const metadata: Metadata = {
  title: getCompanyName() + " HR Portal",
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

  if (!(await getCurrentHrID())) {
    redirect("/hr/login");
  }
  return <>{children}</>;
}
