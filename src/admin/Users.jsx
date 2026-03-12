import { useState } from "react";

export default function Users() {
    const [users] = useState([
        { id: 1, name: "Aman Gupta", business: "Aman Traders", industry: "Retail", risk: 45, status: "Active" },
        { id: 2, name: "Neha Shah", business: "Neha Tech", industry: "Technology", risk: 72, status: "Active" },
        { id: 3, name: "Rohit Mehta", business: "Mehta Manufacturing", industry: "Manufacturing", risk: 30, status: "Active" },
        { id: 4, name: "Priya Patel", business: "Priya Foods", industry: "Food", risk: 81, status: "High Risk" },
    ]);

    return (
        <div style={{ flex: 1, padding: "25px" }}>
            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
                Platform Users
            </h1>

            <div
                style={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "14px",
                    overflow: "hidden"
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#021b22" }}>
                        <tr>
                            <th style={th}>ID</th>
                            <th style={th}>User</th>
                            <th style={th}>Business</th>
                            <th style={th}>Industry</th>
                            <th style={th}>Risk Score</th>
                            <th style={th}>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} style={{ borderTop: "1px solid #1e293b" }}>
                                <td style={td}>{u.id}</td>
                                <td style={td}>{u.name}</td>
                                <td style={td}>{u.business}</td>
                                <td style={td}>{u.industry}</td>
                                <td style={{ ...td, color: getRiskColor(u.risk) }}>{u.risk}</td>
                                <td style={{ ...td, color: u.status === "High Risk" ? "#ef4444" : "#22c55e" }}>
                                    {u.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const th = {
    textAlign: "left",
    padding: "14px",
    color: "#94a3b8",
    fontWeight: "600",
};

const td = {
    padding: "14px",
    color: "#cbd5f5",
};

function getRiskColor(score) {
    if (score > 70) return "#ef4444";
    if (score > 40) return "#f59e0b";
    return "#22c55e";
}