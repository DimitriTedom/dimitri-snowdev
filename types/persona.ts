// src/types/persona.ts

/**
 * Persona identifiers used throughout the SnowDev portfolio.
 * Must stay in sync with the database table `personas.id` and the
 * configuration in `data/personas.ts`.
 */
export type PersonaId =
  | "fullstack"
  | "ai-engineer"
  | "cloud-architect"
  | "product-builder"
  | "entrepreneur";

/**
 * Configuration for a persona used by the UI.
 */
export interface PersonaConfig {
  /** Unique identifier */
  id: PersonaId;
  /** Human‑readable label */
  label: string;
  /** Optional description displayed in UI */
  description?: string;
  /** Theme tokens for this persona (accent colors, etc.) */
  theme?: {
    accent: string;
    accentLight: string;
    accentGlow: string;
  };
}


import { PERSONAS } from '@/data/personas';
export { PERSONAS };

