"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/health/")
      .then((res) => {
        if (!res.ok) throw new Error("Backend returned an error");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Frontend connected to Django</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!error && !data && <p>Loading...</p>}

      {data && (
        <>
          <p>Response from backend:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </main>
  );
}
