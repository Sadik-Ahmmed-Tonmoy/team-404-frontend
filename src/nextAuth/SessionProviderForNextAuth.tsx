/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const SessionProviderForNextAuth = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderForNextAuth;
