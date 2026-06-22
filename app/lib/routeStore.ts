export interface SavedRouteStop {
  name: string;
  time: string;
}

export interface SavedRoute {
  title: string;
  savedAt: number;
  stops: SavedRouteStop[];
}

const KEY = "navio_saved_route";

export function saveRoute(route: SavedRoute) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(route));
}

export function getSavedRoute(): SavedRoute | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedRoute;
  } catch {
    return null;
  }
}

export function clearSavedRoute() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/** 저장된 경로에서 구간 하나를 빼고, 갱신된 경로(없으면 null)를 반환 */
export function removeStopFromRoute(name: string, time: string): SavedRoute | null {
  const route = getSavedRoute();
  if (!route) return null;
  const stops = route.stops.filter((s) => !(s.name === name && s.time === time));
  if (stops.length === 0) {
    clearSavedRoute();
    return null;
  }
  const next = { ...route, stops };
  saveRoute(next);
  return next;
}
