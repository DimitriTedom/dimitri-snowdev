// src/components/providers/PersonaProvider.tsx

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PersonaId, PERSONAS } from "@/types/persona";

/**
 * React Context value for the active persona.
 */
interface PersonaContextValue {
  /** Currently active persona identifier */
  persona: PersonaId;
  /** Change active persona */
  setPersona: (p: PersonaId) => void;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined);

/** Utility to verify a string is a valid PersonaId */
const isValidPersona = (value: string | null): value is PersonaId => {
  return PERSONAS.some((p) => p.id === value);
};

/**
 * Provider that synchronises persona across three sources:
 * 1. URL search param `?persona=` (SSR friendly, bookmarkable)
 * 2. React state / context for instant UI updates
 * 3. Browser cookie `snowdev_persona` for persistence across sessions
 */
export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramPersona = searchParams.get("persona");

  const [persona, setPersonaState] = useState<PersonaId>("fullstack");

  // Initialise from URL param or cookie on mount
  useEffect(() => {
    let initial: PersonaId = "fullstack";
    if (paramPersona && isValidPersona(paramPersona)) {
      initial = paramPersona;
    } else {
      // read cookie if present
      const match = document.cookie.match(/(?:^|; )snowdev_persona=([^;]*)/);
      if (match && isValidPersona(decodeURIComponent(match[1]))) {
        initial = decodeURIComponent(match[1]) as PersonaId;
      }
    }
    setPersonaState(initial);
  }, [paramPersona]);

  // Keep URL and cookie in sync whenever persona changes
  useEffect(() => {
    // Update cookie (1 year expiry)
    document.cookie = `snowdev_persona=${encodeURIComponent(persona)}; path=/; max-age=31536000`;
    // Update URL without full page reload
    router.replace(`?persona=${persona}`);
  }, [persona, router]);

  const setPersona = (p: PersonaId) => {
    if (p !== persona) {
      setPersonaState(p);
    }
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

/** Hook to consume the Persona context */
export const usePersona = () => {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return ctx;
};
