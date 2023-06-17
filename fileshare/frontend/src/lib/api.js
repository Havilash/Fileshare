const BASE_URL = "http://localhost:8000/api";
// const BASE_URL = "http://172.20.10.2:8000/api";

export async function createShare(files) {
  const response = await fetch(`${BASE_URL}/share`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(files),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function getShare(key) {
  const response = await fetch(`${BASE_URL}/share/${key}`);

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function deleteShare(key) {
  const response = await fetch(`${BASE_URL}/share/${key}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}

export async function updateShare(key, files) {
  const response = await fetch(`${BASE_URL}/share/${key}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(files),
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}
