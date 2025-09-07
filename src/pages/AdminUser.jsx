import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminUser() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Fail to delete");
    }
  };

  const handleRoleUpdate = async (id, value) => {
    try {
      const res = await api.put(`/admin/users/${id}`, { role: value });
      setUsers((prev) => prev.map((u) => (u._id == id ? { ...u, role: res.data.role } : u)));
    } catch (err) {
      setError(err.response?.data?.error || "Fail to update role");
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>
      {users && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {users?.length > 0 ? (
              <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.username}</td>
                      <td>
                        <select value={u.role} onChange={(e) => handleRoleUpdate(u._id, e.target.value)}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          style={{ color: "red" }}
                          onClick={() => {
                            handleDelete(u._id);
                          }}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No User yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
