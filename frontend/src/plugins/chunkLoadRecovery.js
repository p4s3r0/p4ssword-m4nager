const CHUNK_ERROR_RELOAD_KEY = "pm.chunk-error-reload";

function getErrorMessage(error) {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error ?? "");
}

function isDynamicImportFailure(error) {
  const message = getErrorMessage(error);

  return [
    "Failed to fetch dynamically imported module",
    "Importing a module script failed",
    "error loading dynamically imported module",
  ].some((fragment) => message.includes(fragment));
}

async function clearCachedAppState() {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }
}

async function reloadApp() {
  if (sessionStorage.getItem(CHUNK_ERROR_RELOAD_KEY) === "true") {
    return false;
  }

  sessionStorage.setItem(CHUNK_ERROR_RELOAD_KEY, "true");

  try {
    await clearCachedAppState();
  } catch (error) {
    console.error("Failed to clear cached frontend state before reload.", error);
  }

  window.location.reload();
  return true;
}

export function clearChunkRecoveryState() {
  sessionStorage.removeItem(CHUNK_ERROR_RELOAD_KEY);
}

export async function recoverFromChunkLoadError(error) {
  if (!isDynamicImportFailure(error)) {
    return false;
  }

  return reloadApp();
}

export function installChunkLoadRecovery() {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    void reloadApp();
  });
}
