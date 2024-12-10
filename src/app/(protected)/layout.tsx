"use client";

import React, { useEffect } from "react";
import useMe from "../hooks/useMe";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { error, isLoading, me } = useMe();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !me?._id) router.replace("/login");
  }, [me, router, isLoading]);
  if (isLoading) return <Spinner />;

  return <div className=" sm:py-24">{children}</div>;
}
