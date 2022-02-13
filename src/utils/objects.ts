export function assoc<
  T extends { [k in string]: any },
  K extends keyof T,
  V extends T[K],
>(k: K, v: V): (t: T) => T {
  return (t: T) => ({ ...t, [k]: v });
}

export function assocUpdate<
  T extends { [k in string]: { [kk in string]: any } },
  K extends keyof T,
  V extends Partial<T[K]>,
>(k: K, v: V): (t: T) => T {
  return (t: T) => ({ ...t, [k]: { ...t[k], ...v } });
}
