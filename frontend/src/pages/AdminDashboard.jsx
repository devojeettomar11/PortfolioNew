import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/admin-login");
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/api/enquiries", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(res.data);
    } catch (error) {
      navigate("/admin-login");
    }
  };

  const deleteEnquiry = async (id) => {
    await API.delete(`/api/enquiries/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEnquiries();
  };

  const toggleStatus = async (id) => {
    await API.put(`/api/enquiries/${id}/status`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEnquiries();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-600 px-5 py-2 rounded-lg">
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((e) => (
              <tr key={e._id} className="border-t border-white/10">
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.phone}</td>
                <td className="p-3">{e.message}</td>

                <td className={`p-3 font-bold ${e.status === "Unread" ? "text-yellow-400" : "text-green-400"}`}>
                  {e.status}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => toggleStatus(e._id)}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => deleteEnquiry(e._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
