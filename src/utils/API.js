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

async function fetchData(route) {
  const cache = await caches.open("my-cache");
  const response = await cache.match(`${API}${route}`);
  if (response !== undefined) {
    return response.json();
  } else {
    return fetch(`${API}${route}`, options).then((res) => {
      if (res.ok) {
        // work-around: not to save response from server when only "[]" is returned
        for (let pair of res.headers.entries()) {
          if (pair[0] === "content-length") {
            if (Number(pair[1]) < 50) {
              fetchData(route);
            } else {
              // cache all responses for 5 minutes
              cache.add(`${API}${route}`);
              setTimeout(() => cache.delete(`${API}${route}`), 1000 * 60 * 5);
              return res.json();
            }
          }
          console.log(pair);
        }
      } else {
        throw new Error("request failed");
      }
    });
  }
}

export default fetchData;
