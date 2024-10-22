"use client";

import React from "react";
import { useAuthStore } from "../../core/hooks/useAuthStore";
import { useShallow } from "zustand/shallow";
import { getJSONCookie } from "@/lib/utils";

export const WUserInitializator = () => {
  const { userMetadata, setUserMetadata } = useAuthStore(
    useShallow(({ userMetadata, setUserMetadata }) => ({
      userMetadata,
      setUserMetadata,
    }))
  );

  React.useEffect(() => {
    if (!Object.entries(userMetadata).length) {
      const userCookie = getJSONCookie("user_metadata");
      setUserMetadata(userCookie);
    }
  }, []);

  return <></>;
};
