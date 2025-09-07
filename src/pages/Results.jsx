import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Results() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/vote/results");
      setCandidates(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Current Results</h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {candidates.length > 0 ? (
          <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((v) => (
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
    </div>
  );
}
