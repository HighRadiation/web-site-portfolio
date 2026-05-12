export type ActionState =
  | null
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
