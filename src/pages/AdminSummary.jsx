import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/vote/summary");
        setSummary(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return <p>Loading summary...</p>;
  }
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px"}}>
      <h2>Admin Summary</h2>
      {summary && (
        <>
          <p>Total Votes Submitted: {summary.totalVotes}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {summary?.votes?.length > 0 ? (
              <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.votes.map((v) => (
                    <tr key={v._id}>
                      <td>{v.name}</td>
                      <td>{v.votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No votes recorded yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
