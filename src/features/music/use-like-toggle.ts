"use client";

import { useState, useCallback } from "react";
import { toggleLike } from "./music-api";
import { getAuthToken } from "@/lib/auth/token-storage";

interface UseLikeToggleReturn {
  toggle: (musicId: string) => Promise<number | null>;
  isPending: boolean;
  requiresLogin: boolean;
  showLoginPrompt: () => void;
  dismissLoginPrompt: () => void;
}

export function useLikeToggle(): UseLikeToggleReturn {
  const [isPending, setIsPending] = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const showLoginPrompt = useCallback(() => {
    setRequiresLogin(true);
  }, []);

  const dismissLoginPrompt = useCallback(() => {
    setRequiresLogin(false);
  }, []);

  const toggle = useCallback(
    async (musicId: string): Promise<number | null> => {
      if (!getAuthToken()) {
        setRequiresLogin(true);
        return null;
      }
      setIsPending(true);
      try {
        const likes = await toggleLike(musicId);
        return likes;
      } catch {
        return null;
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { toggle, isPending, requiresLogin, showLoginPrompt, dismissLoginPrompt };
}
