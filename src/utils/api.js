const API = "https://bad-api-assignment.reaktor.com/";
const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "max-age=300, must-revalidate",
  // "x-force-error-mode": "all",
};

const options = {
  method: "GET",
  headers,
};

const cacheName = "app-cache";

export async function clearCache() {
  caches.delete(cacheName);
}

async function fetchCachedData(route) {
  const cache = await caches.open(cacheName);
  const response = await cache.match(`${API}${route}`);
  return response;
}

export async function fetchData(route) {
  const cache = await caches.open(cacheName);
  const response = await fetchCachedData(route);
  if (response !== undefined) {
    return response.json();
  } else {
    return fetch(`${API}${route}`, options)
      .then((res) => {
        if (res.ok) {
          cache.add(`${API}${route}`);
          setTimeout(() => cache.delete(`${API}${route}`), 1000 * 60 * 5);
          return res.json();
        } else {
          throw new Error("request failed");
        }
      })
      .catch(console.log);
  }
}
