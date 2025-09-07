import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/vote/results");
      setCandidates(res.data);
    } catch (err) {
      setError("Failed to load candidates");
    }
  };

  const handleVote = async (name) => {
    try {
      await api.post("/vote", { name });
      fetchCandidates();
    } catch (err) {
      setError("Failed to vote");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    handleVote(newName);
    setNewName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vote for a Candidate</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Vote</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr>
                <td key={c._id}>{c.name}</td>
                <td>{c.votes}</td>
                <td>
                  <button style={{ color: "green" }} onClick={() => handleVote(c.name)}>
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAdd} style={{ paddingTop: "10px" }}>
        <input placeholder="Add new candidate" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button style={{ marginLeft: "10px", color: "green" }} type="submit">
          Add & Vote
        </button>
      </form>
    </div>
  );
}
