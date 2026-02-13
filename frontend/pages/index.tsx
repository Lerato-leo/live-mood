import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [feeling, setFeeling] = useState("");
  const [details, setDetails] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setAffirmation("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/affirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, feeling, details }),
      });

      if (!res.ok) throw new Error("Failed to fetch affirmation");

      const data = await res.json();
      setAffirmation(data.affirmation);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Live Mood Architect</h1>
      <input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="How are you feeling?"
        value={feeling}
        onChange={e => setFeeling(e.target.value)}
      />
      <input
        placeholder="Details (optional)"
        value={details}
        onChange={e => setDetails(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Affirmation</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {affirmation && <p>{affirmation}</p>}
    </div>
  );
}
